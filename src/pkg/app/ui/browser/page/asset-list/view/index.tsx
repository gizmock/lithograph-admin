import { AssetControlButton } from "./control-button";
import { AssetList } from "./object-list";
import { PrefixBreadcrumbs } from "./prefix-breadcrumbs";

export const AssetListView = () => {
  return (
    <>
      <h1>ファイル一覧</h1>
      <div>
        <AssetControlButton />
      </div>
      <PrefixBreadcrumbs />
      <AssetList />
    </>
  );
};
