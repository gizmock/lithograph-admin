import { useContext } from "react";
import { useParams } from "react-router";
import { InfraContext } from "../../context";
import { AssetDeletePathParam } from "../../route-path";
import {
  AssetDeleteActionProvider,
  AssetDeleteStateProvider,
} from "./provider";
import { AssetDeleteView } from "./view";

export const AssetDeletePage = () => {
  const storage = useContext(InfraContext).fileStorage;
  const params = useParams<AssetDeletePathParam>();
  const prefix = decodeURIComponent(params.prefix);

  return (
    <AssetDeleteStateProvider prefix={prefix}>
      <AssetDeleteActionProvider storage={storage}>
        <AssetDeleteView />
      </AssetDeleteActionProvider>
    </AssetDeleteStateProvider>
  );
};
