import { useContext } from "react";
import { useParams } from "react-router";
import { InfraContext } from "../../context";
import { AssetFilePathParam } from "../../route-path";
import { AssetFileActionProvider, AssetFileStateProvider } from "./provider";
import { AssetFileView } from "./view";

export const AssetFilePage = () => {
  const storage = useContext(InfraContext).fileStorage;
  const params = useParams<AssetFilePathParam>();
  const path = decodeURIComponent(params.path);

  return (
    <AssetFileStateProvider path={path}>
      <AssetFileActionProvider storage={storage}>
        <AssetFileView />
      </AssetFileActionProvider>
    </AssetFileStateProvider>
  );
};
