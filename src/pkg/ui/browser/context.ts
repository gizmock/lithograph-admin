import { createContext } from "react";
import { Authorizer, AuthSession } from "../../app/authorizer";
import { AssetStorage } from "../../domain/asset";
import { AsssetUsecase } from "../../app/usecase/asset";
import { ArticleUsecase } from "../../app/usecase/article";
import { ArticleQueryService } from "../../app/query/article";
import { TemplateUsecase } from "../../app/usecase/template";
import { TemplateQueryService } from "../../app/query/template";
import { CategoryUsecase } from "../../app/usecase/category";
import { CategoryQueryService } from "../../app/query/category";

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
    usecase: ArticleUsecase;
    query: ArticleQueryService;
  };
  template: {
    usecase: TemplateUsecase;
    query: TemplateQueryService;
  };
  category: {
    usecase: CategoryUsecase;
    query: CategoryQueryService;
  };
};

export const UsecaseContext = createContext({} as UsecaseContextValue);

type InfraContextValue = {
  authorizer: Authorizer;
  fileStorage: AssetStorage;
};

export const InfraContext = createContext({} as InfraContextValue);
