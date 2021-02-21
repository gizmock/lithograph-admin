import { DynamoDB } from "aws-sdk";
import { Template, TemplateRepository } from "../domain/template";

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
          name: { S: template.name },
          html: { S: template.html },
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
