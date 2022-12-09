import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type theme = "light" | "dark";

let initialState: theme = (localStorage.getItem("theme") as theme) || "light";

const ThemeContext = createContext<{ currentTheme: typeof initialState; handleToggleTheme: (theme: theme) => void }>({} as any);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState(initialState);
  const handleToggleTheme = (theme: theme) => {
    theme === "dark" ? setCurrentTheme("light") : setCurrentTheme("dark");
  };
  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);
  return <ThemeContext.Provider value={{ currentTheme, handleToggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
