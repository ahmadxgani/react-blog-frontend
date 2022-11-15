import { Route, Routes } from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import DetailPost from "../post/DetailPost";
import NewPost from "../post/NewPost";
import ShowAllPost from "../post/ShowAllPost";

function Main() {
  return (
    <main className="bg-[#E6E5F3] py-10 h-full flex justify-center">
      <Routes>
        <Route path="/" element={<ShowAllPost />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post" element={<NewPost />} />
        <Route path="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" element={<DetailPost />} />
      </Routes>
    </main>
  );
}

export default Main;
