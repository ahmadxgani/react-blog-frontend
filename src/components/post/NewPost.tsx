import Editor from "../templates/Editor";

function NewPost() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between mx-3">
        <button className="p-2 px-3 rounded-xl bg-[#DADDFB] text-[#5561E3] uppercase">create new article</button>
        <img className="cursor-pointer" src={process.env.PUBLIC_URL + "/img/icon/Option.png"} alt="Option" />
      </div>
      <input className="rounded-xl w-full md:w-[43.75rem] md:px-[1.25rem] p-3 mx-3 focus:outline-none" type="text" placeholder="add up to 5 tags..." />
      <Editor />
      <div className="flex gap-2 items-center self-end mx-3">
        <p className="uppercase cursor-pointer">save as draft</p>
        <button className="p-2 rounded-xl bg-[#3B49DF] text-white uppercase">submit</button>
      </div>
    </div>
  );
}

export default NewPost;
