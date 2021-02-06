import { Card, Elevation } from "@blueprintjs/core";
import { useContext } from "react";
import Dropzone from "react-dropzone";
import { AssetUploadStateContext } from "../context";

export const AssetUploadSelector = () => {
  const state = useContext(AssetUploadStateContext);

  return (
    <>
      <h2>ファイル選択</h2>
      <Dropzone onDrop={state.setFiles}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <DropArea />
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    </>
  );
};

const DropArea = () => {
  return (
    <Card interactive elevation={Elevation.TWO}>
      <p style={{ textAlign: "center", lineHeight: "200%" }}>
        ここをクリック もしくは
        <br />
        ドラッグ・アンド・ドロップ
      </p>
    </Card>
  );
};
