import { CredentialProviderChain, DynamoDB } from "aws-sdk";
import {
  FindOutput,
  Page,
  PageRepository as Repository,
} from "../../entities/page";

type Config = {
  region: string;
  dynamodb: {
    table: string;
  };
  credentialProvider: CredentialProviderChain;
};

export class PageRepository implements Repository {
  private readonly dynamodb: DynamoDB;
  private readonly table: string;

  constructor(config: Config) {
    this.dynamodb = new DynamoDB({
      region: config.region,
      credentialProvider: config.credentialProvider,
    });
    this.table = config.dynamodb.table;
  }

  async find(lastID?: string): Promise<FindOutput> {
    const exclusiveStartKey = lastID
      ? {
          id: { S: lastID },
        }
      : undefined;
    const out = await this.dynamodb
      .scan({
        TableName: this.table,
        ExclusiveStartKey: exclusiveStartKey,
        ProjectionExpression: "id,published,title",
      })
      .promise();
    const pages = [] as Page[];
    if (out.Items) {
      for (const item of out.Items) {
        pages.push(marshal(item));
      }
    }
    const lastKey = out.LastEvaluatedKey;
    return {
      pages: pages,
      lastID: lastKey ? lastKey["id"].S! : undefined,
    };
  }

  async get(id: string): Promise<Page | null> {
    const out = await this.dynamodb
      .getItem({
        TableName: this.table,
        Key: { id: { S: id } },
      })
      .promise();
    const item = out.Item;
    return item ? marshal(item) : null;
  }

  async put(page: Page): Promise<void> {
    await this.dynamodb
      .putItem({
        TableName: this.table,
        Item: {
          id: { S: page.id },
          published: { N: page.published.getTime().toString() },
          title: { S: page.title },
          body: { S: page.body },
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

function marshal(item: DynamoDB.AttributeMap): Page {
  const published = item["published"].N;
  const title = item["title"].S;
  const body = item["body"] ? item["body"].S : undefined;
  return Page.of(item["id"].S!, {
    published: published ? new Date(parseInt(published)) : new Date(),
    title: title ? title : "",
    body: body ? body : "",
  });
}
