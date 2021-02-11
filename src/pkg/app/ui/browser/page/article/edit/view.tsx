import { Button, InputGroup } from "@blueprintjs/core";
import { useDidMount } from "beautiful-react-hooks";
import pretty from "pretty";
import { useContext } from "react";
import { UsecaseContext } from "../../../context";
import { ArticleEditStateContext } from "./context";
import { HTMLEditor } from "./html-editor";

export const ArticleEditView = () => {
  const state = useContext(ArticleEditStateContext);
  const query = useContext(UsecaseContext).article.query;

  useDidMount(async () => {
    if (state.id) {
      const data = await query.getArticle(state.id);
      if (data) {
        state.setTitle(data.title);
        state.setBody(data.body);
      }
    }
  });

  return (
    <>
      <h1>記事編集</h1>

      <h2>タイトル</h2>
      <InputGroup
        value={state.title}
        onChange={(e) => state.setTitle(e.target.value)}
      />

      <h2>本文</h2>
      <Button onClick={() => state.setBody(pretty(state.body))}>整形</Button>
      <HTMLEditor body={state.body} setBody={state.setBody} />
    </>
  );
};
