import { Button, H1, InputGroup, Intent } from "@blueprintjs/core";
import { useRef } from "react";
import { useHistory } from "react-router";
import { GlobalToaster } from "../../common/toaster";
import { CategoryListPath } from "../../route-path";

type Props = {
  id?: string;
  title: React.MutableRefObject<HTMLInputElement>;
  add: (id: string) => Promise<void>;
  save: () => Promise<void>;
  remove: () => Promise<void>;
};

export const CategoryEditView = (props: Props) => {
  const history = useHistory();
  const newID = useRef({ value: "" } as HTMLInputElement);

  const onSaveClick = async () => {
    try {
      if (props.id) {
        await props.save();
      } else {
        await props.add(newID.current.value);
      }
      GlobalToaster.show({
        intent: Intent.SUCCESS,
        message: "カテゴリを保存しました",
      });
    } catch {
      GlobalToaster.show({
        intent: Intent.DANGER,
        message: "カテゴリを保存できませんでした",
      });
    }
  };

  const onRemoveClick = async () => {
    try {
      await props.remove();
      GlobalToaster.show({
        intent: Intent.SUCCESS,
        message: "カテゴリを削除しました",
      });
    } catch {
      GlobalToaster.show({
        intent: Intent.DANGER,
        message: "カテゴリを削除できませんでした",
      });
    }
  };

  return (
    <>
      <H1>カテゴリ編集</H1>

      <div>
        <Button
          style={{ marginRight: "12px" }}
          onClick={() => history.push(CategoryListPath.getURI())}
        >
          戻る
        </Button>

        <Button
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

      <h2>ID</h2>
      {props.id ? <>{props.id}</> : <InputGroup inputRef={newID} />}

      <h2>タイトル</h2>
      <InputGroup inputRef={props.title} />
    </>
  );
};
