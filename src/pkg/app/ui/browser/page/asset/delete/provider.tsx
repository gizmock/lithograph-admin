import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router";
import { AssetObject } from "../../../../../../domain/model/asset";
import { InfraContext } from "../../../context";
import { AssetDeletePathParam, AssetListPath } from "../../../route-path";
import { AssetDeleteActionContext, AssetDeleteStateContext } from "./context";

export const AssetDeleteStateProvider = (props: {
  children: React.ReactNode;
}) => {
  const params = useParams<AssetDeletePathParam>();
  const prefix = decodeURIComponent(params.prefix);

  const [objs, setObjs] = useState([] as AssetObject[]);
  const [checkedObjs, setCheckedObjs] = useState([] as AssetObject[]);
  return (
    <AssetDeleteStateContext.Provider
      value={{
        prefix: prefix,
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

export const AssetDeleteActionProvider = (props: {
  children: React.ReactNode;
}) => {
  const storage = useContext(InfraContext).fileStorage;
  const state = useContext(AssetDeleteStateContext);

  const refresh = async () => {
    const objs = await storage.list(state.prefix);
    state.setObjs(objs);
    state.setCheckedObjs([]);
  };

  const history = useHistory();
  const backToList = () => {
    history.push(AssetListPath.makeURI(state.prefix));
  };

  return (
    <AssetDeleteActionContext.Provider
      value={{
        refresh: refresh,
        backToList: backToList,
      }}
    >
      {props.children}
    </AssetDeleteActionContext.Provider>
  );
};
