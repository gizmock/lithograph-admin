import {
  Button,
  ButtonGroup,
  ControlGroup,
  H1,
  H5,
  InputGroup,
  Intent,
  Tab,
  Tabs,
} from "@blueprintjs/core";
import { useDidMount } from "beautiful-react-hooks";
import { useContext, useRef } from "react";
import { useHistory } from "react-router";
import { ArticleEditPath } from "../../../route-path";
import { ArticleListActionContext, ArticleListStateContext } from "./context";

export const ArticleListView = () => {
  const action = useContext(ArticleListActionContext);
  const history = useHistory();

  useDidMount(async () => {
    action.findFirst();
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

      <Tabs animate id="TabsExample">
        <Tab
          id="published-date"
          title="公開日で検索"
          panel={<SearchPanelPublishedDate />}
        />
        <Tab id="title" title="タイトルで検索" panel={<SearchPanelTitle />} />
      </Tabs>

      <ListArea />
    </>
  );
};

const SearchPanelPublishedDate = () => {
  const action = useContext(ArticleListActionContext);

  return (
    <>
      <ButtonGroup>
        <Button
          icon="arrow-left"
          onClick={() => action.findByPublishedDateAfter()}
        />
        <Button
          icon="arrow-right"
          onClick={() => action.findByPublishedDateBefore()}
        />
      </ButtonGroup>
    </>
  );
};

const SearchPanelTitle = () => {
  const action = useContext(ArticleListActionContext);
  const title = useRef({ value: "" } as HTMLInputElement);

  return (
    <>
      <ControlGroup style={{ marginBottom: "16px" }}>
        <InputGroup
          placeholder="タイトルで探す"
          inputRef={title}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              action.findFirst();
            }
          }}
        />
        <Button icon="arrow-right" onClick={() => action.findFirst()} />
      </ControlGroup>

      <ButtonGroup>
        <Button
          icon="arrow-left"
          onClick={() => action.findByPublishedDateAfter()}
        />
        <Button
          icon="arrow-right"
          onClick={() => action.findByPublishedDateBefore()}
        />
      </ButtonGroup>
    </>
  );
};

const ListArea = () => {
  const state = useContext(ArticleListStateContext);
  const history = useHistory();

  return (
    <>
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

      {state.articles.length === 0 ? (
        <>これ以上の検索結果はありませんでした</>
      ) : (
        <></>
      )}
    </>
  );
};
