import { Classes } from "@blueprintjs/core";
import prettyBytes from "pretty-bytes";
import { StorageObject } from "../../../../../../domain/model/file-storage";

type Props = {
  obj?: StorageObject;
};

export const AssetFileDetail = (props: Props) => {
  return (
    <>
      <Name {...props} />
      <Path {...props} />
      <LastModified {...props} />
      <Size {...props} />
    </>
  );
};

const Name = ({ obj }: Props) => {
  return (
    <h2 className={obj ? "" : Classes.SKELETON}>
      {obj ? obj.name : "loading"}
    </h2>
  );
};

const Path = ({ obj }: Props) => {
  return (
    <>
      <h3>パス</h3>
      <div
        className={obj ? "" : Classes.SKELETON}
        style={{
          overflowWrap: "break-word",
          wordWrap: "break-word",
          wordBreak: "break-all",
        }}
      >
        {obj ? obj.path : "loading"}
      </div>
    </>
  );
};

const LastModified = ({ obj }: Props) => {
  const head = <h3>最終更新</h3>;
  if (!obj) {
    return (
      <>
        {head}
        <div className={Classes.SKELETON}>loading</div>
      </>
    );
  } else if (obj.meta?.lastModified) {
    const date = new Date(obj?.meta?.lastModified);
    const dateTime =
      date.toLocaleDateString() + " " + date.toLocaleTimeString();
    return (
      <>
        {head}
        {dateTime}
      </>
    );
  } else {
    return (
      <>
        {head}
        不明
      </>
    );
  }
};

const Size = ({ obj }: Props) => {
  const head = <h3>サイズ</h3>;
  if (!obj) {
    return (
      <>
        {head}
        <div className={Classes.SKELETON}>loading</div>
      </>
    );
  } else if (obj.meta?.size) {
    return (
      <>
        {head}
        {prettyBytes(obj.meta.size)}
      </>
    );
  } else {
    return (
      <>
        {head}
        不明
      </>
    );
  }
};
