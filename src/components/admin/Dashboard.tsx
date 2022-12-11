import { UserGroupIcon, TagIcon } from "@heroicons/react/24/solid";
import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="form-control gap-1">
      <div className="tabs tabs-boxed w-[fit-content]">
        <NavLink to="/dashboard/users" className={({ isActive }) => (isActive ? "tab-active" : undefined) + " tab"}>
          <UserGroupIcon className="w-5" /> Manage Users
        </NavLink>
        <NavLink to="/dashboard/tags" className={({ isActive }) => (isActive ? "tab-active" : undefined) + " tab"}>
          <TagIcon className="w-5" /> Manage Tags
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
