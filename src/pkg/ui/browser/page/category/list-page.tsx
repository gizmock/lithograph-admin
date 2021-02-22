import { useDidMount } from "beautiful-react-hooks";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { CategorySearchData } from "../../../../app/query/category";
import { UsecaseContext } from "../../context";
import { CategoryEditPath } from "../../route-path";
import { CategoryListView } from "./list-view";

export const CategoryListPage = () => {
  const query = useContext(UsecaseContext).category.query;
  const [categories, setCategories] = useState([] as CategorySearchData[]);
  const history = useHistory();

  useDidMount(async () => {
    const result = await query.list();
    setCategories(result.datas);
  });

  const toEditPage = (id: string) => {
    history.push(CategoryEditPath.makeURI(id));
  };

  return <CategoryListView categories={categories} toEditPage={toEditPage} />;
};
