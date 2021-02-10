import { Button, Classes, Dialog, InputGroup, Intent } from "@blueprintjs/core";
import { useState } from "react";
import { GlobalToaster } from "../../../../common/toaster";

type Props = {
  opend: boolean;
  close: () => void;
  makeDirectory: (name: string) => Promise<void>;
};

const makeDirectoryError = () => {
  GlobalToaster.show({
    timeout: 3000,
    intent: Intent.DANGER,
    message: "フォルダ作成に失敗しました",
  });
};

export const MakeDirectoryDialog = (props: Props) => {
  const [name, setName] = useState("");

  const make = async () => {
    try {
      await props.makeDirectory(name);
      setName("");
      props.close();
    } catch {
      makeDirectoryError();
    }
  };

  return (
    <Dialog
      isOpen={props.opend}
      onClose={props.close}
      canOutsideClickClose
      canEscapeKeyClose
      hasBackdrop
      usePortal
      title="フォルダ作成"
    >
      <div className={Classes.DIALOG_BODY}>
        <InputGroup
          autoFocus
          value={name}
          onChange={(e: React.FormEvent<HTMLElement>) =>
            setName((e.target as HTMLInputElement).value)
          }
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              make();
            }
          }}
        />
      </div>

      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={props.close}>キャンセル</Button>
          <Button intent={Intent.PRIMARY} onClick={make} disabled={!name}>
            作成
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
