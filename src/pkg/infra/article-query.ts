import { DynamoDB } from "aws-sdk";
import {
  ArticleData,
  ArticleQueryService,
  ArticleSearchResult,
  PublishedDateFindOption,
  TitleFindOption,
} from "../app/query/article";

const GSI_NAME_TITLE_SEARCH = "TitleSearchGSI";
const GSI_NAME_CROSS_SEARCH = "CrossSearchGSI";
const CROSS_SEARCH_VALUE_ARTICLE = "article";

export class ArticleQueryServiceDynamoDB implements ArticleQueryService {
  private readonly dynamodb: DynamoDB;
  private readonly table: string;

  constructor(dynamodb: DynamoDB, table: string) {
    this.dynamodb = dynamodb;
    this.table = table;
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
    return {
      id: item["id"].S!,
      title: item["title"].S!,
      body: item["body"].S!,
      published: new Date(parseInt(item["published"].N!)),
    };
  }

  async findByTitle(option: TitleFindOption): Promise<ArticleSearchResult> {
    let keyConditionExpression = "#titleInitial = :titleInitial";
    const expressionAttributeNames: DynamoDB.ExpressionAttributeNameMap = {
      "#titleInitial": "titleInitial",
    };
    const expressionAttributeValues: DynamoDB.ExpressionAttributeValueMap = {
      ":titleInitial": { S: option.title.slice(0, 1) },
    };

    if (option.boundaryKey) {
      keyConditionExpression +=
        " and #title " + (option.direction === "after" ? ">" : "<") + " :title";
      expressionAttributeNames["#title"] = "title";
      expressionAttributeValues[":title"] = {
        S: option.boundaryKey,
      };
    } else {
      keyConditionExpression += " and begins_with(#title, :title)";
      expressionAttributeNames["#title"] = "title";
      expressionAttributeValues[":title"] = {
        S: option.title,
      };
    }

    const res = await this.dynamodb
      .query({
        TableName: this.table,
        IndexName: GSI_NAME_TITLE_SEARCH,
        ScanIndexForward: !option.boundaryKey || option.direction === "after",
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
      !option.boundaryKey || option.direction === "after"
        ? res.Items
        : res.Items.reverse();
    return {
      datas: sorted.map((item) => {
        return {
          id: item["id"].S!,
          title: item["title"].S!,
          published: new Date(parseInt(item["published"].N!)),
          sortKey: item["title"].S!,
        };
      }),
    };
  }

  async findByPublishedDate(
    option: PublishedDateFindOption
  ): Promise<ArticleSearchResult> {
    let boundaryKey = option.boundaryKey;
    let keyConditionExpression = "#crossSearchId = :crossSearchId";
    const expressionAttributeNames: DynamoDB.ExpressionAttributeNameMap = {
      "#crossSearchId": "crossSearchId",
    };
    const expressionAttributeValues: DynamoDB.ExpressionAttributeValueMap = {
      ":crossSearchId": { S: CROSS_SEARCH_VALUE_ARTICLE },
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
          title: item["title"].S!,
          published: new Date(parseInt(item["published"].N!)),
          sortKey: item["crossSearchSort"].S!,
        };
      }),
    };
  }
}
