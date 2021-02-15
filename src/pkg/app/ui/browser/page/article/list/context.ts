import { createContext } from "react";
import { ArticleSearchData } from "../../../../../../query/data/article";

export type ArticleListState = {
  articles: ArticleSearchData[];
  setArticles: (articles: ArticleSearchData[]) => void;
};

export const ArticleListStateContext = createContext({} as ArticleListState);

export type ArticleListAction = {};

export const ArticleListActionContext = createContext({} as ArticleListAction);
