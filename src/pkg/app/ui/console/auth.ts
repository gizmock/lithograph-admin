import { Authorizer } from "../../authorizer";

export class AuthConsole {
  private readonly authorizer: Authorizer;

  constructor(authorizer: Authorizer) {
    this.authorizer = authorizer;
  }

  async viewSignInStatus(opts: { username: string; password: string }) {
    const output = await this.authorizer.signIn(opts.username, opts.password);
    console.log("sign in result");
    console.log("name: " + output.name);
    console.log("status: " + output.status);
  }
}
