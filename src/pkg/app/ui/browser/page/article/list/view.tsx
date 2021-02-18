import {
  Button,
  ButtonGroup,
  ControlGroup,
  H1,
  H5,
  InputGroup,
  Intent,
} from "@blueprintjs/core";
import { useDidMount } from "beautiful-react-hooks";
import { useContext, useRef } from "react";
import { useHistory } from "react-router";
import { ArticleEditPath } from "../../../route-path";
import { ArticleListActionContext, ArticleListStateContext } from "./context";

export const ArticleListView = () => {
  const state = useContext(ArticleListStateContext);
  const action = useContext(ArticleListActionContext);
  const title = useRef({ value: "" } as HTMLInputElement);
  const history = useHistory();

  useDidMount(async () => {
    action.findFirst(title.current.value);
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
              action.findFirst(title.current.value);
            }
          }}
        />
        <Button
          icon="arrow-right"
          onClick={() => action.findFirst(title.current.value)}
        />
      </ControlGroup>

      <ButtonGroup>
        <Button
          icon="arrow-left"
          onClick={() => action.findAfter(title.current.value)}
        />
        <Button
          icon="arrow-right"
          onClick={() => action.findBefore(title.current.value)}
        />
      </ButtonGroup>

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
