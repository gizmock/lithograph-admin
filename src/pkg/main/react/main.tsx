import AWS, { DynamoDB, S3 } from "aws-sdk";
import {
  InfraContext,
  SiteContext,
  UsecaseContext,
} from "../../app/ui/browser/context";
import { AuthorizedPage } from "../../app/ui/browser/page/authorized";
import { ArticleUsecase } from "../../domain/usecase/article";
import { AsssetUsecase } from "../../domain/usecase/asset";
import { AuthorizerCognito } from "../../infra/authorizer-cognito";
import { AmplifyAuthCredentials } from "../../infra/aws_credentials";
import { ArticleRepositoryDynamoDB } from "../../infra/article-repository";
import { AssetStorageS3 } from "../../infra/asset-storage-s3";
import { ArticleQueryService } from "../../query/service/article";
import { configure } from "../config";
import { WrapWithAuth } from "./wrap/auth";
import { WrapWithTheme } from "./wrap/theme";

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

  const articleRepository = new ArticleRepositoryDynamoDB(
    new DynamoDB({
      region: process.env.REACT_APP_AWS_REGION,
      credentialProvider: credentialProvider,
    }),
    process.env.REACT_APP_DYNAMODB_ARTICLE_TABLE!
  );

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
              command: new ArticleUsecase(articleRepository),
              query: new ArticleQueryService(articleRepository),
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
