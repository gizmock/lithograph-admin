import { createContext } from "react";
import { StorageObject } from "../../../../../domain/model/file-storage";

export type AssetFileState = {
  path: string;
  obj?: StorageObject;
  setObj: (obj: StorageObject) => void;
};

export const AssetFileStateContext = createContext({} as AssetFileState);

export type AssetFileAction = {
  backToList: () => void;
  download: () => void;
  read: () => Promise<void>;
};

export const AssetFileActionContext = createContext({} as AssetFileAction);
