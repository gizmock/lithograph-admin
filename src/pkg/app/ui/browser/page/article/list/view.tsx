import { useDidMount } from "beautiful-react-hooks";
import { useContext } from "react";
import { UsecaseContext } from "../../../context";
import { ArticleListStateContext } from "./context";

export const ArticleListView = () => {
  const state = useContext(ArticleListStateContext);
  const query = useContext(UsecaseContext).article.query;

  useDidMount(async () => {
    const result = await query.findByTitle("");
    state.setArticles(result.datas);
  });

  return (
    <>
      <h1>記事一覧</h1>
      <ul>
        {state.articles.map((article) => {
          return <li key={article.id}>{article.title}</li>;
        })}
      </ul>
    </>
  );
};
