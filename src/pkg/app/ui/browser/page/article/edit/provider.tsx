import { useState } from "react";
import { ArticleData } from "../../../../../../query/data/article";
import { ArticleEditActionContext, ArticleEditStateContext } from "./context";

export const ArticleEditStateProvider = (props: {
  children: React.ReactNode;
}) => {
  const [article, setArticle] = useState(undefined as ArticleData | undefined);

  return (
    <ArticleEditStateContext.Provider
      value={{
        id: "",
        article: article,
        setArticle: setArticle,
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
