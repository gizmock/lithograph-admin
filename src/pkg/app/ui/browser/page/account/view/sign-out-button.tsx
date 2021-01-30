import { Button, Intent } from "@blueprintjs/core";
import { useState } from "react";

type Props = {
  onClick: () => Promise<void>;
};

export const SignOutButton = (props: Props) => {
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
