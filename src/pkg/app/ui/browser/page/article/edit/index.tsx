import {
  ArticleEditStateProvider,
  ArticleEditActionProvider,
} from "./provider";
import { ArticleEditView } from "./view";

export const ArticleEditPage = () => {
  return (
    <ArticleEditStateProvider>
      <ArticleEditActionProvider>
        <ArticleEditView />
      </ArticleEditActionProvider>
    </ArticleEditStateProvider>
  );
};
