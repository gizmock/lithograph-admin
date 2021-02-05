import { useContext, useState } from "react";
import { useHistory } from "react-router";
import {
  FileStorage,
  StorageObject,
} from "../../../../../domain/model/file-storage";
import { AssetListPath } from "../../route-path";
import { AssetFileActionContext, AssetFileStateContext } from "./context";

export const AssetFileStateProvider = (props: {
  path: string;
  children: React.ReactNode;
}) => {
  const [obj, setObj] = useState(undefined as StorageObject | undefined);
  return (
    <AssetFileStateContext.Provider
      value={{
        path: props.path,
        obj: obj,
        setObj: setObj,
      }}
    >
      {props.children}
    </AssetFileStateContext.Provider>
  );
};

export const AssetFileActionProvider = (props: {
  storage: FileStorage;
  children: React.ReactNode;
}) => {
  const state = useContext(AssetFileStateContext);
  const history = useHistory();

  const backToList = () => {
    history.push(AssetListPath.makeURI(makePrefix(state.path)));
  };

  const download = async () => {
    window.open(await props.storage.fileURL(state.obj!.path));
  };

  const read = async () => {
    state.setObj(await props.storage.get(state.path));
  };

  return (
    <AssetFileActionContext.Provider
      value={{
        backToList: backToList,
        download: download,
        read: read,
      }}
    >
      {props.children}
    </AssetFileActionContext.Provider>
  );
};

function makePrefix(path: string) {
  const delimiter = StorageObject.delimiter;
  const names = path.split(delimiter);
  const prefix =
    names.filter((_, index) => index < names.length - 1).join(delimiter) +
    delimiter;
  return prefix;
}
