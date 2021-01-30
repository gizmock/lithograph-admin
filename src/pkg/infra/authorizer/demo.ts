import { AuthSession, Authorizer } from "../../app/authorizer";

export class AuthorizerDemo implements Authorizer {
  async signIn(name: string): Promise<AuthSession> {
    return new AuthSession(name, "Authorized");
  }

  async getSession(): Promise<AuthSession | undefined> {
    return undefined;
  }

  async resetPassword(): Promise<void> {}

  async signOut(): Promise<void> {}
}
