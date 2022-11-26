import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_POST } from "../../GraphQL/Queries";

function DetailPost() {
  const { data } = useQuery(GET_POST, {
    variables: {
      id: 1,
    },
  });
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-col w-[55.125rem] mx-3">
      <img src={process.env.PUBLIC_URL + "/img/example/thumbnail.jpg"} alt="Thumbnail" className="w-auto h-[21.125rem] rounded-t-[0.625rem]" />
      <div className="flex flex-col gap-5 lg:px-16 sm:px-9 px-4 py-[1.875rem] box-border bg-white rounded-b-[0.625rem]">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img src={process.env.PUBLIC_URL + "/img/example/user.jpeg"} alt="Twitter" className="w-[3.125rem] rounded-full" />
              <div className="leading-none">
                <h1 className="text-base font-semibold">Shinigami Zero</h1>
                <span className="text-sm">Jul 13, 2022</span>
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
            <span className="text-[#404040] bg-[#B7BDFF] px-[0.625rem] py-[0.3125rem] rounded-xl text-xs">#TAGS</span>
            <span className="text-[#404040] bg-[#B7BDFF] px-[0.625rem] py-[0.3125rem] rounded-xl text-xs">#TAGS</span>
            <span className="text-[#404040] bg-[#B7BDFF] px-[0.625rem] py-[0.3125rem] rounded-xl text-xs">#TAGS</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-extrabold text-3xl">How to be an Ideal Engineer React JS</h1>
          <p className="text-[#353443] font-normal text-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley. Corrupti ullam minus, aperiam
            officiis rem fugit unde impedit commodi libero maiores quo modi aut laborum mollitia esse error, nobis voluptatem est sapiente illum! Ratione adipisci consequuntur fugit quos sit. Dolores cum ipsa impedit mollitia sit a possimus
            voluptatum omnis reprehenderit? Voluptatem ipsam ab quia odit sint itaque! Quisquam accusantium deserunt libero et totam sequi suscipit ut numquam necessitatibus aspernatur. Nisi, veritatis consequatur neque praesentium
            aspernatur, ea maiores doloribus dicta tempore officia beatae quis quisquam molestiae. Voluptatem ipsam ab quia odit sint itaque! Quisquam accusantium deserunt libero et totam sequi suscipit ut numquam necessitatibus aspernatur.
            Nisi, veritatis consequatur neque praesentium aspernatur, ea maiores doloribus dicta tempore officia beatae quis quisquam molestiae, Voluptatem ipsam ab quia odit sint itaque! Quisquam accusantium deserunt libero et totam sequi
            suscipit ut numquam necessitatibus aspernatur. Nisi, veritatis consequatur neque praesentium aspernatur, ea maiores doloribus dicta tempore officia beatae quis quisquam molestiae.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailPost;
