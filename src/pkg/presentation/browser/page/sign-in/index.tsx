import { Header } from "../../common/header";
import { CenteringTemplate } from "../../template/centering";
import { SignInView } from "./view";

export const SignInPage = () => {
  return (
    <CenteringTemplate header={<Header />}>
      <SignInView />
    </CenteringTemplate>
  );
};
