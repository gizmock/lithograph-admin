import { Breadcrumbs, IBreadcrumbProps } from "@blueprintjs/core";

type Props = {
  prefix: string;
  delimiter: string;
  onClick: (path: string) => void;
};

export const PrefixBreadcrumbs = (props: Props) => {
  const delimiter = props.delimiter;
  const split = props.prefix.split(delimiter);

  const makePositionPrefix = (index: number) => {
    return split.slice(0, index + 1).join(delimiter) + delimiter;
  };

  const onClick = (index: number) => {
    return index === 0
      ? undefined
      : () => props.onClick(makePositionPrefix(index));
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
