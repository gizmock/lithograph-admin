import { AssetFileActionProvider, AssetFileStateProvider } from "./provider";
import { AssetFileView } from "./view";

export const AssetFilePage = () => {
  return (
    <AssetFileStateProvider>
      <AssetFileActionProvider>
        <AssetFileView />
      </AssetFileActionProvider>
    </AssetFileStateProvider>
  );
};
