import "./with-sidebar.css";

type Props = {
  header: React.ReactNode;
  sideBar: React.ReactNode;
  sideDrawer?: {
    button: React.ReactNode;
    drawer: React.ReactNode;
  };
  children: React.ReactNode;
};

export const ConsoleTemplate = (props: Props) => {
  return (
    <div className="console-with-sidebar">
      <aside>{props.sideBar}</aside>
      <header>
        <div>{props.header}</div>
        <div>{props.sideDrawer?.button}</div>
      </header>
      <main>{props.children}</main>
      <footer>Lithopgraph Serverless CMS</footer>
      {props.sideDrawer?.drawer}
    </div>
  );
};
