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

const LIMIT = 10;

export const ArticleListActionProvider = (props: {
  children: React.ReactNode;
}) => {
  const state = useContext(ArticleListStateContext);
  const query = useContext(UsecaseContext).article.query;

  const findFirst = async () => {
    const result = await query.findByPublishedDate({
      direction: "before",
      limit: LIMIT,
    });
    state.setArticles(result.datas);
  };

  const findByPublishedDateBefore = async () => {
    const len = state.articles.length;
    const result = await query.findByPublishedDate({
      boundaryKey: len > 0 ? state.articles[len - 1].sortKey : undefined,
      direction: "before",
      limit: LIMIT,
    });
    state.setArticles(result.datas);
  };

  const findByPublishedDateAfter = async () => {
    const result = await query.findByPublishedDate({
      boundaryKey:
        state.articles.length > 0 ? state.articles[0].sortKey : undefined,
      direction: "after",
      limit: LIMIT,
    });
    state.setArticles(result.datas);
  };

  return (
    <ArticleListActionContext.Provider
      value={{
        findFirst: findFirst,
        findByPublishedDateBefore: findByPublishedDateBefore,
        findByPublishedDateAfter: findByPublishedDateAfter,
      }}
    >
      {props.children}
    </ArticleListActionContext.Provider>
  );
};
