import {
  Button,
  ButtonGroup,
  Checkbox,
  Icon,
  Intent,
  ProgressBar,
} from "@blueprintjs/core";
import { useDidMount } from "beautiful-react-hooks";
import { useContext, useState } from "react";
import { StorageObject } from "../../../../file-storage";
import { BreakWordDiv } from "../../common/break-word-div";
import { GlobalToaster } from "../../common/toaster";
import { AssetDeleteActionContext, AssetDeleteStateContext } from "./context";

type RemoveProgress = {
  name: string;
  complete?: boolean;
  error?: boolean;
};

export const AssetDeleteView = () => {
  const state = useContext(AssetDeleteStateContext);
  const action = useContext(AssetDeleteActionContext);
  const [progress, setProgress] = useState({} as RemoveProgress);

  useDidMount(async () => {
    try {
      await action.refresh();
    } catch {
      GlobalToaster.show({
        intent: Intent.DANGER,
        message: "ファイルを読み込めませんでした",
      });
    }
  });

  const remove = async () => {
    for (const obj of state.checkedObjs) {
      setProgress({ name: obj.name, complete: false });
      try {
        await action.remove(obj);
        setProgress({ name: obj.name, complete: true });
      } catch {
        setProgress({ name: obj.name, error: true });
        return;
      }
    }
    GlobalToaster.show({
      intent: Intent.SUCCESS,
      message: "全ての削除が完了しました",
    });
    await action.refresh();
  };

  return (
    <>
      <h1>ファイル削除</h1>
      <h2>削除元</h2>
      <BreakWordDiv>{state.prefix}</BreakWordDiv>
      <Button onClick={action.backToList}>戻る</Button>
      <h2>削除</h2>
      <Button
        disabled={state.checkedObjs.length === 0}
        intent={Intent.DANGER}
        onClick={remove}
      >
        削除
      </Button>
      <div>
        <h3>{progress.name}</h3>
        <ProgressBar
          intent={
            progress.error
              ? Intent.DANGER
              : progress.complete
                ? Intent.SUCCESS
                : Intent.PRIMARY
          }
          animate={false}
          stripes={false}
          value={progress.complete ? 1 : 0}
        />
      </div>
      <h2>選択</h2>
      <div>
        <ButtonGroup>
          <Button onClick={() => state.setCheckedObjs(state.objs.concat())}>
            全てチェック
          </Button>
          <Button onClick={() => state.setCheckedObjs([])}>全て外す</Button>
        </ButtonGroup>
      </div>
      <AssetDeleteFileList />
    </>
  );
};

const AssetDeleteFileList = () => {
  const state = useContext(AssetDeleteStateContext);
  const [disabled, setDisabled] = useState(false);

  const addCheck = (obj: StorageObject) => {
    setDisabled(true);
    state.setCheckedObjs(state.checkedObjs.concat(obj));
    setDisabled(false);
  };

  const removeCheck = (obj: StorageObject) => {
    setDisabled(true);
    state.setCheckedObjs(state.checkedObjs.filter((o) => o.path !== obj.path));
    setDisabled(false);
  };

  const checkedPaths = state.checkedObjs.map((o) => o.path);

  return (
    <>
      {state.objs.map((obj) => {
        return (
          <Checkbox
            key={obj.path}
            disabled={disabled}
            checked={checkedPaths.includes(obj.path)}
            onChange={(e) => {
              if (e.currentTarget.checked) {
                addCheck(obj);
              } else {
                removeCheck(obj);
              }
            }}
          >
            <Icon
              style={{ marginRight: "12px" }}
              icon={obj.directory ? "folder-close" : "document"}
            />
            {obj.name}
          </Checkbox>
        );
      })}
    </>
  );
};
