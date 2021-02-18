import { useContext, useState } from "react";
import { ArticleSearchData } from "../../../../../../query/data/article";
import { UsecaseContext } from "../../../context";
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
  const state = useContext(ArticleListStateContext);
  const query = useContext(UsecaseContext).article.query;

  const findFirst = async (title: string) => {
    const result = await query.findByTitle({
      title: title,
      direction: "before",
    });
    state.setArticles(result.datas);
  };

  const findAfter = async (title: string) => {
    const result = await query.findByTitle({
      title: title,
      boundaryKey:
        state.articles.length > 0 ? state.articles[0].sortKey : undefined,
      direction: "after",
    });
    state.setArticles(result.datas);
  };

  const findBefore = async (title: string) => {
    const len = state.articles.length;
    const result = await query.findByTitle({
      title: title,
      boundaryKey: len > 0 ? state.articles[len - 1].sortKey : undefined,
      direction: "before",
    });
    state.setArticles(result.datas);
  };

  return (
    <ArticleListActionContext.Provider
      value={{
        findFirst: findFirst,
        findBefore: findBefore,
        findAfter: findAfter,
      }}
    >
      {props.children}
    </ArticleListActionContext.Provider>
  );
};
