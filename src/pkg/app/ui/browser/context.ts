import { createContext } from "react";
import { Authorizer, AuthSession } from "../../authorizer";
import { FileStorage } from "../../../domain/model/file-storage";

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

type InfraContextValue = {
  authorizer: Authorizer;
  fileStorage: FileStorage;
};

export const InfraContext = createContext({} as InfraContextValue);
