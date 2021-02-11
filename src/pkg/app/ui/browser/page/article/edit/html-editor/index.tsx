import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./html-editor.css";
require("codemirror/mode/htmlmixed/htmlmixed");

type Props = {
  body: string;
  setBody: (body: string) => void;
};

export const HTMLEditor = (props: Props) => {
  return (
    <CodeMirror
      value={props.body}
      options={{
        mode: "htmlmixed",
        theme: "material",
      }}
      onBeforeChange={(_1, _2, value) => {
        props.setBody(value);
      }}
    />
  );
};
