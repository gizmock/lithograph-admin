import { Link } from "react-router-dom";
import { List } from "antd";
import { Page } from "../../../../models/page";
import { RoutePath } from "../../../routes";

type Props = {
  pages: Page[];
};

export const Collection = (props: Props) => {
  if (props.pages.length === 0) {
    return <div style={{ marginBottom: "16px" }}>ページはまだありません</div>;
  }
  return (
    <List bordered>
      {props.pages.map((page) => (
        <List.Item key={page.id}>
          <Data page={page} />
        </List.Item>
      ))}
    </List>
  );
};

const Data = (props: { page: Page }) => {
  const page = props.page;
  const title = page.title === "" ? "タイトル未設定" : page.title;
  const published = page.published;
  const dateTime =
    published.toLocaleDateString() + " " + published.toLocaleTimeString();
  return (
    <Link
      to={RoutePath.PageEditor + "/" + page.id}
      style={{ cursor: "pointer", width: "100%" }}
    >
      <List.Item.Meta title={title} description={dateTime} />
    </Link>
  );
};
