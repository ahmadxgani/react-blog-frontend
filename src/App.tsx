import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailPost from "./components/post/DetailPost";
import NewPost from "./components/post/NewPost";
import Navigation from "./components/templates/Navigation";
import Main from "./components/templates/Main";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" element={<DetailPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
