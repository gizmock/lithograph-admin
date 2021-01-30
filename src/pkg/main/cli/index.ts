import { rootPath } from "get-root-path";
import { AuthorizerCognito } from "../../infra/authorizer/aws-cognito";
import run from "./command";
import { configureFromEnv } from "./init";

const ENV_PATH = rootPath + "/.env.local";
const ERROR_PROCESS_CODE = 1;

export async function main() {
  configureFromEnv(ENV_PATH);
  const authorizer = new AuthorizerCognito();
  try {
    await run(authorizer);
  } catch (error) {
    console.error(error);
    process.exit(ERROR_PROCESS_CODE);
  }
}

main();
