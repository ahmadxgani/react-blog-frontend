import { useQuery } from "@apollo/client";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Query } from "../../../generated-types";
import { useUser } from "../../global/UserProvider";
import { GET_ROLE } from "../../GraphQL/Queries";
import { Pages, User } from "../../lib/types";
import Loading from "../plugins/Loading";
import { Bars3BottomLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../../global/ThemeProvider";

function Navigation({ pages }: { pages: Pages }) {
  const auth = useUser();
  const { handleToggleTheme, currentTheme } = useTheme();
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
    <nav className="navbar bg-base-100">
      <div className="dropdown dropdown-bottom">
        <label tabIndex={0} className="btn btn-ghost btn-xs md:btn-md btn-circle avatar">
          <Bars3BottomLeftIcon className="md:w-9 w-5" />
        </label>
        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 gap-1">
          <input type="checkbox" className="toggle self-end" onClick={() => handleToggleTheme(currentTheme)} defaultChecked={currentTheme === "dark"} />
          {pages
            .filter((page) => !page.role)
            .map(({ label, path }, i) => (
              <li key={i}>
                <NavLink key={label} to={path} className={({ isActive }) => (isActive ? "bg-[#6419e6] rounded p-1 px-2 text-white" : undefined) + " uppercase font-semibold"}>
                  {label}
                </NavLink>
              </li>
            ))}
          {author &&
            author.GetAuthorById.role === "admin" &&
            pages
              .filter((page) => page.role === "admin")
              .map(({ label, path }, i) => (
                <li key={i}>
                  <NavLink key={label} to={path} className={({ isActive }) => (isActive ? "bg-[#6419e6] rounded p-1 px-2 text-white" : undefined) + " uppercase font-semibold"}>
                    {label}
                  </NavLink>
                </li>
              ))}
        </ul>
      </div>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-base md:text-lg lg:text-xl btn-sm md:btn-md">
          Zero's Blog
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <div className="input-group">
            <input type="text" placeholder="Search…" className="input input-bordered input-xs md:input-sm" />
            <button className="btn btn-square btn-xs md:btn-sm">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        {auth?.currentUser.user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={process.env.PUBLIC_URL + "/img/example/user.jpeg"} width={80} alt="profile" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 gap-1">
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
