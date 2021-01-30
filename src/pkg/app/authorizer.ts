export type AuthStatus = "Authorized" | "RequiredNewPassword";

export class AuthSession {
  readonly name: string;
  readonly status: AuthStatus;
  readonly credential: any;

  constructor(name: string, status: AuthStatus, credential?: any) {
    this.name = name;
    this.status = status;
    this.credential = credential;
  }
}

export interface Authorizer {
  signIn(name: string, password: string): Promise<AuthSession>;
  getSession(): Promise<AuthSession | undefined>;
  resetPassword(auth: AuthSession, password: string): Promise<void>;
  signOut(): Promise<void>;
}
