import { useContext, useState } from "react";
import { ArticleSearchData } from "../../../../../app/query/article";
import { UsecaseContext } from "../../../context";
import { ArticleListActionContext, ArticleListStateContext } from "./context";

const LIMIT = 10;

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

  const findByPublishedDateBefore = async (ignore?: boolean) => {
    const len = state.articles.length;
    const boundaryKey = ignore
      ? undefined
      : len > 0
      ? state.articles[len - 1].sortKey
      : undefined;
    const result = await query.findByPublishedDate({
      boundaryKey: boundaryKey,
      direction: "before",
      limit: LIMIT,
    });
    if (result.datas.length > 0) {
      state.setArticles(result.datas);
    }
  };

  const findByPublishedDateAfter = async () => {
    const result = await query.findByPublishedDate({
      boundaryKey:
        state.articles.length > 0 ? state.articles[0].sortKey : undefined,
      direction: "after",
      limit: LIMIT,
    });
    if (result.datas.length > 0) {
      state.setArticles(result.datas);
    }
  };

  const findByTitleBefore = async (title: string) => {
    const result = await query.findByTitle({
      title: title,
      boundaryKey:
        state.articles.length > 0 ? state.articles[0].sortKey : undefined,
      direction: "before",
      limit: LIMIT,
    });
    if (result.datas.length > 0) {
      state.setArticles(result.datas);
    }
  };

  const findByTitleAfter = async (title: string, ignore?: boolean) => {
    const len = state.articles.length;
    const boundaryKey = ignore
      ? undefined
      : len > 0
      ? state.articles[len - 1].sortKey
      : undefined;
    const result = await query.findByTitle({
      title: title,
      boundaryKey: boundaryKey,
      direction: "after",
      limit: LIMIT,
    });
    if (result.datas.length > 0) {
      state.setArticles(result.datas);
    }
  };

  return (
    <ArticleListActionContext.Provider
      value={{
        findByPublishedDateBefore: findByPublishedDateBefore,
        findByPublishedDateAfter: findByPublishedDateAfter,
        findByTitleBefore: findByTitleBefore,
        findByTitleAfter: findByTitleAfter,
      }}
    >
      {props.children}
    </ArticleListActionContext.Provider>
  );
};
