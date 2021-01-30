import { useContext } from "react";
import { StorageObject } from "../../../../../file-storage";
import { InfraContext } from "../../../context";
import { AssetControlButton } from "../view/control-button";
import { AssetList } from "../view/object-list";
import { PrefixBreadcrumbs } from "../view/prefix-breadcrumbs";

type Props = {
  initialized: boolean;
  prefix: string;
  objs: StorageObject[];
  loadPrefix: (prefix: string) => void;
  openFile: (path: string) => void;
};

export const AssetListView = (props: Props) => {
  const storage = useContext(InfraContext).fileStorage;

  const open = async (obj?: StorageObject) => {
    if (!obj) {
      return;
    } else if (obj.directory) {
      props.loadPrefix(obj.path);
    } else {
      props.openFile(obj.path);
    }
  };

  const makeDirectory = async (name: string) => {
    await storage.makeDirectory(props.prefix + name);
    props.loadPrefix(props.prefix);
  };

  return (
    <>
      <h1>ファイル一覧</h1>
      <div>
        <AssetControlButton
          prefix={props.prefix}
          makeDirectory={makeDirectory}
        />
      </div>
      <PrefixBreadcrumbs
        prefix={props.prefix}
        delimiter={StorageObject.delimiter}
        onClick={props.loadPrefix}
      />
      <AssetList
        initialized={props.initialized}
        objs={props.objs}
        onObjectClick={open}
      />
    </>
  );
};
