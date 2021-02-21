import { FocusStyleManager } from "@blueprintjs/core";
import { useState } from "react";
import { ThemeContext } from "../../../ui/browser/context";
import { setDarkModeBodyClass } from "../../../ui/browser/dom";
import {
  addConsoleSetting,
  loadConsoleSetting,
} from "../../../ui/browser/local-storage";

const DEFAULT_DARK_MODE = true;

type Props = {
  children?: React.ReactNode;
};

export const WrapWithTheme = (props: Props) => {
  // Blueprintがボタンなどのパーツにフォーカス時に枠線をつける機能をオフにする
  FocusStyleManager.onlyShowFocusOnTabs();

  // Dark mode
  const setting = loadConsoleSetting();
  const [darkMode, setDarkMode] = useState(
    setting && setting.darkMode !== undefined
      ? setting.darkMode
      : DEFAULT_DARK_MODE
  );
  setDarkModeBodyClass(darkMode);
  const toggleDarkMode = () => {
    addConsoleSetting({ darkMode: !darkMode });
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode: darkMode,
        toggleDarkMode: toggleDarkMode,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
