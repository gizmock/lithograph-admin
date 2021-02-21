import { useDidMount } from "beautiful-react-hooks";
import { useState } from "react";
import { Authorizer, AuthSession } from "../../../app/authorizer";
import { SessionContext } from "../../../presentation/browser/context";
import { FirstPasswordPage } from "../../../presentation/browser/page/first-password";
import { InitializePage } from "../../../presentation/browser/page/initialize";
import { SignInPage } from "../../../presentation/browser/page/sign-in";

type Props = {
  authorizer: Authorizer;
  authorizedPageProvider: () => JSX.Element;
};

export const WrapWithAuth = (props: Props) => {
  const [session, setSession] = useState(undefined as AuthSession | undefined);
  const [loaded, setLoaded] = useState(false);

  useDidMount(async () => {
    setSession(await props.authorizer.getSession());
    setLoaded(true);
  });

  if (!loaded) {
    return <InitializePage />;
  }
  return (
    <SessionContext.Provider
      value={{
        session: session,
        setSession: setSession,
      }}
    >
      <SelectPage
        session={session}
        authorizedPageProvider={props.authorizedPageProvider}
      />
    </SessionContext.Provider>
  );
};

const SelectPage = (props: {
  session?: AuthSession;
  authorizedPageProvider: () => JSX.Element;
}) => {
  if (!props.session) {
    return <SignInPage />;
  }
  switch (props.session.status) {
    case "Authorized":
      return <props.authorizedPageProvider />;
    case "RequiredNewPassword":
      return <FirstPasswordPage />;
  }
};
