import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CREATE_POST } from "../../GraphQL/Mutations";
import { SHOW_ALL_TAGS } from "../../GraphQL/Queries";
import { HandleData, tags } from "../../lib/types";
import Editor from "../plugins/Editor";
import Tags from "../plugins/Tags";

function NewPost() {
  const [data, setData] = useState<null | HandleData>(null);
  const [submit, setSubmit] = useState(false);
  const [tags, setTags] = useState<tags[]>([]);
  const [createPost] = useMutation(CREATE_POST);
  const { data: suggestions } = useQuery(SHOW_ALL_TAGS);
  const [tagsIsReady, setTagsIsReady] = useState(false);

  const handleData = (newData: HandleData) => {
    setData(newData);
  };

  const handleClick = () => {
    setSubmit(true);
  };

  const handleTags = (tags: tags[]) => {
    setTags(tags);
  };

  useEffect(() => {
    (async () => {
      if (data && submit) {
        const response = await createPost({
          variables: {
            ...data,
            tags: tags.length ? tags.map((tag) => tag.id) : 8,
          },
        });
        console.log(response);

        setSubmit(false);
      }
    })();
  }, [submit]);

  useEffect(() => {
    if (suggestions) {
      setTagsIsReady(true);
    }
  }, [suggestions]);

  return (
    <div className="flex flex-col gap-3 w-[43.75rem] mx-3">
      <div className="flex justify-between">
        <button className="p-2 px-3 rounded-xl bg-[#DADDFB] text-[#5561E3] uppercase">create new article</button>
        <img className="cursor-pointer" src={process.env.PUBLIC_URL + "/img/icon/Option.png"} alt="Option" />
      </div>
      <Editor handleData={handleData} submitted={submit} />
      {tagsIsReady && <Tags suggestions={suggestions.ShowAllTag} submitted={submit} handleTags={handleTags} />}
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
