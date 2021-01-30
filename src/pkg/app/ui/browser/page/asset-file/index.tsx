import { Intent } from "@blueprintjs/core";
import { useDidMount } from "beautiful-react-hooks";
import { useContext, useState } from "react";
import { useParams } from "react-router";
import { StorageObject } from "../../../../file-storage";
import { GlobalToaster } from "../../common/toaster";
import { InfraContext } from "../../context";
import { AssetFilePathParam } from "../../route-path";
import { AssetFileView } from "./view";

export const AssetFilePage = () => {
  const storage = useContext(InfraContext).fileStorage;
  const params = useParams<AssetFilePathParam>();
  const path = decodeURIComponent(params.path);
  const [obj, setObj] = useState(undefined as StorageObject | undefined);

  useDidMount(async () => {
    try {
      setObj(await storage.get(path));
    } catch {
      GlobalToaster.show({
        intent: Intent.DANGER,
        message: "ファイルを読み込めませんでした",
      });
    }
  });

  return (
    <AssetFileView path={path} obj={obj} delimiter={StorageObject.delimiter} />
  );
};
