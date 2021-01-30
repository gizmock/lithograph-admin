import { config } from "dotenv";
import { Config, configure } from "../config";

export function configureFromEnv(path: string) {
  loadEnv(path);
  configure(createConfigFromEnv());
}

function loadEnv(path: string) {
  config({ path: path });
}

function createConfigFromEnv(): Config {
  return {
    region: process.env.REACT_APP_AWS_REGION!,
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID!,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID!,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID!,
  };
}
