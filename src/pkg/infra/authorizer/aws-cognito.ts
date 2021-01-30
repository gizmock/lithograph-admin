import { Auth as Cognito, CognitoUser } from "@aws-amplify/auth";
import { AuthStatus, AuthSession, Authorizer } from "../../app/authorizer";

type ChallengeName = "NEW_PASSWORD_REQUIRED";

type User = CognitoUser & {
  challengeName?: ChallengeName;
};

export class AuthorizerCognito implements Authorizer {
  async signIn(name: string, password: string): Promise<AuthSession> {
    const user = (await Cognito.signIn(name, password)) as User;
    return createAuthSession(user);
  }

  async getSession(): Promise<AuthSession | undefined> {
    const info = await Cognito.currentUserInfo();
    // info null: user not authenticated
    // username null: user is deleted or disabled from Cognito UserPool
    if (info === null || info.username === undefined) {
      return undefined;
    }
    const user = await Cognito.currentAuthenticatedUser();
    if (user === null) {
      return undefined;
    }
    return createAuthSession(user as User);
  }

  async resetPassword(auth: AuthSession, password: string): Promise<void> {
    await Cognito.completeNewPassword(auth.credential, password);
  }

  async signOut(): Promise<void> {
    await Cognito.signOut();
  }
}

function createAuthSession(user: User): AuthSession {
  const name = user.getUsername();
  const status = createAuthStatus(user.challengeName);
  return new AuthSession(name, status, user);
}

function createAuthStatus(challengeNeme?: ChallengeName): AuthStatus {
  switch (challengeNeme) {
    case "NEW_PASSWORD_REQUIRED":
      return "RequiredNewPassword";
    default:
      return "Authorized";
  }
}
