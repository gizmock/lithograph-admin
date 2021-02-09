import { createContext } from "react";
import { AssetObject } from "../../../../../../domain/model/asset";

export type AssetDeleteState = {
  prefix: string;
  objs: AssetObject[];
  setObjs: (objs: AssetObject[]) => void;
  checkedObjs: AssetObject[];
  setCheckedObjs: (objs: AssetObject[]) => void;
};

export const AssetDeleteStateContext = createContext({} as AssetDeleteState);

export type AssetDeleteAction = {
  refresh: () => Promise<void>;
  backToList: () => void;
};

export const AssetDeleteActionContext = createContext({} as AssetDeleteAction);
