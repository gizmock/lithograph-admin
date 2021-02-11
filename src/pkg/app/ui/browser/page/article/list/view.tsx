import { Button, Card, ControlGroup, H5, InputGroup } from "@blueprintjs/core";
import { useDidMount } from "beautiful-react-hooks";
import { useContext, useRef } from "react";
import { UsecaseContext } from "../../../context";
import { ArticleEditPath } from "../../../route-path";
import { ArticleListStateContext } from "./context";

export const ArticleListView = () => {
  const state = useContext(ArticleListStateContext);
  const query = useContext(UsecaseContext).article.query;
  const title = useRef({ value: "" } as HTMLInputElement);

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
        const openTime = article.openTime;
        return (
          <Card key={article.id}>
            <H5>
              <a href={ArticleEditPath.makeURI(article.id)}>{article.title}</a>
            </H5>
            <div>
              {openTime.toLocaleDateString()} {openTime.toLocaleTimeString()}
            </div>
          </Card>
        );
      })}
    </>
  );
};
