import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UsecaseContext } from "../../../context";
import { ArticleEditPath } from "../../../route-path";
import { ArticleEditActionContext, ArticleEditStateContext } from "./context";

export const ArticleEditStateProvider = (props: {
  id?: string;
  children: React.ReactNode;
}) => {
  const [blocking, setBlocking] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(new Date());

  return (
    <ArticleEditStateContext.Provider
      value={{
        id: props.id,
        blocking: blocking,
        setBlocking: setBlocking,
        title: title,
        setTitle: setTitle,
        body: body,
        setBody: setBody,
        published: published,
        setPublished: setPublished,
      }}
    >
      {props.children}
    </ArticleEditStateContext.Provider>
  );
};

export const ArticleEditActionProvider = (props: {
  provideNewID: () => string;
  setID: (id: string) => void;
  children: React.ReactNode;
}) => {
  const state = useContext(ArticleEditStateContext);
  const usecase = useContext(UsecaseContext).article;
  const history = useHistory();

  const initializeArticle = async () => {
    state.setBlocking(true);
    if (state.id) {
      const data = await usecase.query.getArticle(state.id);
      if (data) {
        state.setTitle(data.title);
        state.setBody(data.body);
        state.setPublished(data.published);
      }
    }
    state.setBlocking(false);
  };

  const saveArticle = async () => {
    state.setBlocking(true);
    try {
      const id = state.id ? state.id : props.provideNewID();
      await usecase.command.saveArticle({
        id: id,
        title: state.title,
        body: state.body,
        published: state.published,
      });
      props.setID(id);
      history.push(ArticleEditPath.makeURI(id));
    } finally {
      state.setBlocking(false);
    }
  };

  const removeArticle = async () => {
    state.setBlocking(true);
    try {
      await usecase.command.removeArticle({ id: state.id! });
    } finally {
      state.setBlocking(false);
    }
  };

  return (
    <ArticleEditActionContext.Provider
      value={{
        initializeArticle: initializeArticle,
        saveArticle: saveArticle,
        removeArticle: removeArticle,
      }}
    >
      {props.children}
    </ArticleEditActionContext.Provider>
  );
};
