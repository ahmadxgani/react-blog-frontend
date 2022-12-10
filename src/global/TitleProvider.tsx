import { createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { mappedRoutes } from "../components/plugins/Router";
import { titleCase } from "../lib/utils";

const TitleContext = createContext(undefined);

const TitleProvider = ({ children }: { children: React.ReactNode }) => {
  let curLoc = useLocation();

  useEffect(() => {
    const pages = mappedRoutes.find((page) => page.path === curLoc.pathname);
    if (pages?.title || pages?.label) {
      document.title = `Blog | ${titleCase(pages?.title || pages?.label)}`;
    }
  }, [curLoc]);

  return <TitleContext.Provider value={undefined}>{children}</TitleContext.Provider>;
};

export default TitleProvider;
