import { Button, ButtonGroup } from "@blueprintjs/core";
import { useState } from "react";
import { useHistory } from "react-router";
import { AssetDeletePath, AssetUploadPath } from "../../../route-path";
import { MakeDirectoryDialog } from "./make-directory-dialog";

type Props = {
  prefix: string;
  makeDirectory: (name: string) => Promise<void>;
};

export const AssetControlButton = (props: Props) => {
  const [opendMakeDirectory, setOpendMakeDirectory] = useState(false);
  const history = useHistory();

  return (
    <>
      <ButtonGroup>
        <Button icon="folder-new" onClick={() => setOpendMakeDirectory(true)}>
          フォルダ作成
        </Button>
        <Button
          icon="cloud-upload"
          onClick={() => history.push(AssetUploadPath.makeURI(props.prefix))}
        >
          アップロード
        </Button>
        <Button
          icon="trash"
          onClick={() => history.push(AssetDeletePath.makeURI(props.prefix))}
        >
          削除
        </Button>
      </ButtonGroup>

      <MakeDirectoryDialog
        opend={opendMakeDirectory}
        close={() => setOpendMakeDirectory(false)}
        makeDirectory={props.makeDirectory}
      />
    </>
  );
};
