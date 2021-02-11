import {
  Button,
  Card,
  ControlGroup,
  H5,
  InputGroup,
  Intent,
} from "@blueprintjs/core";
import { useDidMount } from "beautiful-react-hooks";
import { useContext, useRef } from "react";
import { useHistory } from "react-router";
import { UsecaseContext } from "../../../context";
import { ArticleEditPath } from "../../../route-path";
import { ArticleListStateContext } from "./context";

export const ArticleListView = () => {
  const state = useContext(ArticleListStateContext);
  const query = useContext(UsecaseContext).article.query;
  const title = useRef({ value: "" } as HTMLInputElement);
  const history = useHistory();

  const findArticlesByTitle = async (title: string) => {
    const result = await query.findByTitle(title);
    state.setArticles(result.datas);
  };

  useDidMount(async () => {
    findArticlesByTitle(title.current.value);
  });

  return (
    <>
      <h1>記事一覧</h1>

      <Button
        intent={Intent.PRIMARY}
        onClick={() => history.push(ArticleEditPath.getParentURI())}
      >
        作成
      </Button>

      <ControlGroup>
        <InputGroup
          placeholder="タイトルで探す"
          inputRef={title}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              findArticlesByTitle(title.current.value);
            }
          }}
        />
        <Button
          icon="arrow-right"
          onClick={() => findArticlesByTitle(title.current.value)}
        />
      </ControlGroup>

      {state.articles.map((article) => {
        const published = article.published;
        return (
          <Card key={article.id}>
            <H5>
              <a href={ArticleEditPath.makeURI(article.id)}>{article.title}</a>
            </H5>
            <div>
              {published.toLocaleDateString()} {published.toLocaleTimeString()}
            </div>
          </Card>
        );
      })}
    </>
  );
};
