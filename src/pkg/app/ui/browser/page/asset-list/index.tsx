import { AssetListActionProvider, AssetListStateProvider } from "./provider";
import { AssetListView } from "./view";

export const AssetListPage = () => {
  return (
    <AssetListStateProvider>
      <AssetListActionProvider>
        <AssetListView />
      </AssetListActionProvider>
    </AssetListStateProvider>
  );
};
