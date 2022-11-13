import Editor from "../plugins/Editor";
import Tags from "../plugins/Tags";

function NewPost() {
  return (
    <div className="flex flex-col gap-3 w-[43.75rem] mx-3">
      <div className="flex justify-between">
        <button className="p-2 px-3 rounded-xl bg-[#DADDFB] text-[#5561E3] uppercase">create new article</button>
        <img className="cursor-pointer" src={process.env.PUBLIC_URL + "/img/icon/Option.png"} alt="Option" />
      </div>
      <Editor />
      <Tags />
      <div className="flex gap-5 items-center self-end mt-5">
        <p className="uppercase cursor-pointer">save as draft</p>
        <button className="p-2 rounded-xl bg-[#3B49DF] text-white uppercase">submit</button>
      </div>
    </div>
  );
}

export default NewPost;
