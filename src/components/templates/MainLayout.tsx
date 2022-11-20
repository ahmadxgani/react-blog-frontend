import { useOutlet } from "react-router-dom";
import { Pages } from "../../lib/types";
import Navigation from "./Navigation";

const MainLayout = ({ pages }: { pages: Pages }) => {
  const outlet = useOutlet();

  return (
    <>
      <Navigation pages={pages} />
      <main className="bg-[#E6E5F3] py-10 h-full flex justify-center">{outlet}</main>
    </>
  );
};

export default MainLayout;
