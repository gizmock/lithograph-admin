import AWS, { DynamoDB, S3 } from "aws-sdk";
import {
  InfraContext,
  SiteContext,
  UsecaseContext,
} from "../../ui/browser/context";
import { AuthorizedPage } from "../../ui/browser/page/authorized";
import { ArticleUsecase } from "../../app/usecase/article";
import { AsssetUsecase } from "../../app/usecase/asset";
import { AuthorizerCognito } from "../../infra/authorizer-cognito";
import { AmplifyAuthCredentials } from "../../infra/aws_credentials";
import { ArticleRepositoryDynamoDB } from "../../infra/article-repository";
import { AssetStorageS3 } from "../../infra/asset-storage-s3";
import { configure } from "../config";
import { WrapWithAuth } from "./wrap/auth";
import { WrapWithTheme } from "./wrap/theme";
import { ArticleQueryService } from "../../app/query/article";
import { ArticleQueryServiceDynamoDB } from "../../infra/article-query";
import { TemplateUsecase } from "../../app/usecase/template";
import { TemplateRepositoryDynamoDB } from "../../infra/template-repository";
import { TemplateQueryServiceDynamoDB } from "../../infra/template-query";

const Main = () => {
  configure({
    region: process.env.REACT_APP_AWS_REGION,
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID,
  });

  const authorizer = new AuthorizerCognito();
  const credentialProvider = new AWS.CredentialProviderChain([
    () => new AmplifyAuthCredentials(),
  ]);

  const assetStorage = new AssetStorageS3(
    new S3({
      region: process.env.REACT_APP_AWS_REGION,
      credentialProvider: credentialProvider,
    }),
    process.env.REACT_APP_S3_BUCKET!
  );

  const dynamodbAPI = new DynamoDB({
    region: process.env.REACT_APP_AWS_REGION,
    credentialProvider: credentialProvider,
  });
  const dynamodbTable = process.env.REACT_APP_DYNAMODB_ARTICLE_TABLE!;

  return (
    <SiteContext.Provider value={{ name: process.env.REACT_APP_SITE_NAME! }}>
      <InfraContext.Provider
        value={{
          authorizer: authorizer,
          fileStorage: assetStorage,
        }}
      >
        <UsecaseContext.Provider
          value={{
            asset: new AsssetUsecase(assetStorage),
            article: {
              usecase: new ArticleUsecase(
                new ArticleRepositoryDynamoDB(dynamodbAPI, dynamodbTable)
              ),
              query: new ArticleQueryServiceDynamoDB(
                dynamodbAPI,
                dynamodbTable
              ),
            },
            template: {
              usecase: new TemplateUsecase(
                new TemplateRepositoryDynamoDB(dynamodbAPI, dynamodbTable)
              ),
              query: new TemplateQueryServiceDynamoDB(
                dynamodbAPI,
                dynamodbTable
              ),
            },
          }}
        >
          <WrapWithTheme>
            <WrapWithAuth
              authorizer={authorizer}
              authorizedPageProvider={AuthorizedPage}
            />
          </WrapWithTheme>
        </UsecaseContext.Provider>
      </InfraContext.Provider>
    </SiteContext.Provider>
  );
};

export default Main;
