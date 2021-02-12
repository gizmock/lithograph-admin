import { DynamoDB } from "aws-sdk";
import { Article, ArticleWriteRepository } from "../../domain/model/article";
import { ArticleID } from "../../domain/model/article-value";
import {
  ArticleData,
  ArticleReadRepository,
  ArticleSearchResult,
  ArticleSearchResultList,
} from "../../query/data/article";

const GSI_NAME_CROSS_SEARCH = "CrossSearchGSI";
const CROSS_SEARCH_VALUE_ALL = "all";

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

  async findByTitle(title: string): Promise<ArticleSearchResultList> {
    const res = await this.dynamodb
      .query({
        TableName: this.table,
        IndexName: GSI_NAME_CROSS_SEARCH,
        ScanIndexForward: false,
        KeyConditionExpression: "#crossSearchId = :crossSearchId",
        FilterExpression: "contains(#title, :title_value)",
        ExpressionAttributeNames: {
          "#crossSearch": "crossSearch",
          "#title": "title",
        },
        ExpressionAttributeValues: {
          ":crossSearch": { S: CROSS_SEARCH_VALUE_ALL },
          ":title_value": { S: title },
        },
      })
      .promise();
    const items = res.Items;
    if (!items) {
      return {
        results: [],
      };
    }
    return {
      results: itemToArticleSearchResults(items),
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
  } as ArticleSearchResult;
}
