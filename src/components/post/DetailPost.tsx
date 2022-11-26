import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_POST } from "../../GraphQL/Queries";
import Output from "editorjs-react-renderer";
import { Query } from "../../../generated-types";

function DetailPost() {
  const { data } = useQuery<Query>(GET_POST, {
    variables: {
      id: 3,
    },
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      setIsLoaded(true);
    }
  }, [data]);

  const Article = () => (
    <section className="xl:prose-xl lg:prose-lg md:prose-base prose-sm prose bg-white px-3 rounded-lg shadow !max-w-[43.75rem] md:px-[1.25rem]">
      <Output data={JSON.parse(data!.GetPost.content)} />
    </section>
  );

  return (
    <div className="flex flex-col w-[55.125rem] mx-3">
      <img src={process.env.PUBLIC_URL + "/img/example/thumbnail.jpg"} alt="Thumbnail" className="w-auto h-[21.125rem] rounded-t-[0.625rem]" />
      <div className="flex flex-col gap-5 lg:px-16 sm:px-9 px-4 py-[1.875rem] box-border bg-white rounded-b-[0.625rem]">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img src={process.env.PUBLIC_URL + "/img/example/user.jpeg"} alt="Twitter" className="w-[3.125rem] rounded-full" />
              <div className="leading-none">
                <h1 className="text-base font-semibold">{isLoaded && data!.GetPost.author.username}</h1>
                <span className="text-sm">
                  {isLoaded &&
                    new Intl.DateTimeFormat("en", {
                      dateStyle: "medium",
                    }).format(new Date(data!.GetPost.createdAt))}
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              <img src={process.env.PUBLIC_URL + "/img/icon/Twitter.png"} alt="Twitter" />
              <img src={process.env.PUBLIC_URL + "/img/icon/Facebook.png"} alt="Facebook" />
              <img src={process.env.PUBLIC_URL + "/img/icon/LinkedIn.png"} alt="LinkedIn" />
              <img src={process.env.PUBLIC_URL + "/img/icon/Link.png"} alt="Copy Link" />
            </div>
          </div>
          <div className="flex gap-2">
            {isLoaded &&
              data!.GetPost.tags.map((tag, id) => {
                return (
                  <span key={id} className="text-[#404040] bg-[#B7BDFF] px-[0.625rem] py-[0.3125rem] rounded-xl text-xs">
                    {tag.name}
                  </span>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col gap-1">{isLoaded && <Article />}</div>
      </div>
    </div>
  );
}

export default DetailPost;
