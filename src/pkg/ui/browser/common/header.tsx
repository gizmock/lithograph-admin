import { useContext } from "react";
import { SiteContext } from "../context";

export const Header = () => {
  const siteCtx = useContext(SiteContext);
  return <>{siteCtx.name} コンソール</>;
};
