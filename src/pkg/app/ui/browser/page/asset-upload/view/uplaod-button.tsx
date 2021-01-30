import { Button, Intent } from "@blueprintjs/core";
import { useContext } from "react";
import { FileWithPath } from "react-dropzone";
import { FileSaveProgress } from "../../../../../file-storage";
import { GlobalToaster } from "../../../common/toaster";
import { InfraContext } from "../../../context";

type Props = {
  prefix: string;
  delimiter: string;
  files: FileWithPath[];
  clearFiles: () => void;
  uploadCallback?: (progress: FileSaveProgress) => void;
};

export const AssetUploadButton = (props: Props) => {
  return (
    <div>
      <UploadButton {...props} />
    </div>
  );
};

const UploadButton = (props: Props) => {
  const files = props.files;
  const prefix = props.prefix;
  const storage = useContext(InfraContext).fileStorage;
  const onClick = async () => {
    for (const file of files) {
      // erase first delimiter
      const path = file.path!.startsWith(props.delimiter)
        ? file.path!.slice(1)
        : file.path!;
      try {
        await storage.saveFile(prefix + path, file, props.uploadCallback);
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
    props.clearFiles();
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
