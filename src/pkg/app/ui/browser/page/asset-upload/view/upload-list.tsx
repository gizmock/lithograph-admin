import { Button, Collapse, Pre } from "@blueprintjs/core";
import { useState } from "react";
import { FileWithPath } from "react-dropzone";

type Props = {
  files: FileWithPath[];
};

export const AssetUploadList = (props: Props) => {
  const [openedList, setOpenedList] = useState(false);
  const files = props.files;
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
