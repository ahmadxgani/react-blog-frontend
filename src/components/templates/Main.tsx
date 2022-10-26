import { Link } from "react-router-dom";

function Main() {
  return (
    <main className="bg-[#E6E5F3] h-[100vh] flex flex-col justify-center">
      <div className="flex w-[982px] h-[307px] justify-between pl-[45px] pr-[50px] py-[60px] box-content mx-auto border-b bg-white rounded-xl">
        <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="mr-[50px] relative">
          <img src={process.env.PUBLIC_URL + "/img/example/thumbnail.jpg"} alt="Thumbnail" width={400} height={300} className="rounded-[20px]" />
          <div className="pt-[25px] pr-[25px] top-0 right-0 absolute">
            <img src={process.env.PUBLIC_URL + "/img/example/profile.jpg"} alt="Profile" className="border-[5px] border-solid border-white rounded-full w-[50px] h-[50px]" />
          </div>
        </Link>
        <div className="w-3/4 flex flex-col justify-between">
          <div className="flex gap-2 flex-col">
            <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="font-bold text-[40px] text-[#353443]">
              How to be an Ideal Engineer React JS
            </Link>
            <p className="text-xl">
              <span className="text-[#37A0C1] font-bold">React JS&#9;</span>
              <span className="text-[#8C8B93]">|&#9;</span>
              <span className="text-[#8E8D93]">6 min read</span>
            </p>
            <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="text-[22px] text-[#57565C]">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
            </Link>
          </div>
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + "/img/icon/Bookmark.png"} alt="bookmark" width={45} />
        </div>
      </div>
    </main>
  );
}

export default Main;
