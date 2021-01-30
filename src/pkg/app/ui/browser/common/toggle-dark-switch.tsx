import { Switch } from "@blueprintjs/core";

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  large?: boolean;
};

export const ToggleDarkSwitch = (props: Props) => {
  return (
    <Switch
      checked={props.darkMode}
      onChange={props.toggleDarkMode}
      large={props.large}
      innerLabel={props.darkMode ? "Dark" : "Light"}
    />
  );
};
