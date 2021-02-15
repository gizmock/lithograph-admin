import { useState } from "react";
import { ArticleSearchData } from "../../../../../../query/data/article";
import { ArticleListActionContext, ArticleListStateContext } from "./context";

export const ArticleListStateProvider = (props: {
  children: React.ReactNode;
}) => {
  const [articles, setArticles] = useState([] as ArticleSearchData[]);

  return (
    <ArticleListStateContext.Provider
      value={{
        articles: articles,
        setArticles: setArticles,
      }}
    >
      {props.children}
    </ArticleListStateContext.Provider>
  );
};

export const ArticleListActionProvider = (props: {
  children: React.ReactNode;
}) => {
  return (
    <ArticleListActionContext.Provider value={{}}>
      {props.children}
    </ArticleListActionContext.Provider>
  );
};
