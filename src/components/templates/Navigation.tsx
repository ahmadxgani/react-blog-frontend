import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="flex justify-between w-full p-5 border-b">
      <Link to="/">
        <h2 className="text-2xl font-extrabold">Zero's Blog</h2>
      </Link>
      <div className="flex items-center gap-5">
        <Link to="/post">
          <img src={process.env.PUBLIC_URL + "/img/icon/Create.png"} alt="add new post" width={28} />
        </Link>
        <Link to="/login">
          <img src={process.env.PUBLIC_URL + "/img/icon/Login.png"} alt="Sign up" width={28} />
        </Link>
        <Link to="/dashboard">
          <img src={process.env.PUBLIC_URL + "/img/icon/Administrative.png"} alt="admin panel" width={28} />
        </Link>
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
