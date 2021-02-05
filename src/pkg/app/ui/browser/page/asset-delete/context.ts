import { createContext } from "react";
import { StorageObject } from "../../../../../domain/model/file-storage";

export type AssetDeleteState = {
  prefix: string;
  objs: StorageObject[];
  setObjs: (objs: StorageObject[]) => void;
  checkedObjs: StorageObject[];
  setCheckedObjs: (objs: StorageObject[]) => void;
};

export const AssetDeleteStateContext = createContext({} as AssetDeleteState);

export type AssetDeleteAction = {
  remove: (obj: StorageObject) => Promise<void>;
  refresh: () => Promise<void>;
  backToList: () => void;
};

export const AssetDeleteActionContext = createContext({} as AssetDeleteAction);
