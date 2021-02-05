import { Button, Classes, Intent } from "@blueprintjs/core";
import { useDidMount } from "beautiful-react-hooks";
import prettyBytes from "pretty-bytes";
import { useContext } from "react";
import { StorageObject } from "../../../../../domain/model/file-storage";
import { GlobalToaster } from "../../common/toaster";
import { AssetFileActionContext, AssetFileStateContext } from "./context";

export const AssetFileView = () => {
  const state = useContext(AssetFileStateContext);
  const action = useContext(AssetFileActionContext);

  useDidMount(async () => {
    try {
      await action.read();
    } catch {
      GlobalToaster.show({
        intent: Intent.DANGER,
        message: "ファイルを読み込めませんでした",
      });
    }
  });

  return (
    <>
      <h1>ファイル</h1>
      <div>
        <Detail obj={state.obj} />
      </div>
      <div>
        <Button disabled={state.obj === undefined} onClick={action.download}>
          ダウンロード
        </Button>
      </div>
      <div>
        <Button onClick={action.backToList}>戻る</Button>
      </div>
    </>
  );
};

const Detail = (props: { obj?: StorageObject }) => {
  const obj = props.obj;
  const dateTime = (() => {
    if (obj?.meta?.lastModified) {
      const date = new Date(obj?.meta?.lastModified);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    } else {
      return "不明";
    }
  })();
  const size = (() => {
    if (obj?.meta?.size) {
      return prettyBytes(obj.meta.size);
    } else {
      return "不明";
    }
  })();
  return (
    <>
      <h2 className={obj ? "" : Classes.SKELETON}>
        {obj ? obj.name : "loading"}
      </h2>
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
      <h3>最終更新</h3>
      <div className={!obj ? Classes.SKELETON : ""}>{dateTime}</div>
      <h3>サイズ</h3>
      <div className={!obj ? Classes.SKELETON : ""}>{size}</div>
    </>
  );
};
