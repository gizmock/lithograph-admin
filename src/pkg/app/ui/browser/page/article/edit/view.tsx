import { useDidMount } from "beautiful-react-hooks";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { useContext, useRef, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { UsecaseContext } from "../../../context";
import { ArticleEditStateContext } from "./context";
import "./html-editor.css";
require("codemirror/mode/htmlmixed/htmlmixed");

export const ArticleEditView = () => {
  const state = useContext(ArticleEditStateContext);
  const query = useContext(UsecaseContext).article.query;

  useDidMount(async () => {
    if (state.id) {
      const data = await query.getArticle(state.id);
      state.setArticle(data);
    }
  });

  const title = useRef({ value: "" } as HTMLInputElement);
  const [body, setBody] = useState("");

  // pretty(value)

  return (
    <>
      <h1>記事編集</h1>
      <h2>タイトル</h2>
      <input type={"text"} ref={title} />
      <h2>本文</h2>
      <CodeMirror
        value={body}
        options={{
          mode: "htmlmixed",
          theme: "material",
        }}
        onBeforeChange={(_1, _2, value) => {
          setBody(value);
        }}
      />
    </>
  );
};
