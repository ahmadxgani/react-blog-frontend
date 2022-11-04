import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LOAD_POSTS } from "../../GraphQL/Queries";
import { useEffect } from "react";

function ShowAllPost() {
  const { error, loading, data } = useQuery(LOAD_POSTS);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="flex flex-col gap-[1.25rem] mt-[3.125rem]">
      <div className="flex p-[1.125rem] gap-[2.1875rem] justify-center mx-auto border-b bg-white rounded-xl">
        <div className="flex gap-5">
          <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="relative w-[14.6875rem]">
            <img src={process.env.PUBLIC_URL + "/img/example/thumbnail.jpg"} alt="Thumbnail" className="rounded-[1.25rem]" />
            <div className="pt-[0.625rem] pr-[0.625rem] top-0 right-0 absolute">
              <img src={process.env.PUBLIC_URL + "/img/example/profile.jpg"} alt="Profile" className="border-[3px] border-solid border-white rounded-full w-[1.875rem] h-[1.875rem]" />
            </div>
          </Link>
          <div className="w-[26.125rem] h-[11rem] flex">
            <div className="flex gap-2 flex-col">
              <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="font-bold text-2xl leading-6 text-[#353443]">
                How to be an Ideal Engineer React JS
                <p className="text-xl">
                  <small className="text-[#37A0C1] font-bold">React JS&#9;</small>
                  <span className="text-[#8C8B93] font-medium">|&#9;</span>
                  <small className="text-[#8E8D93]">6 min read</small>
                </p>
              </Link>

              <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="text-[#57565C]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + "/img/icon/Bookmark.png"} alt="bookmark" width={30} />
        </div>
      </div>

      <div className="flex p-[1.125rem] gap-[2.1875rem] justify-center mx-auto border-b bg-white rounded-xl">
        <div className="flex gap-5">
          <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="relative w-[14.6875rem]">
            <img src={process.env.PUBLIC_URL + "/img/example/thumbnail.jpg"} alt="Thumbnail" className="rounded-[1.25rem]" />
            <div className="pt-[0.625rem] pr-[0.625rem] top-0 right-0 absolute">
              <img src={process.env.PUBLIC_URL + "/img/example/profile.jpg"} alt="Profile" className="border-[3px] border-solid border-white rounded-full w-[1.875rem] h-[1.875rem]" />
            </div>
          </Link>
          <div className="w-[26.125rem] h-[11rem] flex">
            <div className="flex gap-2 flex-col">
              <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="font-bold text-2xl leading-6 text-[#353443]">
                How to be an Ideal Engineer React JS For Beginner
                <p className="text-xl">
                  <small className="text-[#37A0C1] font-bold">React JS&#9;</small>
                  <span className="text-[#8C8B93] font-medium">|&#9;</span>
                  <small className="text-[#8E8D93]">6 min read</small>
                </p>
              </Link>

              <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="text-[#57565C]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + "/img/icon/Bookmark.png"} alt="bookmark" width={30} />
        </div>
      </div>

      <div className="flex p-[1.125rem] gap-[2.1875rem] justify-center mx-auto border-b bg-white rounded-xl">
        <div className="flex gap-5">
          <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="relative w-[14.6875rem]">
            <img src={process.env.PUBLIC_URL + "/img/example/thumbnail.jpg"} alt="Thumbnail" className="rounded-[1.25rem]" />
            <div className="pt-[0.625rem] pr-[0.625rem] top-0 right-0 absolute">
              <img src={process.env.PUBLIC_URL + "/img/example/profile.jpg"} alt="Profile" className="border-[3px] border-solid border-white rounded-full w-[1.875rem] h-[1.875rem]" />
            </div>
          </Link>
          <div className="w-[26.125rem] h-[11rem] flex">
            <div className="flex gap-2 flex-col">
              <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="font-bold text-2xl leading-6 text-[#353443]">
                How to be an Ideal Engineer React JS For Beginner
                <p className="text-xl">
                  <small className="text-[#37A0C1] font-bold">React JS&#9;</small>
                  <span className="text-[#8C8B93] font-medium">|&#9;</span>
                  <small className="text-[#8E8D93]">6 min read</small>
                </p>
              </Link>

              <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="text-[#57565C]">
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
  );
}

export default ShowAllPost;
