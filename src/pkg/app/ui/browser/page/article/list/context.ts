import { createContext } from "react";
import { ArticleData } from "../../../../../../query/data/article";

export type ArticleListState = {
  articles: ArticleData[];
  setArticles: (articles: ArticleData[]) => void;
};

export const ArticleListStateContext = createContext({} as ArticleListState);

export type ArticleListAction = {};

export const ArticleListActionContext = createContext({} as ArticleListAction);
