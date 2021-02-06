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

  const onClick = (index: number) => {
    return index === 0
      ? undefined
      : () => action.changePrefix(makePositionPrefix(index));
  };

  const items = split
    .filter((item) => item !== "")
    .map((item, index) => {
      return {
        text: item,
        onClick: onClick(index),
      } as IBreadcrumbProps;
    });

  return <Breadcrumbs items={[...items]} />;
};
