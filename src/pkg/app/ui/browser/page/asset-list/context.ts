import { createContext } from "react";
import { StorageObject } from "../../../../../domain/model/file-storage";

export type AssetListState = {
  prefix: string;
  objs: StorageObject[];
};

export const AssetListStateContext = createContext({} as AssetListState);

export type AssetListAction = {
  load: () => Promise<void>;
  changePrefix: (prefix: string) => Promise<void>;
  openObject: (obj?: StorageObject) => Promise<void>;
  makeDirectory: (name: string) => Promise<void>;
};

export const AssetListActionContext = createContext({} as AssetListAction);
