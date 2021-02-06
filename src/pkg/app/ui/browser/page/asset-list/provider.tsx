import { useWillUnmount } from "beautiful-react-hooks";
import { useContext } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import {
  ASSET_ROOT,
  AssetObject,
} from "../../../../../domain/model/asset-object";
import { InfraContext } from "../../context";
import {
  AssetFilePath,
  AssetListPath,
  AssetListPathParam,
} from "../../route-path";
import { AssetListActionContext, AssetListStateContext } from "./context";

type LocalStateObject = {
  path: string;
  lastModified?: Date;
  size?: number;
};

type LocationState =
  | {
      prefix?: string;
      objs?: LocalStateObject[];
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
  const objs = state && state.objs ? state.objs : ([] as LocalStateObject[]);

  return (
    <AssetListStateContext.Provider
      value={{
        prefix: prefix,
        objs: objs.map(
          (obj) =>
            new AssetObject(obj.path, {
              lastModified: obj.lastModified,
              size: obj.size,
            })
        ),
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
    const objs = await storage.list(state.prefix);
    history.replace({
      state: {
        prefix: state.prefix,
        objs: objs.map((obj) => {
          return {
            path: obj.path(),
            lastModified: obj.lastModified(),
            size: obj.size(),
          } as LocalStateObject;
        }),
      },
    });
  };

  const changePrefix = async (prefix: string) => {
    const objs = await storage.list(prefix);
    history.push({
      pathname: AssetListPath.makeURI(prefix),
      state: {
        prefix: prefix,
        objs: objs.map((obj) => {
          return {
            path: obj.path(),
            lastModified: obj.lastModified(),
            size: obj.size(),
          } as LocalStateObject;
        }),
      },
    });
  };

  const openObject = async (obj?: AssetObject) => {
    if (!obj) {
      return;
    } else if (obj.isDirectory()) {
      await changePrefix(obj.path());
    } else {
      history.push(AssetFilePath.makeURI(obj.path()));
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
