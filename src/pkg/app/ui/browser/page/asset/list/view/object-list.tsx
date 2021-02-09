import { Button, ButtonGroup, Classes } from "@blueprintjs/core";
import { useDidMount, useWillUnmount } from "beautiful-react-hooks";
import { useContext, useState } from "react";
import { AssetListActionContext, AssetListStateContext } from "../context";

export const AssetList = () => {
  const state = useContext(AssetListStateContext);
  const action = useContext(AssetListActionContext);
  const [mounted, setMounted] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useDidMount(async () => {
    await action.load();
    if (mounted) {
      setInitialized(true);
    }
  });

  useWillUnmount(async () => {
    setMounted(false);
  });

  return (
    <ButtonGroup
      alignText="left"
      minimal
      vertical
      style={{
        width: "100%",
      }}
      className={initialized ? "" : Classes.SKELETON}
    >
      {state.objs.map((obj) => {
        return (
          <Button
            key={obj.path()}
            icon={obj.isDirectory() ? "folder-close" : "document"}
            onClick={() => action.openObject(obj)}
          >
            {obj.name()}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
