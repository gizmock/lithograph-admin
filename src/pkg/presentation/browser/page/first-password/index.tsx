import { Intent } from "@blueprintjs/core";
import { Header } from "../../common/header";
import { CenteringTemplate } from "../../template/centering";
import { FirstPasswordView } from "./view";

const callout = {
  intent: Intent.PRIMARY,
  title: "新しいパスワードの設定",
  message: "初回のログインのため、新しいパスワードを設定してください。",
};

export const FirstPasswordPage = () => {
  return (
    <CenteringTemplate header={<Header />} callout={callout}>
      <FirstPasswordView />
    </CenteringTemplate>
  );
};
