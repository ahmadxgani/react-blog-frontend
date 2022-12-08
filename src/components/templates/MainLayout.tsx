import { useOutlet } from "react-router-dom";
import { Pages } from "../../lib/types";
import Navigation from "./Navigation";

const MainLayout = ({ pages }: { pages: Pages }) => {
  const outlet = useOutlet();

  return (
    <div className="bg-[#E6E5F3] min-h-screen h-full">
      <Navigation pages={pages} />
      <main className="py-10 flex justify-center">{outlet}</main>
    </div>
  );
};

export default MainLayout;
