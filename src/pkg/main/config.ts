import { Auth } from "@aws-amplify/auth";

export type Config = CognitoConfig;

type CognitoConfig = {
  region?: string;
  identityPoolId?: string;
  userPoolId?: string;
  userPoolWebClientId?: string;
};

export function configure(config: Config) {
  Auth.configure({
    region: config.region,
    identityPoolId: config.identityPoolId,
    userPoolId: config.userPoolId,
    userPoolWebClientId: config.userPoolWebClientId,
  });
}
