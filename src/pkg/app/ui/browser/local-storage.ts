const CONSOLE_SETTING_KEY = "console.setting";

type ConsoleSetting = {
  darkMode?: boolean;
};

export function addConsoleSetting(write: ConsoleSetting) {
  let val = loadConsoleSetting();
  if (val) {
    val = { ...write };
  }
  localStorage.setItem(CONSOLE_SETTING_KEY, JSON.stringify(val));
}

export function loadConsoleSetting(): ConsoleSetting {
  const val = localStorage.getItem(CONSOLE_SETTING_KEY);
  if (val) {
    return JSON.parse(val);
  } else {
    return {};
  }
}
