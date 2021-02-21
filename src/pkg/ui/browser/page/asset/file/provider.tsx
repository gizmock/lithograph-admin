import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router";
import { PATH_DELIMITER, AssetObject } from "../../../../../domain/asset";
import { InfraContext } from "../../../context";
import { AssetFilePathParam, AssetListPath } from "../../../route-path";
import { AssetFileActionContext, AssetFileStateContext } from "./context";

export const AssetFileStateProvider = (props: {
  children: React.ReactNode;
}) => {
  const params = useParams<AssetFilePathParam>();
  const path = decodeURIComponent(params.path);
  const [obj, setObj] = useState(undefined as AssetObject | undefined);

  return (
    <AssetFileStateContext.Provider
      value={{
        path: path,
        obj: obj,
        setObj: setObj,
      }}
    >
      {props.children}
    </AssetFileStateContext.Provider>
  );
};

export const AssetFileActionProvider = (props: {
  children: React.ReactNode;
}) => {
  const storage = useContext(InfraContext).fileStorage;
  const state = useContext(AssetFileStateContext);
  const history = useHistory();

  const backToList = () => {
    history.push(AssetListPath.makeURI(makePrefix(state.path)));
  };

  const download = async () => {
    window.open(await storage.fileURL(state.obj!.path()));
  };

  const load = async () => {
    state.setObj(await storage.get(state.path));
  };

  return (
    <AssetFileActionContext.Provider
      value={{
        backToList: backToList,
        download: download,
        load: load,
      }}
    >
      {props.children}
    </AssetFileActionContext.Provider>
  );
};

function makePrefix(path: string) {
  const delimiter = PATH_DELIMITER;
  const names = path.split(delimiter);
  const prefix =
    names.filter((_, index) => index < names.length - 1).join(delimiter) +
    delimiter;
  return prefix;
}
