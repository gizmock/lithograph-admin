import { useContext, useState } from "react";
import { useHistory } from "react-router";
import {
  FileStorage,
  StorageObject,
} from "../../../../../domain/model/file-storage";
import { AssetListPath } from "../../route-path";
import { AssetDeleteActionContext, AssetDeleteStateContext } from "./context";

export const AssetDeleteStateProvider = (props: {
  prefix: string;
  children: React.ReactNode;
}) => {
  const [objs, setObjs] = useState([] as StorageObject[]);
  const [checkedObjs, setCheckedObjs] = useState([] as StorageObject[]);
  return (
    <AssetDeleteStateContext.Provider
      value={{
        prefix: props.prefix,
        objs: objs,
        setObjs: setObjs,
        checkedObjs: checkedObjs,
        setCheckedObjs: setCheckedObjs,
      }}
    >
      {props.children}
    </AssetDeleteStateContext.Provider>
  );
};

export const AssetDeleteActionProvider = (props: {
  storage: FileStorage;
  children: React.ReactNode;
}) => {
  const state = useContext(AssetDeleteStateContext);
  const storage = props.storage;

  const remove = async (obj: StorageObject) => {
    if (obj.directory) {
      await storage.removeDirectory(obj.path);
    } else {
      await storage.removeFile(obj.path);
    }
  };

  const refresh = async () => {
    const objs = await storage.list(state.prefix);
    state.setObjs(objs);
    state.setCheckedObjs([]);
  };

  const history = useHistory();
  const backToList = () => {
    history.push(AssetListPath.makeURI(state.prefix));
  };

  return (
    <AssetDeleteActionContext.Provider
      value={{
        remove: remove,
        refresh: refresh,
        backToList: backToList,
      }}
    >
      {props.children}
    </AssetDeleteActionContext.Provider>
  );
};
