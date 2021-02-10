import {
  ArticleListActionProvider,
  ArticleListStateProvider,
} from "./provider";
import { ArticleListView } from "./view";

export const ArticleListPage = () => {
  return (
    <ArticleListStateProvider>
      <ArticleListActionProvider>
        <ArticleListView />
      </ArticleListActionProvider>
    </ArticleListStateProvider>
  );
};
