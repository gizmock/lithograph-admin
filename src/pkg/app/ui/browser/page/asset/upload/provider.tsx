import { useState } from "react";
import { FileWithPath } from "react-dropzone";
import { useParams } from "react-router";
import { AssetSaveProgress } from "../../../../../../domain/model/asset";
import { AssetUploadPathParam } from "../../../route-path";
import { AssetUploadActionContext, AssetUploadStateContext } from "./context";

export const AssetUploadStateProvider = (props: {
  children: React.ReactNode;
}) => {
  const params = useParams<AssetUploadPathParam>();
  const prefix = decodeURIComponent(params.prefix);
  const [files, setFiles] = useState([] as FileWithPath[]);
  const [progress, setProgress] = useState(
    undefined as AssetSaveProgress | undefined
  );

  return (
    <AssetUploadStateContext.Provider
      value={{
        prefix: prefix,
        files: files,
        setFiles: setFiles,
        progress: progress,
        setProgress: setProgress,
      }}
    >
      {props.children}
    </AssetUploadStateContext.Provider>
  );
};

export const AssetUploadActionProvider = (props: {
  children: React.ReactNode;
}) => {
  return (
    <AssetUploadActionContext.Provider value={{}}>
      {props.children}
    </AssetUploadActionContext.Provider>
  );
};
