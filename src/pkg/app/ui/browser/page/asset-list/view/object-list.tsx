import { Button, ButtonGroup, Classes } from "@blueprintjs/core";
import { StorageObject } from "../../../../../file-storage";

type Props = {
  initialized: boolean;
  objs: StorageObject[];
  onObjectClick: (obj?: StorageObject) => void;
};

export const AssetList = (props: Props) => {
  return (
    <ButtonGroup
      alignText="left"
      minimal
      vertical
      style={{
        width: "100%",
      }}
      className={props.initialized ? "" : Classes.SKELETON}
    >
      {props.objs.map((obj) => {
        return (
          <Button
            key={obj.path}
            icon={obj.directory ? "folder-close" : "document"}
            onClick={() => props.onObjectClick(obj)}
          >
            {obj.name}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
