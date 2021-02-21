import { DynamoDB } from "aws-sdk";
import { Article, ArticleRepository } from "../domain/article";
import { ArticleID } from "../domain/article-value";

const CROSS_SEARCH_VALUE_ARTICLE = "article";

export class ArticleRepositoryDynamoDB implements ArticleRepository {
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
          crossSearchId: { S: CROSS_SEARCH_VALUE_ARTICLE },
          crossSearchSort: { S: published + "+" + id },
          titleInitial: { S: article.title.value.slice(0, 1) },
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
}
