import { useContext } from "react";
import { InfraContext, SessionContext } from "../../context";
import { SignOutButton } from "./view/sign-out-button";

export const AccountMain = () => {
  const sessionCtx = useContext(SessionContext);
  const infraCtx = useContext(InfraContext);

  const signOut = async () => {
    await infraCtx.authorizer.signOut();
    sessionCtx.setSession(undefined);
  };

  return (
    <>
      <h1>アカウント</h1>
      <SignOutButton onClick={signOut} />
    </>
  );
};
