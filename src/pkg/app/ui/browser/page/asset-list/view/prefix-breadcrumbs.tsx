import { Breadcrumbs, IBreadcrumbProps } from "@blueprintjs/core";
import { useContext } from "react";
import { StorageObject } from "../../../../../../domain/model/file-storage";
import { AssetListActionContext, AssetListStateContext } from "../context";

export const PrefixBreadcrumbs = () => {
  const state = useContext(AssetListStateContext);
  const action = useContext(AssetListActionContext);

  const delimiter = StorageObject.delimiter;
  const split = state.prefix.split(delimiter);
  const makePositionPrefix = (index: number) => {
    return split.slice(0, index + 1).join(delimiter) + delimiter;
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
