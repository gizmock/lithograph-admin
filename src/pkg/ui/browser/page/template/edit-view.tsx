import { Button, H1, InputGroup, Intent } from "@blueprintjs/core";
import pretty from "pretty";
import { useHistory } from "react-router";
import { HTMLEditor } from "../../common/html-editor";
import { GlobalToaster } from "../../common/toaster";
import { TemplateListPath } from "../../route-path";

type Props = {
  id?: string;
  title: React.MutableRefObject<HTMLInputElement>;
  body: string;
  setBody: (body: string) => void;
  save: () => Promise<void>;
  remove: () => Promise<void>;
};

export const TemplateEditView = (props: Props) => {
  const history = useHistory();

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
        <Button
          style={{ marginRight: "12px" }}
          onClick={() => history.push(TemplateListPath.getURI())}
        >
          戻る
        </Button>

        <Button
          disabled={props.title.current.value === "" || props.body === ""}
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

      <ID id={props.id} />

      <h2>タイトル</h2>
      <InputGroup inputRef={props.title} />

      <h2>HTML</h2>
      <Button onClick={() => props.setBody(pretty(props.body))}>
        HTML整形
      </Button>
      <HTMLEditor body={props.body} setBody={props.setBody} />
    </>
  );
};

const ID = (props: { id?: string }) => {
  if (!props.id) {
    return <></>;
  }
  return (
    <>
      <h2>ID</h2>
      {props.id}
    </>
  );
};
