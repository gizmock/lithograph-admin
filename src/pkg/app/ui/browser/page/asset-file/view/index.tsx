import { StorageObject } from "../../../../../file-storage";
import { BackToAssetListButton } from "./back-to-list";
import { AssetDownloadButton } from "./download-button";
import { AssetFileDetail } from "./file-detail";

type Props = {
  path: string;
  delimiter: string;
  obj?: StorageObject;
};

export const AssetFileView = (props: Props) => {
  return (
    <>
      <h1>ファイル</h1>
      <div>
        <AssetFileDetail obj={props.obj} />
      </div>
      <div>
        <AssetDownloadButton obj={props.obj} />
      </div>
      <div>
        <BackToAssetListButton path={props.path} delimiter={props.delimiter} />
      </div>
    </>
  );
};
