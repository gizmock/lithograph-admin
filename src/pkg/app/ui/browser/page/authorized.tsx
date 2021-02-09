import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "../common/header";
import { SideBar, useSideDrawer } from "../common/side";
import * as RoutePath from "../route-path";
import { ConsoleTemplate } from "../template/with-sidebar";
import { AccountMain } from "./account";
import { AssetDeletePage } from "./asset/delete";
import { AssetFilePage } from "./asset/file";
import { AssetListPage } from "./asset/list";
import { AssetUploadPage } from "./asset/upload";
import { DashboardMain } from "./dashboard";
import { NotFoundMain } from "./not-found";

export const AuthorizedPage = () => {
  return (
    <BrowserRouter>
      <ConsoleTemplate
        header={<Header />}
        sideBar={<SideBar />}
        sideDrawer={useSideDrawer()}
      >
        <Switch>
          <Route
            exact
            path={RoutePath.IndexPath.getURI()}
            component={DashboardMain}
          />
          <Route
            path={RoutePath.DashboardPath.getURI()}
            component={DashboardMain}
          />
          <Route
            path={RoutePath.AssetListPath.getURIPattern()}
            component={AssetListPage}
          />
          <Route
            path={RoutePath.AssetUploadPath.getURIPattern()}
            component={AssetUploadPage}
          />
          <Route
            path={RoutePath.AssetFilePath.getURIPattern()}
            component={AssetFilePage}
          />
          <Route
            path={RoutePath.AssetDeletePath.getURIPattern()}
            component={AssetDeletePage}
          />
          <Route
            path={[RoutePath.AccountPath.getURI()]}
            component={AccountMain}
          />
          <Route component={NotFoundMain} />
        </Switch>
      </ConsoleTemplate>
    </BrowserRouter>
  );
};
