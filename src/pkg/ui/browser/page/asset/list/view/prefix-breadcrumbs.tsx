import { Breadcrumbs, IBreadcrumbProps } from "@blueprintjs/core";
import { useContext } from "react";
import { AssetPrefix } from "../../../../../../domain/asset";
import { AssetListActionContext, AssetListStateContext } from "../context";

export const PrefixBreadcrumbs = () => {
  const state = useContext(AssetListStateContext);
  const action = useContext(AssetListActionContext);

  const prefix = new AssetPrefix(state.prefix);
  const items = prefix.names().map((name, index) => {
    return {
      text: name,
      disabled: index === 0,
      onClick: () => action.changePrefix(prefix.getPositionPrefix(index)),
    } as IBreadcrumbProps;
  });

  return <Breadcrumbs items={[...items]} />;
};
