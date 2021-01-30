import { Button } from "@blueprintjs/core";
import { useHistory } from "react-router";
import { AssetListPath } from "../../../route-path";

type Props = {
  prefix: string;
};

export const AssetUploadTo = (props: Props) => {
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
        {props.prefix}
      </div>
      <div>
        <CancelButton prefix={props.prefix} />
      </div>
    </>
  );
};

const CancelButton = (props: Props) => {
  const history = useHistory();
  return (
    <Button
      onClick={() => history.push(AssetListPath.makeURI(props.prefix))}
      style={{ marginRight: "16px" }}
    >
      戻る
    </Button>
  );
};
