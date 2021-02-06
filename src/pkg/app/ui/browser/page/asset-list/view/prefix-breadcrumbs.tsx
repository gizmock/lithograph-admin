import { Breadcrumbs, IBreadcrumbProps } from "@blueprintjs/core";
import { useContext } from "react";
import { PATH_DELIMITER } from "../../../../../../domain/model/asset-object";
import { AssetListActionContext, AssetListStateContext } from "../context";

export const PrefixBreadcrumbs = () => {
  const state = useContext(AssetListStateContext);
  const action = useContext(AssetListActionContext);

  const split = state.prefix.split(PATH_DELIMITER);
  const makePositionPrefix = (index: number) => {
    return split.slice(0, index + 1).join(PATH_DELIMITER) + PATH_DELIMITER;
  };

  const items = split
    .filter((item) => item !== "")
    .map((item, index) => {
      return {
        text: item,
        disabled: index === 0,
        onClick: () => action.changePrefix(makePositionPrefix(index)),
      } as IBreadcrumbProps;
    });

  return <Breadcrumbs items={[...items]} />;
};
