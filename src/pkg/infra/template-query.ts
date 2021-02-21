import { DynamoDB } from "aws-sdk";
import { TemplateData, TemplateQueryService } from "../app/query/template";

export class TemplateQueryServiceDynamoDB implements TemplateQueryService {
  private readonly dynamodb: DynamoDB;
  private readonly table: string;

  constructor(dynamodb: DynamoDB, table: string) {
    this.dynamodb = dynamodb;
    this.table = table;
  }

  async get(id: string): Promise<TemplateData | undefined> {
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
    return {
      id: item["id"].S!,
      name: item["name"].S!,
      html: item["html"].S!,
    };
  }
}
