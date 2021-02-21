import { createContext } from "react";
import { ArticleSearchData } from "../../../../../../query/data/article";

export type ArticleListState = {
  articles: ArticleSearchData[];
  setArticles: (articles: ArticleSearchData[]) => void;
};

export const ArticleListStateContext = createContext({} as ArticleListState);

export type ArticleListAction = {
  findByPublishedDateBefore: (ignore?: boolean) => Promise<void>;
  findByPublishedDateAfter: () => Promise<void>;
  findByTitleBefore: (title: string) => Promise<void>;
  findByTitleAfter: (title: string, ignore?: boolean) => Promise<void>;
};

export const ArticleListActionContext = createContext({} as ArticleListAction);
