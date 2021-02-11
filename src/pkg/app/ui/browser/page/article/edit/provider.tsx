import { useState } from "react";
import { useParams } from "react-router";
import { ArticleEditPathParam } from "../../../route-path";
import { ArticleEditActionContext, ArticleEditStateContext } from "./context";

export const ArticleEditStateProvider = (props: {
  children: React.ReactNode;
}) => {
  const params = useParams<ArticleEditPathParam>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <ArticleEditStateContext.Provider
      value={{
        id: params.id,
        title: title,
        setTitle: setTitle,
        body: body,
        setBody: setBody,
      }}
    >
      {props.children}
    </ArticleEditStateContext.Provider>
  );
};

export const ArticleEditActionProvider = (props: {
  children: React.ReactNode;
}) => {
  return (
    <ArticleEditActionContext.Provider value={{}}>
      {props.children}
    </ArticleEditActionContext.Provider>
  );
};
