import { Link } from "react-router-dom";
import { Button } from "antd";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { RoutePath } from "../../../routes";
import "./panel.css";

type Props = {
  reloadPages: () => void;
};

export const Panel = (props: Props) => {
  return (
    <>
      <NewPage />
      <Reload reloadPages={props.reloadPages} />
    </>
  );
};

const NewPage = () => {
  return (
    <>
      <span className="pageListPanelDesktop">
        <Link to={RoutePath.PageEditor}>
          <Button type="primary" icon={<EditOutlined />}>
            新規
          </Button>
        </Link>
      </span>
      <span className="pageListPanelMobile">
        <Link to={RoutePath.PageEditor}>
          <Button type="primary" icon={<EditOutlined />} shape={"round"} />
        </Link>
      </span>
    </>
  );
};

const Reload = (props: { reloadPages: () => void }) => {
  return (
    <>
      <span className="pageListPanelDesktop">
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={props.reloadPages}
        >
          更新
        </Button>
      </span>
      <span className="pageListPanelMobile">
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={props.reloadPages}
          shape={"round"}
        />
      </span>
    </>
  );
};
