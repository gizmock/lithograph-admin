import { DynamoDB } from "aws-sdk";
import { Category, CategoryRepository } from "../domain/category";

const CROSS_SEARCH_VALUE_CATEGORY = "category";

export class CategoryRepositoryDynamoDB implements CategoryRepository {
  private readonly dynamodb: DynamoDB;
  private readonly table: string;

  constructor(dynamodb: DynamoDB, table: string) {
    this.dynamodb = dynamodb;
    this.table = table;
  }

  async put(category: Category): Promise<void> {
    await this.dynamodb
      .putItem({
        TableName: this.table,
        Item: {
          id: { S: category.id },
          title: { S: category.title },
          crossSearchId: { S: CROSS_SEARCH_VALUE_CATEGORY },
          crossSearchSort: { S: category.title },
        },
      })
      .promise();
  }

  async exists(id: string): Promise<boolean> {
    const res = await this.dynamodb
      .getItem({
        TableName: this.table,
        Key: { id: { S: id } },
        ConsistentRead: true,
      })
      .promise();
    return res.Item !== undefined;
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
