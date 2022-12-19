import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LOAD_POSTS } from "../../GraphQL/Queries";
import { Query } from "../../../generated-types";
import Loading from "../plugins/Loading";
import { BookmarkIcon } from "@heroicons/react/24/solid";

function ShowAllPost() {
  const { data, loading } = useQuery<Query>(LOAD_POSTS, {
    fetchPolicy: "no-cache",
  });
  if (loading) return <Loading />;
  return (
    <div className="flex flex-col gap-[1.25rem] mx-3">
      {data?.ShowAllPost.length ? (
        data?.ShowAllPost.map((post, i) => (
          <div key={i} className="flex p-[1.125rem] gap-[2.1875rem] items-start bg-white rounded-xl box-content">
            <div className="flex gap-5">
              <Link to={`/post/${post.slug}`} className="relative min-w-[14.6875rem] max-w-[14.6875rem] sm:block hidden">
                <img src={process.env.PUBLIC_URL + "/img/example/thumbnail.jpg"} alt="Thumbnail" className="rounded-[1.25rem]" />
                <div className="pt-[0.625rem] pr-[0.625rem] top-0 right-0 absolute">
                  <img src={post.author.image ? post.author.image : process.env.PUBLIC_URL + "/img/default_user.png"} alt="Profile" className="border-[3px] border-solid border-white rounded-full w-8 h-8" />
                </div>
              </Link>
              <div className="max-w-[26.125rem] flex flex-col gap-2">
                <div>
                  <Link to={`/post/${post.slug}`} className="font-bold lg:text-3xl sm:text-2xl text-sm leading-6 text-[#353443]">
                    {post.title}
                  </Link>
                  <p className="sm:text-xl text-sm">
                    <small className="text-[#37A0C1] font-bold">{post.tags[0] ? post.tags[0].name : "Uncategories"}&#9;</small>
                    <span className="text-[#8C8B93] font-light">|&#9;</span>
                    <small className="text-[#8E8D93]">6 min read</small>
                  </p>
                </div>

                <Link to={`/post/${post.slug}`} className="text-[#57565C] text-sm overflow-hidden">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
                </Link>
              </div>
            </div>
            <BookmarkIcon className="w-8" />
          </div>
        ))
      ) : (
        <div className="card w-96 bg-base-100 shadow-xl card-normal">
          <div className="card-body">
            <h2 className="card-title">Belum ada artikel.</h2>
            <p>Mulailah membuat artikel!</p>
            <div className="card-actions justify-end">
              <Link to="/post" className="btn btn-primary">
                Buat artikel
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowAllPost;
