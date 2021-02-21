import { Button, FormGroup, Intent } from "@blueprintjs/core";
import { useRef, useState } from "react";
import { PasswordInputGroup } from "../../../../common/password-input";
import { GlobalToaster } from "../../../../common/toaster";

const toastCheckPassword = () => {
  GlobalToaster.show({
    timeout: 3000,
    intent: Intent.WARNING,
    message: "入力されたパスワードが一致していません",
  });
};

const toastNewPasswordError = () => {
  GlobalToaster.show({
    timeout: 3000,
    intent: Intent.DANGER,
    message: "登録に失敗しました、改めて入力ください",
  });
};

type Props = {
  submit: (password: string) => Promise<void>;
};

export const NewPasswordForm = (props: Props) => {
  const password = useRef({ value: "" } as HTMLInputElement);
  const checkPassword = useRef({ value: "" } as HTMLInputElement);
  const [disabled, setDisabled] = useState(false);

  const send = async () => {
    if (password.current.value !== checkPassword.current.value) {
      toastCheckPassword();
      return;
    }
    try {
      setDisabled(true);
      await props.submit(password.current.value);
    } catch {
      setDisabled(false);
      toastNewPasswordError();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
    >
      <FormGroup
        label="新しいパスワード"
        labelFor="new-password-input"
        disabled={disabled}
      >
        <PasswordInputGroup
          id="new-password-input"
          required
          autoComplete={"new-password"}
          disabled={disabled}
          inputRef={password}
        />
      </FormGroup>
      <FormGroup
        label="新しいパスワードの確認"
        labelFor="check-new-password-input"
        disabled={disabled}
      >
        <PasswordInputGroup
          id="check-new-password-input"
          required
          autoComplete={"new-password"}
          disabled={disabled}
          inputRef={checkPassword}
        />
      </FormGroup>
      <Button
        id="new-password-button"
        type="submit"
        intent={Intent.PRIMARY}
        icon="key"
        disabled={disabled}
        style={{ width: "100%" }}
      >
        パスワード変更
      </Button>
    </form>
  );
};
