import { Button, H1, InputGroup, Intent } from "@blueprintjs/core";
import pretty from "pretty";
import { HTMLEditor } from "../../common/html-editor";
import { GlobalToaster } from "../../common/toaster";

type Props = {
  id?: string;
  name: React.MutableRefObject<HTMLInputElement>;
  html: string;
  setHTML: (html: string) => void;
  save: () => Promise<void>;
  remove: () => Promise<void>;
};

export const TemplateEditView = (props: Props) => {
  const onSaveClick = async () => {
    try {
      await props.save();
      GlobalToaster.show({
        intent: Intent.SUCCESS,
        message: "テンプレートを保存しました",
      });
    } catch {
      GlobalToaster.show({
        intent: Intent.DANGER,
        message: "テンプレートを保存できませんでした",
      });
    }
  };

  const onRemoveClick = async () => {
    try {
      await props.remove();
      GlobalToaster.show({
        intent: Intent.SUCCESS,
        message: "テンプレートを削除しました",
      });
    } catch {
      GlobalToaster.show({
        intent: Intent.DANGER,
        message: "テンプレートを削除できませんでした",
      });
    }
  };

  return (
    <>
      <H1>テンプレート編集</H1>

      <div>
        <Button style={{ marginRight: "12px" }}>戻る</Button>

        <Button
          disabled={props.name.current.value === "" || props.html === ""}
          intent={Intent.PRIMARY}
          onClick={onSaveClick}
          style={{ marginRight: "12px" }}
        >
          保存
        </Button>

        <Button
          disabled={props.id === undefined}
          intent={Intent.DANGER}
          onClick={onRemoveClick}
        >
          削除
        </Button>
      </div>

      {props.id ? (
        <>
          <h2>ID</h2>
          {props.id}
        </>
      ) : (
        <></>
      )}

      <h2>名前</h2>
      <InputGroup inputRef={props.name} />

      <h2>HTML</h2>
      <Button onClick={() => props.setHTML(pretty(props.html))}>
        HTML整形
      </Button>
      <HTMLEditor body={props.html} setBody={props.setHTML} />
    </>
  );
};
