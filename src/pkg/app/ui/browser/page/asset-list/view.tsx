import { useDidMount, useWillUnmount } from "beautiful-react-hooks";
import { useContext, useState } from "react";
import { StorageObject } from "../../../../../domain/model/file-storage";
import { AssetListActionContext, AssetListStateContext } from "./context";
import { AssetControlButton } from "./view/control-button";
import { AssetList } from "./view/object-list";
import { PrefixBreadcrumbs } from "./view/prefix-breadcrumbs";

export const AssetListView = () => {
  const state = useContext(AssetListStateContext);
  const action = useContext(AssetListActionContext);

  const [mounted, setMounted] = useState(true);
  const [initialized, setInitialized] = useState(false);
  useDidMount(async () => {
    await action.load();
    if (mounted) {
      setInitialized(true);
    }
  });

  useWillUnmount(async () => {
    setMounted(false);
  });

  return (
    <>
      <h1>ファイル一覧</h1>
      <div>
        <AssetControlButton
          prefix={state.prefix}
          makeDirectory={action.makeDirectory}
        />
      </div>
      <PrefixBreadcrumbs
        prefix={state.prefix}
        delimiter={StorageObject.delimiter}
        onClick={action.changePrefix}
      />
      <AssetList
        initialized={initialized}
        objs={state.objs}
        onObjectClick={action.openObject}
      />
    </>
  );
};
