import { Button, ButtonGroup } from "@blueprintjs/core";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AssetDeletePath, AssetUploadPath } from "../../../route-path";
import { AssetListActionContext, AssetListStateContext } from "../context";
import { MakeDirectoryDialog } from "./make-directory-dialog";

export const AssetControlButton = () => {
  const [opendMakeDirectory, setOpendMakeDirectory] = useState(false);
  const history = useHistory();

  const state = useContext(AssetListStateContext);
  const action = useContext(AssetListActionContext);

  return (
    <>
      <ButtonGroup>
        <Button icon="folder-new" onClick={() => setOpendMakeDirectory(true)}>
          フォルダ作成
        </Button>
        <Button
          icon="cloud-upload"
          onClick={() => history.push(AssetUploadPath.makeURI(state.prefix))}
        >
          アップロード
        </Button>
        <Button
          icon="trash"
          onClick={() => history.push(AssetDeletePath.makeURI(state.prefix))}
        >
          削除
        </Button>
      </ButtonGroup>

      <MakeDirectoryDialog
        opend={opendMakeDirectory}
        close={() => setOpendMakeDirectory(false)}
        makeDirectory={action.makeDirectory}
      />
    </>
  );
};
