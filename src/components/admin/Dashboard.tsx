import { UserGroupIcon, TagIcon } from "@heroicons/react/24/solid";
import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <ul className="menu menu-compact p-4 space-y-1 w-60 text-base-content absolute right-10 gap-1">
        <li>
          <NavLink to="/dashboard/users" className={({ isActive }) => (isActive ? "bg-[#6419E6] text-white rounded p-1 px-2" : undefined)}>
            <UserGroupIcon className="h-10 w-10" /> Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/tags" className={({ isActive }) => (isActive ? "bg-[#6419e6] text-white rounded p-1 px-2" : undefined)}>
            <TagIcon className="h-10 w-10" /> Manage Tags
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}
