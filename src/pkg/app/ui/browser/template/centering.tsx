import { Callout, Intent } from "@blueprintjs/core";
import "./centering.css";

type CalloutProps = {
  intent?: Intent;
  title?: string;
  message?: string;
};

type Props = {
  header?: React.ReactNode;
  callout?: CalloutProps;
  children?: React.ReactNode;
};

export const CenteringTemplate = (props: Props) => {
  const callout = props.callout ? <CalloutView {...props.callout} /> : <></>;
  return (
    <div className="console-centering">
      <main>
        <header>{props.header}</header>
        {callout}
        {props.children}
      </main>
    </div>
  );
};

const CalloutView = (props: CalloutProps) => {
  return (
    <Callout
      intent={props.intent}
      title={props.title}
      style={{ marginBottom: "24px" }}
    >
      {props.message}
    </Callout>
  );
};
