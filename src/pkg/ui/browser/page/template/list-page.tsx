import { useDidMount } from "beautiful-react-hooks";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { TemplateSearchData } from "../../../../app/query/template";
import { UsecaseContext } from "../../context";
import { TemplateEditPath } from "../../route-path";
import { TemplateListView } from "./list-view";

const LIMIT = 10;

export const TemplateListPage = () => {
  const query = useContext(UsecaseContext).template.query;
  const [templates, setTemplates] = useState([] as TemplateSearchData[]);
  const history = useHistory();

  useDidMount(async () => {
    const result = await query.list({
      direction: "after",
      limit: LIMIT,
    });
    setTemplates(result.datas);
  });

  const before = async () => {
    const len = templates.length;
    const boundaryKey = len > 0 ? templates[0].sortKey : undefined;
    const result = await query.list({
      direction: "before",
      boundaryKey: boundaryKey,
      limit: LIMIT,
    });
    if (result.datas.length > 0) {
      setTemplates(result.datas);
    }
  };

  const after = async () => {
    const len = templates.length;
    const boundaryKey = len > 0 ? templates[len - 1].sortKey : undefined;
    const result = await query.list({
      direction: "after",
      boundaryKey: boundaryKey,
      limit: LIMIT,
    });
    if (result.datas.length > 0) {
      setTemplates(result.datas);
    }
  };

  const toEditPage = (id: string) => {
    history.push(TemplateEditPath.makeURI(id));
  };

  return (
    <TemplateListView
      templates={templates}
      before={before}
      after={after}
      toEditPage={toEditPage}
    />
  );
};
