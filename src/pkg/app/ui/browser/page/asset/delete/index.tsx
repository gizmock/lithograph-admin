import {
  AssetDeleteActionProvider,
  AssetDeleteStateProvider,
} from "./provider";
import { AssetDeleteView } from "./view";

export const AssetDeletePage = () => {
  return (
    <AssetDeleteStateProvider>
      <AssetDeleteActionProvider>
        <AssetDeleteView />
      </AssetDeleteActionProvider>
    </AssetDeleteStateProvider>
  );
};
