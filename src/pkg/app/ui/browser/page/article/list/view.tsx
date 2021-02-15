import {
  Button,
  ButtonGroup,
  Card,
  ControlGroup,
  H1,
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
    const result = await query.findByTitle({ title: title });
    state.setArticles(result.datas);
  };

  useDidMount(async () => {
    findArticlesByTitle(title.current.value);
  });

  return (
    <>
      <H1>記事一覧</H1>

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
      <ButtonGroup
        alignText="left"
        minimal
        vertical
        style={{
          width: "100%",
        }}
      >
        {state.articles.map((article) => {
          const published = article.published;
          return (
            <Button
              key={article.id}
              onClick={() => history.push(ArticleEditPath.makeURI(article.id))}
              style={{ marginBottom: "12px" }}
            >
              <H5>{article.title}</H5>
              <div>
                {published.toLocaleDateString()}{" "}
                {published.toLocaleTimeString()}
              </div>
            </Button>
          );
        })}
      </ButtonGroup>
    </>
  );
};
