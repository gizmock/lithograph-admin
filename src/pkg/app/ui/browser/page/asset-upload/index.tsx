import { useState } from "react";
import { FileWithPath } from "react-dropzone";
import { useParams } from "react-router";
import { StorageObject } from "../../../../../domain/model/file-storage";
import { AssetUploadPathParam } from "../../route-path";
import { AssetUploadView } from "./view";

export const AssetUploadPage = () => {
  const params = useParams<AssetUploadPathParam>();
  const prefix = decodeURIComponent(params.prefix);
  const [files, setFiles] = useState([] as FileWithPath[]);

  if (!params.prefix) {
    return (
      <>
        <h1>ファイルアップロード</h1>
        不正なURLです
      </>
    );
  }
  return (
    <AssetUploadView
      prefix={prefix}
      delimiter={StorageObject.delimiter}
      files={files}
      setFiles={setFiles}
    />
  );
};
