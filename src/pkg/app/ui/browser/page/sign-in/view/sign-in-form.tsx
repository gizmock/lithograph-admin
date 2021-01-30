import { Button, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { useRef, useState } from "react";
import { PasswordInputGroup } from "../../../common/password-input";
import { GlobalToaster } from "../../../common/toaster";

const toastSignInError = () => {
  GlobalToaster.show({
    timeout: 3000,
    intent: Intent.DANGER,
    message: "認証できませんでした、入力内容をご確認ください",
  });
};

type Props = {
  submit: (name: string, password: string) => Promise<void>;
};

export const SignInForm = (props: Props) => {
  const name = useRef({ value: "" } as HTMLInputElement);
  const password = useRef({ value: "" } as HTMLInputElement);
  const [disabled, setDisabled] = useState(false);

  const send = async () => {
    try {
      setDisabled(true);
      await props.submit(name.current.value, password.current.value);
    } catch (error) {
      setDisabled(false);
      toastSignInError();
    }
    return false;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
    >
      <FormGroup label="ユーザ名" labelFor="name-input" disabled={disabled}>
        <InputGroup
          id="name-input"
          required
          inputRef={name}
          disabled={disabled}
          autoComplete="username"
        />
      </FormGroup>
      <FormGroup
        label="パスワード"
        labelFor="password-input"
        disabled={disabled}
      >
        <PasswordInputGroup
          id="password-input"
          required
          autoComplete={"current-password"}
          disabled={disabled}
          inputRef={password}
        />
      </FormGroup>
      <Button
        id="sugin-in-button"
        type="submit"
        intent={Intent.PRIMARY}
        icon="log-in"
        disabled={disabled}
        style={{ width: "100%" }}
      >
        サインイン
      </Button>
    </form>
  );
};
