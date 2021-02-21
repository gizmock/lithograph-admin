import {
  Button,
  ButtonGroup,
  ControlGroup,
  H1,
  Intent,
} from "@blueprintjs/core";
import { useHistory } from "react-router";
import { TemplateSearchData } from "../../../../app/query/template";
import { TemplateEditPath } from "../../route-path";

type Props = {
  templates: TemplateSearchData[];
  before: () => Promise<void>;
  after: () => Promise<void>;
  toEditPage: (id: string) => void;
};

export const TemplateListView = (props: Props) => {
  const history = useHistory();

  return (
    <>
      <H1>テンプレート一覧</H1>

      <ControlGroup>
        <Button
          intent={Intent.PRIMARY}
          onClick={() => history.push(TemplateEditPath.getParentURI())}
        >
          作成
        </Button>
      </ControlGroup>

      <ButtonGroup>
        <Button icon="arrow-left" onClick={props.before} />
        <Button icon="arrow-right" onClick={props.after} />
      </ButtonGroup>

      <ButtonGroup
        alignText="left"
        minimal
        vertical
        style={{
          width: "100%",
        }}
      >
        {props.templates.map((template) => {
          return (
            <Button
              key={template.id}
              onClick={() => props.toEditPage(template.id)}
              style={{ marginBottom: "12px" }}
            >
              {template.title}
            </Button>
          );
        })}
      </ButtonGroup>

      {props.templates.length === 0 ? (
        <>これ以上の検索結果はありませんでした</>
      ) : (
        <></>
      )}
    </>
  );
};
