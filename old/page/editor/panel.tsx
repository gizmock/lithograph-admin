import { Button, Modal } from "antd";
import { SaveOutlined, DeleteOutlined, Html5Outlined } from "@ant-design/icons";
import "./panel.css";
import { useState } from "react";

type Props = {
  id?: string;
  save: () => void;
  formatBody: () => void;
  remove: () => void;
};

export const Panel = (props: Props) => {
  const RemoveButton = props.id ? (
    <Remove id={props.id} remove={props.remove} />
  ) : (
    <></>
  );
  return (
    <>
      <Save save={props.save} />
      <FormatBody formatBody={props.formatBody} />
      {RemoveButton}
    </>
  );
};

const Save = (props: { save: () => void }) => {
  return (
    <>
      <span className="pageEditorPanelDesktop">
        <Button type="primary" onClick={props.save} icon={<SaveOutlined />}>
          保存
        </Button>
      </span>
      <span className="pageEditorPanelMobile">
        <Button
          type="primary"
          onClick={props.save}
          icon={<SaveOutlined />}
          shape={"round"}
        />
      </span>
    </>
  );
};

const FormatBody = (props: { formatBody: () => void }) => {
  return (
    <>
      <span className="pageEditorPanelDesktop">
        <Button
          type="primary"
          onClick={props.formatBody}
          icon={<Html5Outlined />}
        >
          整形
        </Button>
      </span>
      <span className="pageEditorPanelMobile">
        <Button
          type="primary"
          onClick={props.formatBody}
          icon={<Html5Outlined />}
          shape={"round"}
        />
      </span>
    </>
  );
};

const Remove = (props: { id: string; remove: () => void }) => {
  const [visible, updateVisible] = useState(false);
  return (
    <>
      <span className="pageEditorPanelDesktop">
        <Button
          type="primary"
          danger
          onClick={() => updateVisible(true)}
          icon={<DeleteOutlined />}
        >
          削除
        </Button>
      </span>
      <span className="pageEditorPanelMobile">
        <Button
          type="primary"
          danger
          onClick={() => updateVisible(true)}
          icon={<DeleteOutlined />}
          shape={"round"}
        />
      </span>
      <Modal
        title="ページ削除"
        visible={visible}
        onCancel={() => updateVisible(false)}
        onOk={async () => {
          props.remove();
          updateVisible(false);
        }}
      >
        ページを削除しますか？
        <br />
        ID: {props.id}
      </Modal>
    </>
  );
};
