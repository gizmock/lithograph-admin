import { createContext } from "react";
import { ArticleSearchResult } from "../../../../../../query/data/article";

export type ArticleListState = {
  articles: ArticleSearchResult[];
  setArticles: (articles: ArticleSearchResult[]) => void;
};

export const ArticleListStateContext = createContext({} as ArticleListState);

export type ArticleListAction = {};

export const ArticleListActionContext = createContext({} as ArticleListAction);
