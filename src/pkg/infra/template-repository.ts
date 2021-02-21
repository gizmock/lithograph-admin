import { DynamoDB } from "aws-sdk";
import { Template, TemplateRepository } from "../domain/template";

const CROSS_SEARCH_VALUE_ARTICLE = "template";

export class TemplateRepositoryDynamoDB implements TemplateRepository {
  private readonly dynamodb: DynamoDB;
  private readonly table: string;

  constructor(dynamodb: DynamoDB, table: string) {
    this.dynamodb = dynamodb;
    this.table = table;
  }

  async put(template: Template): Promise<void> {
    await this.dynamodb
      .putItem({
        TableName: this.table,
        Item: {
          id: { S: template.id },
          title: { S: template.title },
          body: { S: template.body },
          crossSearchId: { S: CROSS_SEARCH_VALUE_ARTICLE },
          crossSearchSort: { S: template.title },
        },
      })
      .promise();
  }

  async remove(id: string): Promise<void> {
    await this.dynamodb
      .deleteItem({
        TableName: this.table,
        Key: { id: { S: id } },
      })
      .promise();
  }
}
