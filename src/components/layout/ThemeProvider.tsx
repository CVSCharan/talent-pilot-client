import { useThemeStore } from "../../store/theme-store";
import React, { useEffect } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const body = document.body;
    body.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      body.classList.add(systemTheme);
    } else {
      body.classList.add(theme);
    }
    sessionStorage.setItem("theme", theme);
  }, [theme]);

  return <>{children}</>;
}

export default ThemeProvider;
