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
const DEFAULT_SEARCH_LIMIT = 5;

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
    const limit = option.limit ? option.limit : DEFAULT_SEARCH_LIMIT;
    const items = [] as DynamoDB.AttributeMap[];
    let boundaryKey = option.boundaryKey;
    while (true) {
      let keyConditionExpression = "#crossSearchId = :crossSearchId";
      const expressionAttributeNames: DynamoDB.ExpressionAttributeNameMap = {
        "#crossSearchId": "crossSearchId",
        "#title": "title",
      };
      const expressionAttributeValues: DynamoDB.ExpressionAttributeValueMap = {
        ":crossSearchId": { S: CROSS_SEARCH_VALUE_ALL },
        ":title_value": { S: option.title },
      };

      if (boundaryKey) {
        keyConditionExpression +=
          " and #crossSearchSort " +
          (option.direction === "before" ? "<" : ">") +
          " :crossSearchSort";
        expressionAttributeNames["#crossSearchSort"] = "crossSearchSort";
        expressionAttributeValues[":crossSearchSort"] = {
          S: boundaryKey,
        };
      }

      const res = await this.dynamodb
        .query({
          TableName: this.table,
          IndexName: GSI_NAME_CROSS_SEARCH,
          ScanIndexForward: option.direction === "after",
          KeyConditionExpression: keyConditionExpression,
          FilterExpression: "contains(#title, :title_value)",
          ExpressionAttributeNames: expressionAttributeNames,
          ExpressionAttributeValues: expressionAttributeValues,
          Limit: limit - items.length,
        })
        .promise();
      if (!res.Items) {
        break;
      }
      items.push(...res.Items);
      if (items.length === limit || !res.LastEvaluatedKey) {
        break;
      }
      boundaryKey = res.LastEvaluatedKey["crossSearchSort"].S!;
    }

    const sorted = option.direction === "before" ? items : items.reverse();
    return {
      datas: itemToArticleSearchResults(sorted),
    };
  }
}

function itemToArticleSearchResults(items: DynamoDB.AttributeMap[]) {
  return items.map(itemToArticleSearchResult);
}

function itemToArticleData(item: DynamoDB.AttributeMap): ArticleData {
  return {
    id: item["id"].S!,
    title: item["title"].S!,
    body: item["body"].S!,
    published: new Date(parseInt(item["published"].N!)),
  };
}

function itemToArticleSearchResult(
  item: DynamoDB.AttributeMap
): ArticleSearchData {
  return {
    id: item["id"].S!,
    title: item["title"].S!,
    published: new Date(parseInt(item["published"].N!)),
    sortKey: item["crossSearchSort"].S!,
  };
}
