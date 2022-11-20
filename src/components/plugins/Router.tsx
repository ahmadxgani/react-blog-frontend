import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import ManageTags from "../admin/ManageTags";
import ManageUsers from "../admin/ManageUsers";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import Profile from "../auth/Profile";
import Recovery from "../auth/Recovery";
import Register from "../auth/Register";
import DetailPost from "../post/DetailPost";
import NewPost from "../post/NewPost";
import ShowAllPost from "../post/ShowAllPost";
import MainLayout from "../templates/MainLayout";
import ProtectedRoute from "../templates/ProtectedLayout";
import { useUser } from "../../global/UserProvider";

export const Router = () => {
  const user = useUser();
  const protectedRoutes = [
    { label: "dashboard", path: "/dashboard/users" },
    { label: "profile", path: "/profile" },
    { label: "new post", path: "/post" },
    { label: "logout", path: "/logout" },
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
            <Route path="logout" element={<Logout />}></Route>
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard/*" element={<Dashboard />}>
              <Route path="users" element={<ManageUsers />} />
              <Route path="tags" element={<ManageTags />} />
            </Route>
            <Route path="post" element={<NewPost />} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/recovery-password" element={<Recovery />} />
          <Route path="/" element={<ShowAllPost />} />
          <Route path="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" element={<DetailPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
