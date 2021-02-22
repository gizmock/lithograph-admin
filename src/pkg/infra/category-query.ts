import { DynamoDB } from "aws-sdk";
import {
  CategoryData,
  CategoryQueryService,
  CategorySearchResult,
} from "../app/query/category";

const GSI_NAME_CROSS_SEARCH = "CrossSearchGSI";
const CROSS_SEARCH_VALUE_CATEGORY = "category";

export class CategoryQueryServiceDynamoDB implements CategoryQueryService {
  private readonly dynamodb: DynamoDB;
  private readonly table: string;

  constructor(dynamodb: DynamoDB, table: string) {
    this.dynamodb = dynamodb;
    this.table = table;
  }

  async get(id: string): Promise<CategoryData | undefined> {
    const res = await this.dynamodb
      .getItem({
        TableName: this.table,
        Key: { id: { S: id } },
        ConsistentRead: true,
      })
      .promise();
    if (!res.Item) {
      return undefined;
    }
    return {
      id: res.Item["id"].S!,
      title: res.Item["title"].S!,
    };
  }

  async list(): Promise<CategorySearchResult> {
    const keyConditionExpression = "#crossSearchId = :crossSearchId";
    const expressionAttributeNames: DynamoDB.ExpressionAttributeNameMap = {
      "#crossSearchId": "crossSearchId",
    };
    const expressionAttributeValues: DynamoDB.ExpressionAttributeValueMap = {
      ":crossSearchId": { S: CROSS_SEARCH_VALUE_CATEGORY },
    };

    const res = await this.dynamodb
      .query({
        TableName: this.table,
        IndexName: GSI_NAME_CROSS_SEARCH,
        ScanIndexForward: true,
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      })
      .promise();
    if (!res.Items) {
      return {
        datas: [],
      };
    }

    return {
      datas: res.Items.map((item) => {
        return {
          id: item["id"].S!,
          title: item["title"].S!,
        };
      }),
    };
  }
}
