import React, { useEffect, useState } from "react";
import styles from "./theme-toggle.module.css";

type Theme = "system" | "light" | "dark";

const THEME_KEY = "theme-preference";

const icons: Record<Theme, string> = {
  light: "\u2600", // ☀
  dark: "\u263E",  // ☾
  system: "\u25D1", // ◑
};

const labels: Record<Theme, string> = {
  light: "Light mode (click for dark)",
  dark: "Dark mode (click for system)",
  system: "System theme (click for light)",
};

const cycle: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }
}

export default function ThemeToggle(): React.JSX.Element {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored && (stored === "light" || stored === "dark" || stored === "system")) {
      setTheme(stored);
      applyTheme(stored);
    }
  }, []);

  const handleClick = () => {
    const next = cycle[theme];
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  };

  return (
    <button
      className={styles.toggle}
      onClick={handleClick}
      aria-label={labels[theme]}
      title={labels[theme]}
      type="button"
    >
      {icons[theme]}
    </button>
  );
}
