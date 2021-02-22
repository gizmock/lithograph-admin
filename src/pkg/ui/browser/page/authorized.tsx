import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "../common/header";
import { SideBar, useSideDrawer } from "../common/side";
import * as RoutePath from "../route-path";
import { ConsoleTemplate } from "../template/with-sidebar";
import { AccountMain } from "./account";
import { ArticleEditPage } from "./article/edit";
import { ArticleListPage } from "./article/list";
import { AssetDeletePage } from "./asset/delete";
import { AssetFilePage } from "./asset/file";
import { AssetListPage } from "./asset/list";
import { AssetUploadPage } from "./asset/upload";
import { CategoryEditPage, CategoryListPage } from "./category";
import { DashboardMain } from "./dashboard";
import { NotFoundMain } from "./not-found";
import { TemplateEditPage } from "./template";
import { TemplateListPage } from "./template/list-page";

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
            path={RoutePath.TemplateListPath.getURI()}
            component={TemplateListPage}
          />
          <Route
            path={RoutePath.TemplateEditPath.getURIPattern()}
            component={TemplateEditPage}
          />
          <Route
            path={RoutePath.CategoryListPath.getURI()}
            component={CategoryListPage}
          />
          <Route
            path={RoutePath.CategoryEditPath.getURIPattern()}
            component={CategoryEditPage}
          />
          <Route
            path={RoutePath.ArticleListPath.getURI()}
            component={ArticleListPage}
          />
          <Route
            path={RoutePath.ArticleEditPath.getURIPattern()}
            component={ArticleEditPage}
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
