import { DynamoDB } from "aws-sdk";
import {
  ListOption,
  TemplateData,
  TemplateQueryService,
  TemplateSearchResult,
} from "../app/query/template";

const GSI_NAME_CROSS_SEARCH = "CrossSearchGSI";
const CROSS_SEARCH_VALUE_ARTICLE = "article";

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

  async list(option: ListOption): Promise<TemplateSearchResult> {
    let keyConditionExpression = "#crossSearchId = :crossSearchId";
    const expressionAttributeNames: DynamoDB.ExpressionAttributeNameMap = {
      "#crossSearchId": "crossSearchId",
    };
    const expressionAttributeValues: DynamoDB.ExpressionAttributeValueMap = {
      ":crossSearchId": { S: CROSS_SEARCH_VALUE_ARTICLE },
    };

    const boundaryKey = option.boundaryKey;
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
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        Limit: option.limit,
      })
      .promise();
    if (!res.Items) {
      return {
        datas: [],
      };
    }

    const sorted =
      option.direction === "before" ? res.Items : res.Items.reverse();

    return {
      datas: sorted.map((item) => {
        return {
          id: item["id"].S!,
          name: item["name"].S!,
          sortKey: item["crossSearchSort"].S!,
        };
      }),
    };
  }
}
