import { Intent, ProgressBar } from "@blueprintjs/core";
import { FileSaveProgress, StorageObject } from "../../../../../file-storage";

type Props = {
  progress?: FileSaveProgress;
};

export const AssetUploadProgress = (props: Props) => {
  const head = <h2>アップロード状況</h2>;
  const progress = props.progress;

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
