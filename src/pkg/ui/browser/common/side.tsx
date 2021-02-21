import { Button, ButtonGroup, Drawer } from "@blueprintjs/core";
import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { SiteContext, ThemeContext } from "../context";
import * as RoutePath from "../route-path";
import { ToggleDarkSwitch } from "./toggle-dark-switch";

export const SideBar = () => {
  const siteCtx = useContext(SiteContext);
  const themeCtx = useContext(ThemeContext);
  return (
    <>
      <div>{siteCtx.name} コンソール</div>
      <div>
        <ToggleDarkSwitch {...themeCtx} large />
      </div>
      <div>
        <SideMenu fill />
      </div>
    </>
  );
};

export function useSideDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return {
    button: <SideDrawerButton open={() => setDrawerOpen(true)} />,
    drawer: <SideDrawer open={drawerOpen} close={() => setDrawerOpen(false)} />,
  };
}

const SideDrawerButton = (props: { open: () => void }) => {
  return (
    <Button icon={"menu"} onClick={props.open}>
      メニュー
    </Button>
  );
};

const SideDrawer = (props: { open: boolean; close: () => void }) => {
  const themeCtx = useContext(ThemeContext);
  return (
    <Drawer
      className="console-drawer"
      onClose={props.close}
      isOpen={props.open}
      position="left"
      size="75%"
    >
      <ToggleDarkSwitch {...themeCtx} large />
      <SideMenu close={props.close} />
    </Drawer>
  );
};

const SideMenu = (props: { fill?: boolean; close?: () => void }) => {
  const history = useHistory();
  const location = useLocation();
  const linkTo = (to: string) => {
    history.push({
      pathname: to,
      state: location.state,
    });
    if (props.close) {
      props?.close();
    }
  };
  return (
    <ButtonGroup alignText="left" large minimal vertical fill={props.fill}>
      <Button
        icon="dashboard"
        onClick={() => linkTo(RoutePath.DashboardPath.getURI())}
      >
        ダッシュボード
      </Button>
      <Button
        icon="folder-open"
        onClick={() => linkTo(RoutePath.AssetListPath.getParentURI())}
      >
        ファイル
      </Button>
      <Button
        icon="font"
        onClick={() => linkTo(RoutePath.ArticleListPath.getURI())}
      >
        記事
      </Button>
      <Button
        icon="user"
        onClick={() => linkTo(RoutePath.AccountPath.getURI())}
      >
        アカウント
      </Button>
    </ButtonGroup>
  );
};
