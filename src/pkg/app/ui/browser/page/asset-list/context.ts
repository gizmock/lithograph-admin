import { createContext } from "react";
import { AssetObject } from "../../../../../domain/model/asset";

export type AssetListState = {
  prefix: string;
  objs: AssetObject[];
};

export const AssetListStateContext = createContext({} as AssetListState);

export type AssetListAction = {
  load: () => Promise<void>;
  changePrefix: (prefix: string) => Promise<void>;
  openObject: (obj?: AssetObject) => Promise<void>;
  makeDirectory: (name: string) => Promise<void>;
};

export const AssetListActionContext = createContext({} as AssetListAction);
