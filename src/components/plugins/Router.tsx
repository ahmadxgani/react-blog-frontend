import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import ManageTags from "../admin/ManageTags";
import ManageUsers from "../admin/ManageUsers";
import Login from "../auth/Login";
import Profile from "../auth/Profile";
import Recovery from "../auth/Recovery";
import Register from "../auth/Register";
import DetailPost from "../post/DetailPost";
import NewPost from "../post/NewPost";
import ShowAllPost from "../post/ShowAllPost";
import MainLayout from "../templates/MainLayout";
import ProtectedRoute from "../templates/ProtectedLayout";
import { useUser } from "../../global/UserProvider";
import EditPost from "../post/EditPost";
import AuthLayout from "../templates/AuthLayout";
import { Pages } from "../../lib/types";
import TitleProvider from "../../global/TitleProvider";

const protectedRoutes = [
  { label: "dashboard", path: "/dashboard/users", role: "admin", isInNavBar: true, title: "manage users" },
  { label: "profile", path: "/profile", isInNavBar: true, title: "my profile" },
  { label: "new post", path: "/post/", isInNavBar: true },
  { label: "dashboard", path: "/dashboard/tags", title: "manage tags" },
  { label: "edit post", path: "/post/:slug/edit" },
];
const unprotectedRoutes = [
  { label: "login", path: "/login", isInNavBar: true },
  { label: "register", path: "/register", isInNavBar: true },
  { label: "forgot password", path: "/recovery-password" },
];
export const mappedRoutes: Pages = [{ label: "home", path: "/" }, { label: "detail", path: "/post/:slug" }, ...protectedRoutes, ...unprotectedRoutes];

export const Router = () => {
  const user = useUser();

  return (
    <BrowserRouter>
      <TitleProvider>
        <Routes>
          <Route element={<MainLayout pages={user?.currentUser.user ? protectedRoutes.filter((route) => route.isInNavBar) : unprotectedRoutes.filter((route) => route.isInNavBar)} />}>
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />
              <Route element={<Dashboard />}>
                <Route path="dashboard/users" element={<ManageUsers />} />
                <Route path="dashboard/tags" element={<ManageTags />} />
              </Route>
              <Route path="post" element={<NewPost />} />
              <Route path="/post/:slug/edit" element={<EditPost />} />
            </Route>
            <Route path="/" element={<ShowAllPost />} />
            <Route path="/post/:slug" element={<DetailPost />} />
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />} />
              <Route path="/recovery-password" element={<Recovery />} />
            </Route>
          </Route>
        </Routes>
      </TitleProvider>
    </BrowserRouter>
  );
};
