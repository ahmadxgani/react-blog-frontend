import { useQuery } from "@apollo/client";
import { GET_POST } from "../../GraphQL/Queries";
import Output from "editorjs-react-renderer";
import { Query } from "../../../generated-types";
import Loading from "../plugins/Loading";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../../global/UserProvider";
import { Cog8ToothIcon, LinkIcon } from "@heroicons/react/24/solid";
import { ReactComponent as Twitter } from "../../icon/Twitter.svg";
import { ReactComponent as LinkedIn } from "../../icon/LinkedIn.svg";
import { ReactComponent as Facebook } from "../../icon/Facebook.svg";

function DetailPost() {
  const urlParams = useParams();

  const { data, loading } = useQuery<Query>(GET_POST, {
    variables: {
      slug: urlParams.slug,
    },
  });

  const user = useUser();

  if (loading) return <Loading />;

  const Article = () => (
    <section className="xl:prose-xl lg:prose-lg md:prose-base prose-sm prose shadow-lg px-3 rounded-lg !max-w-[43.75rem] md:px-[1.25rem]">
      <Output data={JSON.parse(data!.GetPost.content)} />
    </section>
  );

  return (
    <div className="flex flex-col w-[55.125rem] mx-3">
      <img src={process.env.PUBLIC_URL + "/img/example/thumbnail.jpg"} alt="Thumbnail" className="w-auto h-[21.125rem] rounded-t-[0.625rem]" />
      <div className="flex flex-col gap-5 lg:px-16 sm:px-9 px-4 py-[1.875rem] box-border shadow-lg rounded-b-[0.625rem]">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img src={process.env.PUBLIC_URL + "/img/example/user.jpeg"} alt="Twitter" className="w-[3.125rem] rounded-full" />
              <div className="leading-none">
                <h1 className="text-base font-semibold">{data!.GetPost.author.username}</h1>
                <span className="text-sm">
                  {new Intl.DateTimeFormat("en", {
                    dateStyle: "medium",
                  }).format(new Date(data!.GetPost.createdAt))}
                </span>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              {!!user?.currentUser.user && (
                <Link to={`/post/${data?.GetPost.slug}/edit`}>
                  <Cog8ToothIcon className="w-8" />
                </Link>
              )}
              <Twitter className="fill-base-content" width={32} />
              <LinkedIn className="fill-base-content" width={32} />
              <Facebook className="fill-base-content" width={32} />
              <LinkIcon className="w-8" />
            </div>
          </div>
          <div className="flex gap-2">
            {data!.GetPost.tags.length ? (
              data!.GetPost.tags.map((tag, id) => {
                return (
                  <span key={id} className="btn btn-primary btn-xs">
                    {tag.name}
                  </span>
                );
              })
            ) : (
              <span className="text-[#404040] bg-[#B7BDFF] px-[0.625rem] py-[0.3125rem] rounded-xl text-xs">Uncategories</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">{<Article />}</div>
      </div>
    </div>
  );
}

export default DetailPost;
