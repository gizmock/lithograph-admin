import { H1 } from "@blueprintjs/core";
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
        <H1>ファイルアップロード</H1>
        不正なURLです
      </>
    );
  }

  return (
    <>
      <H1>ファイルアップロード</H1>
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
