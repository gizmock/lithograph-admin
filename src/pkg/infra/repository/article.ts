import { DynamoDB } from "aws-sdk";
import { Article, ArticleWriteRepository } from "../../domain/model/article";
import { ArticleID } from "../../domain/model/article-value";
import {
  ArticleData,
  ArticleList,
  ArticleReadRepository,
} from "../../query/data/article";

export class ArticleRepositoryDynamoDB
  implements ArticleWriteRepository, ArticleReadRepository {
  private readonly dynamodb: DynamoDB;
  private readonly table: string;

  constructor(dynamodb: DynamoDB, table: string) {
    this.dynamodb = dynamodb;
    this.table = table;
  }

  async put(article: Article): Promise<void> {
    await this.dynamodb
      .putItem({
        TableName: this.table,
        Item: {
          id: { S: article.id.value },
          title: { S: article.title.value },
          body: { S: article.body.value },
          published: { N: article.published.value.getTime().toString() },
          crossSearch: { S: "all" },
        },
      })
      .promise();
  }

  async remove(id: ArticleID): Promise<void> {}

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

  async findByTitle(title: string): Promise<ArticleList> {
    const res = await this.dynamodb
      .scan({
        TableName: this.table,
        FilterExpression: "contains(#title, :title_value)",
        ExpressionAttributeNames: {
          "#title": "title",
        },
        ExpressionAttributeValues: {
          ":title_value": { S: title },
        },
      })
      .promise();
    const items = res.Items;
    if (!items) {
      return {
        datas: [],
      };
    }
    return {
      datas: itemsToArticleDatas(items),
    };
  }
}

function itemsToArticleDatas(items: DynamoDB.AttributeMap[]) {
  return items.map(itemToArticleData);
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
