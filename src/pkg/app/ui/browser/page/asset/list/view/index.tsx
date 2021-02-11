import { H1 } from "@blueprintjs/core";
import { AssetControlButton } from "./control-button";
import { AssetList } from "./object-list";
import { PrefixBreadcrumbs } from "./prefix-breadcrumbs";

export const AssetListView = () => {
  return (
    <>
      <H1>ファイル一覧</H1>
      <div>
        <AssetControlButton />
      </div>
      <PrefixBreadcrumbs />
      <AssetList />
    </>
  );
};
