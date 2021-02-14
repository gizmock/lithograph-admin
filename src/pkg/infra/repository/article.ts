import { DynamoDB } from "aws-sdk";
import { Article, ArticleWriteRepository } from "../../domain/model/article";
import { ArticleID } from "../../domain/model/article-value";
import {
  ArticleData,
  ArticleReadRepository,
  ArticleSearchData,
  ArticleSearchResult,
  FindOption,
} from "../../query/data/article";

const GSI_NAME_CROSS_SEARCH = "CrossSearchGSI";
const CROSS_SEARCH_VALUE_ALL = "all";
const SEARCH_LIMIT = 20;

export class ArticleRepositoryDynamoDB
  implements ArticleWriteRepository, ArticleReadRepository {
  private readonly dynamodb: DynamoDB;
  private readonly table: string;

  constructor(dynamodb: DynamoDB, table: string) {
    this.dynamodb = dynamodb;
    this.table = table;
  }

  async put(article: Article): Promise<void> {
    const id = article.id.value;
    const published = article.published.value.getTime().toString();
    await this.dynamodb
      .putItem({
        TableName: this.table,
        Item: {
          id: { S: id },
          title: { S: article.title.value },
          body: { S: article.body.value },
          published: { N: published },
          crossSearchId: { S: CROSS_SEARCH_VALUE_ALL },
          crossSearchSort: { S: published + "+" + id },
        },
      })
      .promise();
  }

  async remove(id: ArticleID): Promise<void> {
    await this.dynamodb
      .deleteItem({
        TableName: this.table,
        Key: { id: { S: id.value } },
      })
      .promise();
  }

  async get(id: string): Promise<ArticleData | undefined> {
    const res = await this.dynamodb
      .getItem({
        TableName: this.table,
        Key: { id: { S: id } },
        ConsistentRead: true,
      })
      .promise();
    const item = res.Item;
    if (!item) {
      return undefined;
    }
    return itemToArticleData(item);
  }

  async findByTitle(option: FindOption): Promise<ArticleSearchResult> {
    let keyConditionExpression =
      "#crossSearchId = :crossSearchId" + (option.lastFondPosition ? "" : "");

    const expressionAttributeNames: DynamoDB.ExpressionAttributeNameMap = {
      "#crossSearchId": "crossSearchId",
      "#title": "title",
    };

    const expressionAttributeValues: DynamoDB.ExpressionAttributeValueMap = {
      ":crossSearchId": { S: CROSS_SEARCH_VALUE_ALL },
      ":title_value": { S: option.title },
    };

    if (option.lastFondPosition) {
      keyConditionExpression += " and #crossSearchSort < :crossSearchSort";
      expressionAttributeNames["#crossSearchSort"] = "crossSearchSort";
      expressionAttributeValues[":crossSearchSort"] = {
        S: option.lastFondPosition,
      };
    }

    const res = await this.dynamodb
      .query({
        TableName: this.table,
        IndexName: GSI_NAME_CROSS_SEARCH,
        ScanIndexForward: false,
        KeyConditionExpression: keyConditionExpression,
        FilterExpression: "contains(#title, :title_value)",
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        Limit: option.limit ? option.limit : SEARCH_LIMIT,
      })
      .promise();

    console.info(res.LastEvaluatedKey);

    const items = res.Items;
    if (!items) {
      return {
        datas: [],
      };
    }
    const lastFoundKey = res.LastEvaluatedKey
      ? res.LastEvaluatedKey["crossSearchSort"].S
      : undefined;
    return {
      datas: itemToArticleSearchResults(items),
      lastFoundKey: lastFoundKey,
    };
  }
}

function itemToArticleSearchResults(items: DynamoDB.AttributeMap[]) {
  return items.map(itemToArticleSearchResult);
}

function itemToArticleData(item: DynamoDB.AttributeMap) {
  return {
    id: item["id"].S!,
    title: item["title"].S!,
    body: item["body"].S!,
    published: new Date(parseInt(item["published"].N!)),
    created: new Date(),
  } as ArticleData;
}

function itemToArticleSearchResult(item: DynamoDB.AttributeMap) {
  return {
    id: item["id"].S!,
    title: item["title"].S!,
    published: new Date(parseInt(item["published"].N!)),
  } as ArticleSearchData;
}
