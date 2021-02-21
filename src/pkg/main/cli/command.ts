import commander from "commander";
import { program } from "commander";
import { Authorizer } from "../../app/authorizer";
import { AuthConsole } from "../../presentation/console/auth";

export default async (authorizer: Authorizer) => {
  addAuthCommand(authorizer);
  await program.parseAsync(process.argv);
};

function addDefaultRequiredOption(cmd: commander.Command) {
  cmd
    .requiredOption("-u --username <username>", "SignIn User Name")
    .requiredOption("-p --password <password>", "SignIn Password");
}

function setSubCommandAction(
  cmd: commander.Command,
  action: (...args: any[]) => void | Promise<void>
) {
  addDefaultRequiredOption(cmd);
  cmd.action(action);
}

function addAuthCommand(authorizer: Authorizer) {
  const cmd = program.command("auth");
  setSubCommandAction(
    cmd.command("signin"),
    async (opts: { username: string; password: string }) => {
      await new AuthConsole(authorizer).viewSignInStatus(opts);
    }
  );
}
