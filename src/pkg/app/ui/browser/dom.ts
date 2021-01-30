import { Classes } from "@blueprintjs/core";

export function setDarkModeBodyClass(darkMode: boolean) {
  if (darkMode) {
    document.body.classList.add("dark-body");
    document.body.classList.add(Classes.DARK);
  } else {
    document.body.classList.remove("dark-body");
    document.body.classList.remove(Classes.DARK);
  }
}
