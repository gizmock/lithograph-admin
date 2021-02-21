import { useDidMount } from "beautiful-react-hooks";
import { useContext, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { UsecaseContext } from "../../context";
import { TemplateEditPath, TemplateEditPathParam } from "../../route-path";
import { TemplateEditView } from "./edit-view";

export const TemplateEditPage = () => {
  const params = useParams<TemplateEditPathParam>();
  const [id, setID] = useState(params.id);
  const title = useRef({ value: "" } as HTMLInputElement);
  const [body, setBody] = useState("");
  const usecase = useContext(UsecaseContext).template.usecase;
  const query = useContext(UsecaseContext).template.query;
  const history = useHistory();

  useDidMount(async () => {
    if (!id) {
      return;
    }
    const data = await query.get(id);
    if (data) {
      title.current.value = data.title;
      setBody(data.body);
    }
  });

  const createID = () => {
    const newID = "template-" + uuidv4();
    setID(newID);
    history.push(TemplateEditPath.makeURI(newID));
    return newID;
  };

  const save = async () => {
    const saveID = id ? id : createID();
    await usecase.saveTemplate({
      id: saveID,
      title: title.current.value,
      body: body,
    });
  };

  const remove = async () => {
    await usecase.removeTemplate(id!);
  };

  return (
    <TemplateEditView
      id={id}
      title={title}
      body={body}
      setBody={setBody}
      save={save}
      remove={remove}
    />
  );
};
