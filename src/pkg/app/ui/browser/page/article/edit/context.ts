import { createContext } from "react";
import { ArticleData } from "../../../../../../query/data/article";

export type ArticleEditState = {
  id?: string;
  article?: ArticleData;
  setArticle: (articles?: ArticleData) => void;
};

export const ArticleEditStateContext = createContext({} as ArticleEditState);

export type ArticleEditAction = {};

export const ArticleEditActionContext = createContext({} as ArticleEditAction);
