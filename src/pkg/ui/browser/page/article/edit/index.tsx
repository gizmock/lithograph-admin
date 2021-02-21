import { useState } from "react";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { ArticleEditPathParam } from "../../../route-path";
import {
  ArticleEditActionProvider,
  ArticleEditStateProvider,
} from "./provider";
import { ArticleEditView } from "./view";

export const ArticleEditPage = () => {
  const params = useParams<ArticleEditPathParam>();
  const [id, setID] = useState(params.id);
  const newID = () => {
    return "article-" + uuidv4();
  };

  return (
    <ArticleEditStateProvider id={id}>
      <ArticleEditActionProvider setID={setID} provideNewID={newID}>
        <ArticleEditView />
      </ArticleEditActionProvider>
    </ArticleEditStateProvider>
  );
};
