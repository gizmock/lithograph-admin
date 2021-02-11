import { Button, H1, InputGroup, Intent } from "@blueprintjs/core";
import { DatePicker } from "@blueprintjs/datetime";
import { useDidMount } from "beautiful-react-hooks";
import pretty from "pretty";
import { useContext } from "react";
import { useHistory } from "react-router";
import { GlobalToaster } from "../../../common/toaster";
import { ArticleListPath } from "../../../route-path";
import { ArticleEditActionContext, ArticleEditStateContext } from "./context";
import { HTMLEditor } from "./html-editor";

export const ArticleEditView = () => {
  const state = useContext(ArticleEditStateContext);
  const action = useContext(ArticleEditActionContext);
  const history = useHistory();

  useDidMount(async () => {
    try {
      await action.initializeArticle();
    } catch {
      GlobalToaster.show({
        intent: Intent.DANGER,
        message: "記事の読込に失敗しました",
      });
    }
  });

  const save = async () => {
    try {
      await action.saveArticle();
      GlobalToaster.show({
        intent: Intent.SUCCESS,
        message: "記事を保存しました",
      });
    } catch {
      GlobalToaster.show({
        intent: Intent.DANGER,
        message: "記事の保存に失敗しました",
      });
    }
  };

  const blocking = state.blocking;

  return (
    <>
      <H1>記事編集</H1>

      <div>
        <Button onClick={() => history.push(ArticleListPath.getURI())}>
          戻る
        </Button>
      </div>

      <div>
        <Button
          disabled={blocking || state.title === "" || state.body === ""}
          intent={Intent.PRIMARY}
          onClick={save}
        >
          保存
        </Button>
      </div>

      {state.id ? (
        <>
          <h2>ID</h2>
          {state.id}
        </>
      ) : (
        <></>
      )}

      <h2>公開日時</h2>
      <DatePicker
        highlightCurrentDay
        reverseMonthAndYearMenus
        timePickerProps={{ showArrowButtons: true }}
        value={state.published}
        onChange={(date) => state.setPublished(date)}
      />

      <h2>タイトル</h2>
      <InputGroup
        disabled={blocking}
        value={state.title}
        onChange={(e) => state.setTitle(e.target.value)}
      />

      <h2>本文</h2>
      <Button
        disabled={blocking}
        onClick={() => state.setBody(pretty(state.body))}
      >
        HTML整形
      </Button>
      <HTMLEditor
        body={state.body}
        setBody={blocking ? () => {} : state.setBody}
      />
    </>
  );
};
