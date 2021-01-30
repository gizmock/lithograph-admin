import moment from "moment";
import { Input, DatePicker } from "antd";
import { HtmlEditor } from "./html-editor";

type Props = {
  published: Date;
  updatePublished: (published: Date) => void;
  title: string;
  updateTitle: (title: string) => void;
  body: string;
  updateBody: (body: string) => void;
};

export const Content = (props: Props) => {
  return (
    <>
      <div style={{ marginBottom: "16px" }}>
        <DateTimePicker
          value={props.published}
          onChange={props.updatePublished}
        />
      </div>
      <Input
        placeholder="タイトル"
        required={true}
        value={props.title}
        onChange={(e) => props.updateTitle(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <HtmlEditor body={props.body} updateBody={props.updateBody} />
    </>
  );
};

const DateTimePicker = (props: {
  value: Date;
  onChange: (date: Date) => void;
}) => {
  return (
    <DatePicker
      defaultValue={moment(props.value)}
      showTime={true}
      onChange={(moment) => {
        if (moment) {
          props.onChange(moment.toDate());
        }
      }}
    />
  );
};
