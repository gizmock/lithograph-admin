import { createContext } from "react";
import { AssetObject } from "../../../../../domain/model/asset";

export type AssetFileState = {
  path: string;
  obj?: AssetObject;
  setObj: (obj: AssetObject) => void;
};

export const AssetFileStateContext = createContext({} as AssetFileState);

export type AssetFileAction = {
  backToList: () => void;
  download: () => void;
  load: () => Promise<void>;
};

export const AssetFileActionContext = createContext({} as AssetFileAction);
