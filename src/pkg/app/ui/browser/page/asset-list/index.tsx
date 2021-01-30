import { useDidMount, useWillUnmount } from "beautiful-react-hooks";
import { useContext, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { StorageObject } from "../../../../file-storage";
import { InfraContext } from "../../context";
import {
  AssetFilePath,
  AssetListPath,
  AssetListPathParam,
} from "../../route-path";
import { AssetListView } from "./view";

const ASSET_ROOT = "public/asset/";

type State =
  | {
      prefix?: string;
      objs?: StorageObject[];
    }
  | undefined;

export const AssetListPage = () => {
  const location = useLocation<State>();
  const params = useParams<AssetListPathParam>();
  const state = location.state;
  const prefix =
    state && state.prefix
      ? state.prefix
      : params && params.prefix
      ? decodeURIComponent(params.prefix)
      : ASSET_ROOT;
  const objs = state && state.objs ? state.objs : ([] as StorageObject[]);

  const history = useHistory<State>();
  const [mounted, setMounted] = useState(true);
  const [initialized, setInitialized] = useState(false);
  useDidMount(async () => {
    history.replace({
      state: {
        prefix: prefix,
        objs: await storage.list(prefix),
      },
    });
    if (mounted) {
      setInitialized(true);
    }
  });

  useWillUnmount(async () => {
    setMounted(false);
    history.replace({
      state: undefined,
    });
  });

  const storage = useContext(InfraContext).fileStorage;
  const loadPrefix = async (prefix: string) => {
    setInitialized(false);
    history.push({
      pathname: AssetListPath.makeURI(prefix),
      state: {
        prefix: prefix,
        objs: await storage.list(prefix),
      },
    });
    if (mounted) {
      setInitialized(true);
    }
  };

  const openFile = async (path: string) => {
    history.push(AssetFilePath.makeURI(path));
  };

  return (
    <AssetListView
      initialized={initialized}
      prefix={prefix}
      objs={objs}
      loadPrefix={loadPrefix}
      openFile={openFile}
    />
  );
};
