import * as AWS from "aws-sdk";
import { Auth } from "@aws-amplify/auth";

type RefreshCallback = (err?: AWS.AWSError) => void;

export class AmplifyAuthCredentials extends AWS.Credentials {
  constructor() {
    super("", "", "");
  }

  refresh(callback: RefreshCallback) {
    this.setCredentials()
      .then(() => callback())
      .catch(callback);
  }

  async refreshPromise() {
    return this.setCredentials();
  }

  private async setCredentials() {
    try {
      const credentials = await Auth.currentUserCredentials();
      this.accessKeyId = credentials.accessKeyId;
      this.secretAccessKey = credentials.secretAccessKey;
      this.sessionToken = credentials.sessionToken;
      // Amplify's Auth.currentUserCredentials contains expiration date time with string object.
      this.expireTime = new Date((credentials as any).expiration);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export function amplifyProviderChain() {
  return new AWS.CredentialProviderChain([() => new AmplifyAuthCredentials()]);
}
