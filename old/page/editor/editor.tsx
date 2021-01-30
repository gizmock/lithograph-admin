import { useCallback, useContext, useEffect, useState } from "react";
import { message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ServicesContext } from "../../../context";
import { Page } from "../../../../models/page";
import { Content } from "./content";
import { useHistory, useParams } from "react-router";
import { RoutePath } from "../../../routes";
import { Link } from "react-router-dom";
import pretty from "pretty";
import { Panel } from "./panel";

type Params = {
  id?: string;
};

const MAX_BODY_LENGTH_BYTES = 400_000;

export const PageEditorController = () => {
  const history = useHistory();
  const params = useParams<Params>();
  const [initialized, updateInitialized] = useState(false);
  const [id, updateID] = useState(params.id);
  const [published, updatePublished] = useState(new Date());
  const [title, updateTitle] = useState("");
  const [body, updateBody] = useState("");
  const service = useContext(ServicesContext)!.page;
  const save = async () => {
    const bodyBytes = new Blob([body]).size;
    if (bodyBytes > MAX_BODY_LENGTH_BYTES) {
      message.warn("本文は400KB以下が制限です(現在" + bodyBytes + "Byte)");
      return;
    }
    try {
      const inputID = id ? id : Page.new().id;
      await service.Update({
        id: inputID,
        published: published,
        title: title,
        body: body,
      });
      updateID(inputID);
      history.push(RoutePath.PageEditor + "/" + inputID);
      message.success("ページを保存しました");
    } catch {
      message.error("ページの保存に失敗しました");
    }
  };
  const remove = async () => {
    if (!id) {
      message.warn("削除は保存した後にだけ可能です");
      return;
    }
    try {
      await service.Remove({ id: id });
      message.success("ページを削除しました");
    } catch {
      message.error("ページの削除に失敗しました");
    }
  };
  const load = useCallback(async () => {
    if (id) {
      const out = await service.Get({ id: id });
      if (out.page) {
        updateID(out.page.id);
        updatePublished(out.page.published);
        updateTitle(out.page.title);
        updateBody(out.page.body);
      } else {
        updateID(undefined);
        history.push(RoutePath.PageEditor);
      }
    }
    updateInitialized(true);
  }, [history, service, id]);
  useEffect(() => {
    load();
  }, [load]);
  const formatBody = () => {
    updateBody(pretty(body));
    message.success("コードを整形しました");
  };
  if (initialized) {
    return (
      <>
        <Link to={RoutePath.Page}>
          <ArrowLeftOutlined style={{ marginBottom: "16px" }} />
        </Link>
        <h1>ページ編集</h1>
        <div style={{ marginBottom: "16px" }}>ID: {id}</div>
        <div style={{ marginBottom: "16px" }}>
          <Panel id={id} save={save} formatBody={formatBody} remove={remove} />
        </div>
        <Content
          published={published}
          updatePublished={updatePublished}
          title={title}
          updateTitle={updateTitle}
          body={body}
          updateBody={updateBody}
        />
      </>
    );
  }
  return <>読み込み中</>;
};
