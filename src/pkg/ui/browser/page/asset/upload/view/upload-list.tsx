import { Button, Collapse, Pre } from "@blueprintjs/core";
import { useContext, useState } from "react";
import { AssetUploadStateContext } from "../context";

export const AssetUploadList = () => {
  const state = useContext(AssetUploadStateContext);
  const files = state.files;
  const [openedList, setOpenedList] = useState(false);

  return (
    <>
      <div>{files.length} 個選択</div>
      <Button
        disabled={files.length === 0}
        onClick={() => setOpenedList(!openedList)}
      >
        ファイル一覧 {openedList ? "非表示" : "表示"}
      </Button>
      <Collapse isOpen={openedList} keepChildrenMounted>
        <Pre>
          <ul>
            {files.map((file) => {
              return <li key={file.path}>{file.path}</li>;
            })}
          </ul>
        </Pre>
      </Collapse>
    </>
  );
};
