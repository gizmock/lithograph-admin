import { Button, InputGroup, Intent } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useState } from "react";

type Props = {
  id?: string;
  required?: boolean;
  large?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  inputRef?: React.MutableRefObject<HTMLInputElement>;
};

export const PasswordInputGroup = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const lockButton = (
    <Tooltip2
      content={`パスワードを${showPassword ? "隠す" : "表示"}`}
      disabled={props.disabled}
      placement={"top"}
    >
      <Button
        disabled={props.disabled}
        icon={showPassword ? "unlock" : "lock"}
        intent={Intent.WARNING}
        minimal={true}
        onClick={() => setShowPassword(!showPassword)}
      />
    </Tooltip2>
  );

  return (
    <InputGroup
      type={showPassword ? "text" : "password"}
      rightElement={lockButton}
      id={props.id}
      required={props.required}
      large={props.required}
      disabled={props.disabled}
      autoComplete={props.autoComplete}
      inputRef={props.inputRef}
    />
  );
};
