import {
  AssetUploadActionProvider,
  AssetUploadStateProvider,
} from "./provider";
import { AssetUploadView } from "./view";

export const AssetUploadPage = () => {
  return (
    <AssetUploadStateProvider>
      <AssetUploadActionProvider>
        <AssetUploadView />
      </AssetUploadActionProvider>
    </AssetUploadStateProvider>
  );
};
