import { Button, Intent } from "@blueprintjs/core";
import { useContext, useState } from "react";
import { InfraContext, SessionContext } from "../../context";

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

export const SignOutButton = (props: { onClick: () => Promise<void> }) => {
  const [disabled, setDisabled] = useState(false);

  const onClick = async () => {
    try {
      setDisabled(true);
      await props.onClick();
    } catch {
      setDisabled(false);
    }
  };

  return (
    <Button
      id="new-password-button"
      type="submit"
      intent={Intent.PRIMARY}
      rightIcon="log-out"
      disabled={disabled}
      onClick={onClick}
    >
      サインアウト
    </Button>
  );
};
