import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-3 p-4 py-6 bg-white rounded-full absolute right-10">
        <Link to="/dashboard/users">
          <img src={process.env.PUBLIC_URL + "/img/icon/ManageUser.png"} alt="manage user" width={30} />
        </Link>
        <Link to="/dashboard/tags">
          <img src={process.env.PUBLIC_URL + "/img/icon/Tags.png"} alt="manage tags" width={30} />
        </Link>
      </div>
      <Outlet />
    </>
  );
}
