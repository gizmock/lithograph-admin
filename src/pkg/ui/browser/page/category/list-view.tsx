import {
  Button,
  ButtonGroup,
  ControlGroup,
  H1,
  Intent,
} from "@blueprintjs/core";
import { useHistory } from "react-router";
import { CategorySearchData } from "../../../../app/query/category";
import { CategoryEditPath } from "../../route-path";

type Props = {
  categories: CategorySearchData[];
  toEditPage: (id: string) => void;
};

export const CategoryListView = (props: Props) => {
  const history = useHistory();

  return (
    <>
      <H1>カテゴリ一覧</H1>

      <ControlGroup>
        <Button
          intent={Intent.PRIMARY}
          onClick={() => history.push(CategoryEditPath.getParentURI())}
        >
          作成
        </Button>
      </ControlGroup>

      <ButtonGroup
        alignText="left"
        minimal
        vertical
        style={{
          width: "100%",
        }}
      >
        {props.categories.map((category) => {
          return (
            <Button
              key={category.id}
              onClick={() => props.toEditPage(category.id)}
              style={{ marginBottom: "12px" }}
            >
              {category.title}
            </Button>
          );
        })}
      </ButtonGroup>
    </>
  );
};
