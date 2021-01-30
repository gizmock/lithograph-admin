import { useState } from "react";
import { FileWithPath } from "react-dropzone";
import { FileSaveProgress } from "../../../../../file-storage";
import { AssetUploadButton } from "./uplaod-button";
import { AssetUploadList } from "./upload-list";
import { AssetUploadProgress } from "./upload-progress";
import { AssetUploadSelector } from "./upload-selector";
import { AssetUploadTo } from "./upload-to";

type Props = {
  prefix: string;
  delimiter: string;
  files: FileWithPath[];
  setFiles: (files: FileWithPath[]) => void;
};

export const AssetUploadView = (props: Props) => {
  const [progress, setProgress] = useState(
    undefined as FileSaveProgress | undefined
  );

  return (
    <>
      <h1>ファイルアップロード</h1>
      <AssetUploadTo prefix={props.prefix} />
      <AssetUploadSelector setFiles={props.setFiles} />
      <AssetUploadList files={props.files} />
      <AssetUploadButton
        prefix={props.prefix}
        delimiter={props.delimiter}
        files={props.files}
        clearFiles={() => props.setFiles([])}
        uploadCallback={setProgress}
      />
      <AssetUploadProgress progress={progress} />
    </>
  );
};
