import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LOAD_POSTS } from "../../GraphQL/Queries";
import { useEffect, useState } from "react";
import { Query } from "../../../generated-types";

function ShowAllPost() {
  const { data } = useQuery<Query>(LOAD_POSTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      setIsLoaded(true);
    }
  }, [data]);
  return (
    <div className="flex flex-col gap-[1.25rem] mx-3">
      {isLoaded &&
        data?.ShowAllPost.map((post) => (
          <div className="flex p-[1.125rem] gap-[2.1875rem] justify-center bg-white rounded-xl box-content">
            <div className="flex gap-5">
              <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="relative min-w-[14.6875rem] max-w-[14.6875rem] sm:block hidden">
                <img src={process.env.PUBLIC_URL + "/img/example/thumbnail.jpg"} alt="Thumbnail" className="rounded-[1.25rem]" />
                <div className="pt-[0.625rem] pr-[0.625rem] top-0 right-0 absolute">
                  <img src={process.env.PUBLIC_URL + "/img/example/profile.jpg"} alt="Profile" className="border-[3px] border-solid border-white rounded-full w-8 h-8" />
                </div>
              </Link>
              <div className="max-w-[26.125rem] flex flex-col gap-2">
                <div>
                  <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="font-bold lg:text-3xl sm:text-2xl text-sm leading-6 text-[#353443]">
                    {post.title}
                  </Link>
                  <p className="sm:text-xl text-sm">
                    <small className="text-[#37A0C1] font-bold">{post.tags[0].name}&#9;</small>
                    <span className="text-[#8C8B93] font-light">|&#9;</span>
                    <small className="text-[#8E8D93]">6 min read</small>
                  </p>
                </div>

                <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="text-[#57565C] text-sm overflow-hidden">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
                </Link>
              </div>
            </div>
            <img src={process.env.PUBLIC_URL + "/img/icon/Bookmark.png"} alt="bookmark" className="w-8 h-8" />
          </div>
        ))}
    </div>
  );
}

export default ShowAllPost;
