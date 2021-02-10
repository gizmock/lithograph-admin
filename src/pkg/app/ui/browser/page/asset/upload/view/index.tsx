import { useContext } from "react";
import { AssetUploadStateContext } from "../context";
import { AssetUploadButton } from "./uplaod-button";
import { AssetUploadList } from "./upload-list";
import { AssetUploadProgress } from "./upload-progress";
import { AssetUploadSelector } from "./upload-selector";
import { AssetUploadTo } from "./upload-to";

export const AssetUploadView = () => {
  const state = useContext(AssetUploadStateContext);

  if (!state.prefix) {
    return (
      <>
        <h1>ファイルアップロード</h1>
        不正なURLです
      </>
    );
  }

  return (
    <>
      <h1>ファイルアップロード</h1>
      <AssetUploadTo />
      <AssetUploadSelector />
      <AssetUploadList />
      <div>
        <AssetUploadButton />
      </div>
      <AssetUploadProgress />
    </>
  );
};
