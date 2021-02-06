import { Button } from "@blueprintjs/core";
import { useContext } from "react";
import { useHistory } from "react-router";
import { AssetListPath } from "../../../route-path";
import { AssetUploadStateContext } from "../context";

export const AssetUploadTo = () => {
  const state = useContext(AssetUploadStateContext);
  const history = useHistory();

  return (
    <>
      <h2>アップロード先</h2>
      <div
        style={{
          overflowWrap: "break-word",
          wordWrap: "break-word",
          wordBreak: "break-all",
        }}
      >
        {state.prefix}
      </div>
      <div>
        <Button
          onClick={() => history.push(AssetListPath.makeURI(state.prefix!))}
          style={{ marginRight: "16px" }}
        >
          戻る
        </Button>
      </div>
    </>
  );
};
