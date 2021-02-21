import { useDidMount } from "beautiful-react-hooks";
import { useContext, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { UsecaseContext } from "../../../context";
import { TemplateEditPath, TemplateEditPathParam } from "../../../route-path";
import { TemplateEditView } from "./view";

export const TemplateEditPage = () => {
  const params = useParams<TemplateEditPathParam>();
  const [id, setID] = useState(params.id);
  const name = useRef({ value: "" } as HTMLInputElement);
  const [html, setHTML] = useState("");
  const usecase = useContext(UsecaseContext).template.usecase;
  const query = useContext(UsecaseContext).template.query;
  const history = useHistory();

  useDidMount(async () => {
    if (!id) {
      return;
    }
    const data = await query.get(id);
    if (data) {
      name.current.value = data.name;
      setHTML(data.html);
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
      name: name.current.value,
      html: html,
    });
  };

  const remove = async () => {
    await usecase.removeTemplate(id!);
  };

  return (
    <TemplateEditView
      id={id}
      name={name}
      html={html}
      setHTML={setHTML}
      save={save}
      remove={remove}
    />
  );
};
