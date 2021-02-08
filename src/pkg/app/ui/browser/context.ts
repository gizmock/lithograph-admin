import { createContext } from "react";
import { Authorizer, AuthSession } from "../../authorizer";
import { AssetStorage } from "../../../domain/model/asset";
import { AsssetUsecase } from "../../../domain/usecase/asset";

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
};

export const UsecaseContext = createContext({} as UsecaseContextValue);

type InfraContextValue = {
  authorizer: Authorizer;
  fileStorage: AssetStorage;
};

export const InfraContext = createContext({} as InfraContextValue);
