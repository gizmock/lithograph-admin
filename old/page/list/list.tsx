import { useCallback, useContext, useEffect, useState } from "react";
import { message } from "antd";
import { ServicesContext } from "../../../context";
import { Page } from "../../../../models/page";
import { Collection } from "./collection";
import { Panel } from "./panel";

export const PageListController = () => {
  const [initialized, updateInitialized] = useState(false);
  const [fetchedAll, updateFetchedAll] = useState(false);
  const [startID, updateStartID] = useState(undefined as undefined | string);
  const [pages, updatePages] = useState([] as Page[]);
  const service = useContext(ServicesContext)!.page;
  const load = useCallback(
    async (startID?: string) => {
      try {
        const out = await service.Find({ startID: startID });
        const next = [] as Page[];
        const add = out.pages.map((page) =>
          Page.of(page.id, {
            published: page.published,
            title: page.title,
            body: page.body,
          })
        );
        if (!out.lastID) {
          updateFetchedAll(true);
        }
        updateStartID(out.lastID);
        next.push(...pages);
        next.push(...add);
        updatePages(next);
        if (!initialized) {
          updateInitialized(true);
        }
      } catch {
        message.error("ページ一覧の読み込みに失敗しました");
      }
    },
    [initialized, service, pages]
  );
  const reload = () => {
    updateInitialized(false);
    updatePages([]);
    updateStartID(undefined);
    updateFetchedAll(false);
  };
  useEffect(() => {
    if (!fetchedAll) {
      load(startID);
    }
  }, [load, startID, fetchedAll]);
  if (initialized) {
    return (
      <>
        <h1>ページ一覧</h1>
        <div style={{ marginBottom: "16px" }}>
          <Panel reloadPages={reload} />
        </div>
        <Collection pages={pages} />
      </>
    );
  }
  return <>読み込み中</>;
};
