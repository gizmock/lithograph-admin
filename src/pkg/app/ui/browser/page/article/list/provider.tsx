import { useContext, useState } from "react";
import { ArticleSearchData } from "../../../../../../query/data/article";
import { UsecaseContext } from "../../../context";
import { ArticleListActionContext, ArticleListStateContext } from "./context";

export const ArticleListStateProvider = (props: {
  children: React.ReactNode;
}) => {
  const [articles, setArticles] = useState([] as ArticleSearchData[]);
  const [hasPreview, setHasPreview] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  return (
    <ArticleListStateContext.Provider
      value={{
        articles: articles,
        setArticles: setArticles,
        hasPreview: hasPreview,
        setHasPreview: setHasPreview,
        hasNext: hasNext,
        setHasNext: setHasNext,
      }}
    >
      {props.children}
    </ArticleListStateContext.Provider>
  );
};

export const ArticleListActionProvider = (props: {
  children: React.ReactNode;
}) => {
  const state = useContext(ArticleListStateContext);
  const query = useContext(UsecaseContext).article.query;

  const [previewSearchKey, setPreviewSearchKey] = useState(
    undefined as string | undefined
  );
  const [nextSearchKey, setNextSearchKey] = useState(
    undefined as string | undefined
  );

  const findFirst = async () => {
    const result = await query.findByTitle({
      title: "",
    });
    setNextSearchKey(result.lastEvaluatedKey);
    state.setArticles(result.datas);
    state.setHasNext(result.lastEvaluatedKey !== undefined);
  };

  const findBefore = async (title: string) => {
    const result = await query.findByTitle({
      title: title,
      paging: {
        boundaryKey: previewSearchKey,
        direction: "before",
      },
    });
    if (result.datas.length > 0) {
      state.setHasPreview(result.leadEvaluatedKey !== undefined);
      setPreviewSearchKey(result.leadEvaluatedKey);
      setNextSearchKey(result.lastEvaluatedKey);
      state.setArticles(result.datas);
      state.setHasNext(result.lastEvaluatedKey !== undefined);
    } else {
      state.setHasPreview(false);
    }
  };

  const findAfter = async (title: string) => {
    const result = await query.findByTitle({
      title: title,
      paging: {
        boundaryKey: nextSearchKey,
        direction: "after",
      },
    });
    if (result.datas.length > 0) {
      state.setHasPreview(result.leadEvaluatedKey !== undefined);
      setPreviewSearchKey(result.leadEvaluatedKey);
      setNextSearchKey(result.lastEvaluatedKey);
      state.setArticles(result.datas);
      state.setHasNext(result.lastEvaluatedKey !== undefined);
    } else {
      state.setHasNext(false);
    }
  };

  return (
    <ArticleListActionContext.Provider
      value={{
        findFirst: findFirst,
        findBefore: findBefore,
        findAfter: findAfter,
      }}
    >
      {props.children}
    </ArticleListActionContext.Provider>
  );
};
