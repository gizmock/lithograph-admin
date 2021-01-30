import { useContext } from "react";
import { InfraContext, SessionContext } from "../../../context";
import { NewPasswordForm } from "./new-password-form";

export const FirstPasswordView = () => {
  const sessionCtx = useContext(SessionContext);
  const infraCtx = useContext(InfraContext);

  const newPassword = async (password: string) => {
    if (!sessionCtx.session) {
      throw new Error("session none");
    }
    await infraCtx.authorizer.resetPassword(sessionCtx.session!, password);
    sessionCtx.setSession(await infraCtx.authorizer.getSession());
  };

  return (
    <>
      <NewPasswordForm submit={newPassword} />
    </>
  );
};
