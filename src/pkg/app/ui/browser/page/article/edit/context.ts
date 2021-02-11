import { createContext } from "react";

export type ArticleEditState = {
  id?: string;
  blocking: boolean;
  setBlocking: (blocking: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  body: string;
  setBody: (body: string) => void;
  published: Date;
  setPublished: (published: Date) => void;
};

export const ArticleEditStateContext = createContext({} as ArticleEditState);

export type ArticleEditAction = {
  initializeArticle: () => Promise<void>;
  saveArticle: () => Promise<void>;
};

export const ArticleEditActionContext = createContext({} as ArticleEditAction);
