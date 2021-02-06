import { Intent, ProgressBar } from "@blueprintjs/core";
import { useContext } from "react";
import { StorageObject } from "../../../../../../domain/model/file-storage";
import { AssetUploadStateContext } from "../context";

export const AssetUploadProgress = () => {
  const head = <h2>アップロード状況</h2>;
  const progress = useContext(AssetUploadStateContext).progress;

  if (!progress) {
    return <>{head}</>;
  }

  const total = progress.total;
  const loaded = progress.loaded;
  const complete = loaded === total;

  return (
    <>
      {head}
      <div
        style={{
          overflowWrap: "break-word",
          wordWrap: "break-word",
          wordBreak: "break-all",
        }}
      >
        {progress.path
          .split(StorageObject.delimiter)
          .join(" " + StorageObject.delimiter + " ")}
      </div>
      <ProgressBar
        intent={complete ? Intent.SUCCESS : Intent.PRIMARY}
        animate={!complete}
        stripes={!complete}
        value={loaded / total}
      />
    </>
  );
};
