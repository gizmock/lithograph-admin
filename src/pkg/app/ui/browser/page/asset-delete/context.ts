import { createContext } from "react";
import { AssetObject } from "../../../../../domain/model/asset-object";

export type AssetDeleteState = {
  prefix: string;
  objs: AssetObject[];
  setObjs: (objs: AssetObject[]) => void;
  checkedObjs: AssetObject[];
  setCheckedObjs: (objs: AssetObject[]) => void;
};

export const AssetDeleteStateContext = createContext({} as AssetDeleteState);

export type AssetDeleteAction = {
  remove: (obj: AssetObject) => Promise<void>;
  refresh: () => Promise<void>;
  backToList: () => void;
};

export const AssetDeleteActionContext = createContext({} as AssetDeleteAction);
