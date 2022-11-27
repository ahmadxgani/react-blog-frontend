import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../global/UserProvider";
import { Pages } from "../../lib/types";

function Navigation({ pages }: { pages: Pages }) {
  const auth = useUser();
  const navigate = useNavigate();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    auth?.setCurrentUser({ type: "logout" });
    navigate("/login");
  };
  return (
    <nav className="flex justify-between w-full p-5 border-b">
      <Link to="/">
        <h2 className="text-2xl font-extrabold">Zero's Blog</h2>
      </Link>
      <div className="flex items-center gap-5">
        {pages.map(({ label, path }) => (
          <Link key={label} to={path} className="uppercase font-semibold">
            {label}
          </Link>
        ))}
        <button className="uppercase font-semibold" onClick={handleLogout}>
          Logout
        </button>
        <div className="flex w-auto items-center border-teal-300 border rounded-full">
          <span className="p-2 pr-0">
            <img src={process.env.PUBLIC_URL + "/img/icon/Search.png"} alt="search" width={20} />
          </span>
          <input type="text" placeholder="Search" className="p-2 bg-transparent focus:outline-none" />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
