import { useState } from "react";
import { StorageObject } from "../../../../../domain/model/file-storage";
import { AssetDeleteStateContext } from "./context";

type Props = {
  prefix: string;
  children: React.ReactNode;
};

export const AssetDeleteStateProvider = (props: Props) => {
  const [objs, setObjs] = useState([] as StorageObject[]);
  const [checkedObjs, setCheckedObjs] = useState([] as StorageObject[]);
  return (
    <AssetDeleteStateContext.Provider
      value={{
        prefix: props.prefix,
        objs: objs,
        setObjs: setObjs,
        checkedObjs: checkedObjs,
        setCheckedObjs: setCheckedObjs,
      }}
    >
      {props.children}
    </AssetDeleteStateContext.Provider>
  );
};
