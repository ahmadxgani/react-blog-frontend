import { Link } from "react-router-dom";

function Main() {
  return (
    <main>
      <div className="flex w-[982px] h-[307px] justify-between p-5 box-content mx-auto border-b">
        <div className=" w-3/4 flex flex-col justify-between">
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-2">
              <div className="rounded-full w-[43px] h-[43px] bg-slate-500" />
              <p>
                Shinigami Zero<span className="mx-1">&#x2219;</span>Jul 13
              </p>
            </div>
            <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1">
              <h2 className="font-bold text-xl">Title Lorem Ipsum</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quis enim numquam tempore totam, rerum est, veniam quam eligendi error fugiat blanditiis, doloribus nihil? Qui possimus natus facilis esse ea. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Iure non ab quia velit adipisci neque dignissimos autem? Ad neque quas aut minima, obcaecati aspernatur, molestias at molestiae perferendis nihil qui.
              </p>
            </Link>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="bg-slate-200 rounded-lg p-1">programming</div>
              <span>2 menit yang lalu</span>
            </div>
            <div className="flex gap-2">
              <img src={process.env.PUBLIC_URL + "/Bookmark.png"} alt="bookmark" width={28} />
              <span className="font-bold text-lg">&#x2219;&#x2219;&#x2219;</span>
            </div>
          </div>
        </div>
        <Link to="/post/26be68a2-ec55-4fc7-bcae-3eb8d89929e1" className="w-[235px] h-[195px] bg-slate-500 flex items-center justify-center rounded-[30px] self-center">
          <h2 className="font-black">Thumbnail</h2>
        </Link>
      </div>
    </main>
  );
}

export default Main;
