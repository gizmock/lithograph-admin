import { useContext } from "react";
import { InfraContext, SessionContext } from "../../../context";
import { SignInForm } from "./sign-in-form";

export const SignInView = () => {
  const sessionCtx = useContext(SessionContext);
  const infraCtx = useContext(InfraContext);

  const signIn = async (name: string, password: string) => {
    sessionCtx.setSession(await infraCtx.authorizer.signIn(name, password));
  };

  return (
    <>
      <SignInForm submit={signIn} />
    </>
  );
};
