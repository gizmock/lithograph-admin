import { Intent, Spinner } from "@blueprintjs/core";
import { CenteringTemplate } from "../template/centering";

export const InitializePage = () => {
  return (
    <CenteringTemplate>
      <Spinner intent={Intent.PRIMARY} size={120} />
    </CenteringTemplate>
  );
};
