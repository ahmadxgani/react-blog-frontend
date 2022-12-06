import { useQuery } from "@apollo/client";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Query } from "../../../generated-types";
import { useUser } from "../../global/UserProvider";
import { GET_ROLE } from "../../GraphQL/Queries";
import { Pages, User } from "../../lib/types";
import Loading from "../plugins/Loading";

function Navigation({ pages }: { pages: Pages }) {
  const auth = useUser();
  const { data: author, loading } = useQuery<Query>(GET_ROLE, {
    variables: {
      id: (auth?.currentUser.user as User)?.id,
    },
    skip: !auth?.currentUser.user,
  });
  const navigate = useNavigate();
  if (loading) return <Loading />;

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    auth?.setCurrentUser({ type: "logout" });
    navigate("/login");
  };
  return (
    <nav className="flex justify-between w-full p-5 border-b bg-white">
      <Link to="/">
        <h2 className="text-2xl font-extrabold">Zero's Blog</h2>
      </Link>
      <div className="flex items-center gap-5">
        {pages
          .filter((page) => !page.role)
          .map(({ label, path }) => (
            <NavLink key={label} to={path} className={({ isActive }) => (isActive ? "bg-[#E6E5F3] rounded p-1 px-2" : undefined) + " uppercase font-semibold"}>
              {label}
            </NavLink>
          ))}
        {author &&
          author.GetAuthorById.role === "admin" &&
          pages
            .filter((page) => page.role === "admin")
            .map(({ label, path }) => (
              <NavLink key={label} to={path} className={({ isActive }) => (isActive ? "bg-[#E6E5F3] rounded p-1 px-2" : undefined) + " uppercase font-semibold"}>
                {label}
              </NavLink>
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
