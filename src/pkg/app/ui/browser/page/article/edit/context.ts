import { createContext } from "react";

export type ArticleEditState = {
  id?: string;
  title: string;
  setTitle: (title: string) => void;
  body: string;
  setBody: (body: string) => void;
};

export const ArticleEditStateContext = createContext({} as ArticleEditState);

export type ArticleEditAction = {};

export const ArticleEditActionContext = createContext({} as ArticleEditAction);
