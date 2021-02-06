import { Button, Intent } from "@blueprintjs/core";
import { useContext } from "react";
import { StorageObject } from "../../../../../../domain/model/file-storage";
import { GlobalToaster } from "../../../common/toaster";
import { InfraContext } from "../../../context";
import { AssetUploadStateContext } from "../context";

export const AssetUploadButton = () => {
  const state = useContext(AssetUploadStateContext);

  const files = state.files;
  const prefix = state.prefix;
  const storage = useContext(InfraContext).fileStorage;
  const onClick = async () => {
    for (const file of files) {
      // erase first delimiter
      const path = file.path!.startsWith(StorageObject.delimiter)
        ? file.path!.slice(1)
        : file.path!;
      try {
        await storage.saveFile(prefix + path, file, state.setProgress);
      } catch {
        GlobalToaster.show({
          intent: Intent.DANGER,
          message: "ファイルのアップロードに失敗しました",
        });
      }
    }
    GlobalToaster.show({
      intent: Intent.SUCCESS,
      message: "ファイルを全てアップロードしました",
    });
    state.setFiles([]);
  };
  return (
    <Button
      disabled={files.length === 0}
      intent={Intent.PRIMARY}
      onClick={onClick}
    >
      アップロード
    </Button>
  );
};
