import { Button } from "@blueprintjs/core";
import { useHistory } from "react-router";
import { AssetListPath } from "../../../route-path";

type Props = {
  path: string;
  delimiter: string;
};

export const BackToAssetListButton = (props: Props) => {
  const delimiter = props.delimiter;
  const names = props.path.split(delimiter);
  const parent =
    names.filter((_, index) => index < names.length - 1).join(delimiter) +
    delimiter;

  const history = useHistory();
  const onClick = () => {
    history.push(AssetListPath.makeURI(parent));
  };

  return <Button onClick={onClick}>戻る</Button>;
};
