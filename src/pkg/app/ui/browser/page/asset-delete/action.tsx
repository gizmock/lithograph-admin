import { useContext } from "react";
import { useHistory } from "react-router";
import { FileStorage, StorageObject } from "../../../../file-storage";
import { AssetListPath } from "../../route-path";
import { AssetDeleteActionContext, AssetDeleteStateContext } from "./context";

type Props = {
  storage: FileStorage;
  children: React.ReactNode;
};

export const AssetDeleteActionProvider = (props: Props) => {
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
