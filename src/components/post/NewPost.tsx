import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mutation } from "../../../generated-types";
import { CREATE_POST } from "../../GraphQL/Mutations";
import { SHOW_ALL_TAGS } from "../../GraphQL/Queries";
import { HandleData, tags } from "../../lib/types";
import Editor from "../plugins/Editor";
import Loading from "../plugins/Loading";
import Tags from "../plugins/Tags";

function NewPost() {
  const navigate = useNavigate();
  const [data, setData] = useState<HandleData>();
  const [tags, setTags] = useState<tags[]>([]);
  const [createPost] = useMutation<Mutation>(CREATE_POST);
  const { data: suggestions, loading } = useQuery(SHOW_ALL_TAGS);

  const handleData = (newData: HandleData) => {
    setData(newData);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (data) {
      const response = await createPost({
        variables: JSON.parse(
          JSON.stringify({
            ...data,
            tags: tags.length ? tags.map((tag) => tag.id) : undefined,
          })
        ),
      });
      navigate(`/post/${response!.data!.CreatePost.slug}`);
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="flex flex-col gap-3 w-[43.75rem] mx-3">
      <div className="flex justify-between">
        <button className="p-2 px-3 rounded-xl bg-[#DADDFB] text-[#5561E3] uppercase">create new article</button>
        <img className="cursor-pointer" src={process.env.PUBLIC_URL + "/img/icon/Option.png"} alt="Option" />
      </div>
      <Editor handleData={handleData} />
      {<Tags suggestions={suggestions.ShowAllTag} setTags={setTags} tags={tags} />}
      <div className="flex gap-5 items-center self-end mt-5">
        <p className="uppercase cursor-pointer">save as draft</p>
        <button className="p-1 px-2 rounded-xl bg-[#3B49DF] text-white uppercase" onClick={handleClick}>
          submit
        </button>
      </div>
    </div>
  );
}

export default NewPost;
