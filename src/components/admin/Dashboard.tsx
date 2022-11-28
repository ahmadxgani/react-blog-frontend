import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col items-center gap-3 p-3 py-6 bg-white rounded-full absolute right-10">
        <NavLink to="/dashboard/users" className={({ isActive }) => (isActive ? "bg-[#E6E5F3] rounded p-1 px-2" : undefined)}>
          <img src={process.env.PUBLIC_URL + "/img/icon/ManageUser.png"} alt="manage user" width={30} />
        </NavLink>
        <NavLink to="/dashboard/tags" className={({ isActive }) => (isActive ? "bg-[#E6E5F3] rounded p-1 px-2" : undefined)}>
          <img src={process.env.PUBLIC_URL + "/img/icon/Tags.png"} alt="manage tags" width={30} />
        </NavLink>
      </div>
      <Outlet />
    </>
  );
}
