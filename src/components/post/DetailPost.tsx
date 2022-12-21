import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_LIKE, GET_POST } from "../../GraphQL/Queries";
import Output from "editorjs-react-renderer";
import { Query } from "../../../generated-types";
import Loading from "../plugins/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../global/UserProvider";
import { BookmarkIcon, Cog8ToothIcon, HandThumbUpIcon, LinkIcon } from "@heroicons/react/24/solid";
import { ReactComponent as Twitter } from "../../icon/Twitter.svg";
import { ReactComponent as LinkedIn } from "../../icon/LinkedIn.svg";
import { ReactComponent as Facebook } from "../../icon/Facebook.svg";
import useUsersPost from "../../hooks/useUsersPost";
import { useEffect, useState } from "react";
import { LIKE_POST } from "../../GraphQL/Mutations";

function DetailPost() {
  const urlParams = useParams();
  const navigate = useNavigate();
  const [totalLike, setTotalLike] = useState<number>();
  const { data, loading, refetch } = useQuery<Query>(GET_POST, {
    variables: {
      slug: urlParams.slug,
    },
    fetchPolicy: "no-cache",
  });
  const [liked] = useLazyQuery(GET_LIKE, {
    variables: {
      id: data?.GetPost.id,
    },
    fetchPolicy: "no-cache",
    onCompleted(data) {
      refetch({
        slug: urlParams.slug,
      });
      setIsLiked(data.LikedPost.isLiked);
    },
  });
  const [isLiked, setIsLiked] = useState(false);

  const [likePost] = useMutation(LIKE_POST, {
    onError(error) {
      console.log(error);
      setIsLiked(true);
    },
    onCompleted() {
      liked({
        variables: {
          id: data?.GetPost.id,
        },
      });
    },
  });

  const user = useUser();

  const isUsersPost = useUsersPost(data?.GetPost.id as number);

  useEffect(() => {
    if (!loading) {
      liked({
        variables: {
          id: data?.GetPost.id,
        },
      });
    }
  }, [loading]);

  useEffect(() => {
    if (data) {
      setTotalLike(data.GetPost.likes);
    }
  }, [data]);

  if (loading) return <Loading />;

  const Article = () => (
    <section className="xl:prose-xl lg:prose-lg md:prose-base prose-sm prose shadow-lg px-3 rounded-lg md:px-[1.25rem] !max-w-full">
      <Output data={JSON.parse(data!.GetPost.content)} />
    </section>
  );

  const handleLike = () => {
    if (!user?.currentUser.user) navigate("/login");

    likePost({
      variables: {
        id: data?.GetPost.id,
      },
    });
  };

  return (
    <>
      <div className="flex flex-col w-[55.125rem] mx-3">
        <img src={process.env.PUBLIC_URL + "/img/example/thumbnail.jpg"} alt="Thumbnail" className="object-cover h-[21.125rem] rounded-t-[0.625rem]" />
        <div className="flex flex-col gap-5 lg:px-16 sm:px-9 px-4 py-[1.875rem] box-border shadow-lg rounded-b-[0.625rem]">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <img src={data?.GetPost.author.image ? data.GetPost.author.image : process.env.PUBLIC_URL + "/img/default_user.png"} alt="Profile" className="w-[3.125rem] rounded-full" />
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
                {!!user?.currentUser.user && isUsersPost && (
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
          <Article />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center bg-primary h-fit p-3 px-2 text-white rounded-lg">
        <div className="flex items-center">
          <span>{totalLike}</span>
          <HandThumbUpIcon className={`w-7 hover:cursor-pointer ${isLiked ? "fill-black" : "fill-white"}`} onClick={handleLike} />
        </div>
        <BookmarkIcon className="w-7 hover:cursor-pointer" />
      </div>
    </>
  );
}

export default DetailPost;
