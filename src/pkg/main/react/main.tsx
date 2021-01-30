import AWS, { S3 } from "aws-sdk";
import { InfraContext, SiteContext } from "../../app/ui/browser/context";
import { AuthorizedPage } from "../../app/ui/browser/page/authorized";
import { AuthorizerCognito } from "../../infra/authorizer/aws-cognito";
import { AmplifyAuthCredentials } from "../../infra/aws_credentials";
import { FileStorageS3 } from "../../infra/storage/aws-s3";
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
  const fileStorage = new FileStorageS3(
    new S3({
      region: process.env.REACT_APP_AWS_REGION,
      credentialProvider: credentialProvider,
    }),
    process.env.REACT_APP_S3_BUCKET!
  );

  return (
    <SiteContext.Provider value={{ name: process.env.REACT_APP_SITE_NAME! }}>
      <InfraContext.Provider
        value={{
          authorizer: authorizer,
          fileStorage: fileStorage,
        }}
      >
        <WrapWithTheme>
          <WrapWithAuth
            authorizer={authorizer}
            authorizedPageProvider={AuthorizedPage}
          />
        </WrapWithTheme>
      </InfraContext.Provider>
    </SiteContext.Provider>
  );
};

export default Main;
