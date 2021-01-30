import { Card, Elevation } from "@blueprintjs/core";
import Dropzone, { FileWithPath } from "react-dropzone";

type Props = {
  setFiles: (files: FileWithPath[]) => void;
};

export const AssetUploadSelector = (props: Props) => {
  return (
    <>
      <h2>ファイル選択</h2>
      <Dropzone onDrop={props.setFiles}>
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
