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

export const Router = () => {
  const user = useUser();
  const protectedRoutes = [
    { label: "dashboard", path: "/dashboard/users", role: "admin" },
    { label: "profile", path: "/profile" },
    { label: "new post", path: "/post/" },
  ];
  const unprotectedRoutes = [
    { label: "login", path: "/login" },
    { label: "register", path: "/register" },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout pages={user?.currentUser.user ? protectedRoutes : unprotectedRoutes} />}>
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard/*" element={<Dashboard />}>
              <Route path="users" element={<ManageUsers />} />
              <Route path="tags" element={<ManageTags />} />
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
    </BrowserRouter>
  );
};
