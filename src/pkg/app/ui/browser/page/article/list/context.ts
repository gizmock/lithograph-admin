import { createContext } from "react";
import { ArticleSearchData } from "../../../../../../query/data/article";

export type ArticleListState = {
  articles: ArticleSearchData[];
  setArticles: (articles: ArticleSearchData[]) => void;
  hasPreview: boolean;
  setHasPreview: (hasPreview: boolean) => void;
  hasNext: boolean;
  setHasNext: (hasNext: boolean) => void;
};

export const ArticleListStateContext = createContext({} as ArticleListState);

export type ArticleListAction = {
  findFirst: (title: string) => Promise<void>;
  findBefore: (title: string) => Promise<void>;
  findAfter: (title: string) => Promise<void>;
};

export const ArticleListActionContext = createContext({} as ArticleListAction);
