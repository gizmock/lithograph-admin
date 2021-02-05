import { useWillUnmount } from "beautiful-react-hooks";
import { useContext } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import {
  ASSET_ROOT,
  StorageObject,
} from "../../../../../domain/model/file-storage";
import { InfraContext } from "../../context";
import {
  AssetFilePath,
  AssetListPath,
  AssetListPathParam,
} from "../../route-path";
import { AssetListActionContext, AssetListStateContext } from "./context";

type LocationState =
  | {
      prefix?: string;
      objs?: StorageObject[];
    }
  | undefined;

export const AssetListStateProvider = (props: {
  children: React.ReactNode;
}) => {
  const location = useLocation<LocationState>();
  const params = useParams<AssetListPathParam>();
  const state = location.state;
  const prefix =
    state && state.prefix
      ? state.prefix
      : params && params.prefix
      ? decodeURIComponent(params.prefix)
      : ASSET_ROOT;
  const objs = state && state.objs ? state.objs : ([] as StorageObject[]);

  return (
    <AssetListStateContext.Provider
      value={{
        prefix: prefix,
        objs: objs,
      }}
    >
      {props.children}
    </AssetListStateContext.Provider>
  );
};

export const AssetListActionProvider = (props: {
  children: React.ReactNode;
}) => {
  const history = useHistory<LocationState>();
  const state = useContext(AssetListStateContext);
  const storage = useContext(InfraContext).fileStorage;

  useWillUnmount(async () => {
    history.replace({
      state: undefined,
    });
  });

  const load = async () => {
    history.replace({
      state: {
        prefix: state.prefix,
        objs: await storage.list(state.prefix),
      },
    });
  };

  const changePrefix = async (prefix: string) => {
    history.push({
      pathname: AssetListPath.makeURI(prefix),
      state: {
        prefix: prefix,
        objs: await storage.list(prefix),
      },
    });
  };

  const openObject = async (obj?: StorageObject) => {
    if (!obj) {
      return;
    } else if (obj.directory) {
      await changePrefix(obj.path);
    } else {
      history.push(AssetFilePath.makeURI(obj.path));
    }
  };

  const makeDirectory = async (name: string) => {
    await storage.makeDirectory(state.prefix + name);
    load();
  };

  return (
    <AssetListActionContext.Provider
      value={{
        load: load,
        changePrefix: changePrefix,
        openObject: openObject,
        makeDirectory: makeDirectory,
      }}
    >
      {props.children}
    </AssetListActionContext.Provider>
  );
};
