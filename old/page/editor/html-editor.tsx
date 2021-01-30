import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "./html-editor.css";
require("codemirror/mode/htmlmixed/htmlmixed");

type Props = {
  body: string;
  updateBody: (body: string) => void;
};

export const HtmlEditor = (props: Props) => {
  return (
    <CodeMirror
      value={props.body}
      options={{
        mode: "htmlmixed",
        theme: "material",
      }}
      onBeforeChange={(editor, data, value) => {
        props.updateBody(value);
      }}
    />
  );
};
