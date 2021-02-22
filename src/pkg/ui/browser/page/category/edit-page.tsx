import { useDidMount } from "beautiful-react-hooks";
import { useContext, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { UsecaseContext } from "../../context";
import { CategoryEditPath, CategoryEditPathParam } from "../../route-path";
import { CategoryEditView } from "./edit-view";

export const CategoryEditPage = () => {
  const params = useParams<CategoryEditPathParam>();
  const [id, setID] = useState(params.id);
  const title = useRef({ value: "" } as HTMLInputElement);
  const usecase = useContext(UsecaseContext).category.usecase;
  const query = useContext(UsecaseContext).category.query;
  const history = useHistory();

  useDidMount(async () => {
    if (!id) {
      return;
    }
    const data = await query.get(id);
    if (data) {
      title.current.value = data.title;
    }
  });

  const add = async (id: string) => {
    const newID = "category-" + id;
    await usecase.addCategory({
      id: newID,
      title: title.current.value,
    });
    setID(newID);
    history.push(CategoryEditPath.makeURI(newID));
  };

  const save = async () => {
    await usecase.updateCategory({
      id: id!,
      title: title.current.value,
    });
  };

  const remove = async () => {
    await usecase.removeCategory(id!);
  };

  return (
    <CategoryEditView
      id={id}
      title={title}
      add={add}
      save={save}
      remove={remove}
    />
  );
};
