import { createContext } from "react";
import { Authorizer, AuthSession } from "../../app/authorizer";
import { AssetStorage } from "../../domain/asset";
import { AsssetUsecase } from "../../app/command/asset";
import { ArticleUsecase } from "../../app/command/article-usecase";
import { ArticleQueryService } from "../../app/query/article";

type ThemeContextValue = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const ThemeContext = createContext({} as ThemeContextValue);

type SiteContextValue = {
  name: string;
};

export const SiteContext = createContext({} as SiteContextValue);

type SessionContextValue = {
  session?: AuthSession;
  setSession: (sesssion?: AuthSession) => void;
};

export const SessionContext = createContext({} as SessionContextValue);

type UsecaseContextValue = {
  asset: AsssetUsecase;
  article: {
    command: ArticleUsecase;
    query: ArticleQueryService;
  };
};

export const UsecaseContext = createContext({} as UsecaseContextValue);

type InfraContextValue = {
  authorizer: Authorizer;
  fileStorage: AssetStorage;
};

export const InfraContext = createContext({} as InfraContextValue);
