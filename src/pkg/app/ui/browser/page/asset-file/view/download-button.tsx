import { Button } from "@blueprintjs/core";
import { useContext } from "react";
import { StorageObject } from "../../../../../file-storage";
import { InfraContext } from "../../../context";

type Props = {
  obj?: StorageObject;
};

export const AssetDownloadButton = (props: Props) => {
  const storage = useContext(InfraContext).fileStorage;
  const obj = props.obj;
  const onClick = async () => {
    window.open(await storage.fileURL(obj!.path));
  };
  return (
    <Button disabled={obj === undefined} onClick={onClick}>
      ダウンロード
    </Button>
  );
};
