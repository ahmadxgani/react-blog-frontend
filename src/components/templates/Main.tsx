import { Link } from "react-router-dom";

function Main() {
  return (
    <main className="bg-[#E6E5F3] h-[100vh] flex flex-col">
      <div className="flex flex-col gap-[20px] mt-[50px]">
        <div className="flex p-[18px] gap-[35px] justify-center mx-auto border-b bg-white rounded-xl">
          <div className="flex gap-5">
            <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="relative w-[235px] h-[184px]">
              <img src={process.env.PUBLIC_URL + "/img/example/thumbnail.jpg"} alt="Thumbnail" className="rounded-[20px]" />
              <div className="pt-[10px] pr-[10px] top-0 right-0 absolute">
                <img src={process.env.PUBLIC_URL + "/img/example/profile.jpg"} alt="Profile" className="border-[3px] border-solid border-white rounded-full w-[30px] h-[30px]" />
              </div>
            </Link>
            <div className="w-[418px] h-[179px] flex">
              <div className="flex gap-2 flex-col">
                <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="font-bold text-2xl leading-6 text-[#353443]">
                  How to be an Ideal Engineer React JS
                  <p className="text-xl">
                    <small className="text-[#37A0C1] font-bold">React JS&#9;</small>
                    <span className="text-[#8C8B93] font-medium">|&#9;</span>
                    <small className="text-[#8E8D93]">6 min read</small>
                  </p>
                </Link>

                <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="text-[16px] text-[#57565C]">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
                </Link>
              </div>
            </div>
          </div>
          <div>
            <img src={process.env.PUBLIC_URL + "/img/icon/Bookmark.png"} alt="bookmark" width={30} />
          </div>
        </div>
        <div className="flex p-[18px] gap-[35px] justify-center mx-auto border-b bg-white rounded-xl">
          <div className="flex gap-5">
            <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="relative w-[235px] h-[184px]">
              <img src={process.env.PUBLIC_URL + "/img/example/thumbnail.jpg"} alt="Thumbnail" className="rounded-[20px]" />
              <div className="pt-[10px] pr-[10px] top-0 right-0 absolute">
                <img src={process.env.PUBLIC_URL + "/img/example/profile.jpg"} alt="Profile" className="border-[3px] border-solid border-white rounded-full w-[30px] h-[30px]" />
              </div>
            </Link>
            <div className="w-[418px] h-[179px] flex">
              <div className="flex gap-2 flex-col">
                <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="font-bold text-2xl leading-6 text-[#353443]">
                  How to be an Ideal Engineer React JS
                  <p className="text-xl">
                    <small className="text-[#37A0C1] font-bold">React JS&#9;</small>
                    <span className="text-[#8C8B93] font-medium">|&#9;</span>
                    <small className="text-[#8E8D93]">6 min read</small>
                  </p>
                </Link>

                <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="text-[16px] text-[#57565C]">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
                </Link>
              </div>
            </div>
          </div>
          <div>
            <img src={process.env.PUBLIC_URL + "/img/icon/Bookmark.png"} alt="bookmark" width={30} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
