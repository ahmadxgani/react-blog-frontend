import { useMutation, useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mutation, Query } from "../../../generated-types";
import { CREATE_POST, EDIT_POST } from "../../GraphQL/Mutations";
import { GET_POST, SHOW_ALL_TAGS } from "../../GraphQL/Queries";
import { HandleData, tags } from "../../lib/types";
import Editor from "../plugins/Editor";
import Loading from "../plugins/Loading";
import Tags from "../plugins/Tags";

function NewPost({ editPost = null, tags = null }: { editPost?: (HandleData & { slug: string; id: number }) | null; tags?: tags[] | null }) {
  const navigate = useNavigate();
  const [data, setData] = useState<HandleData | null>(() => editPost);
  const input = useRef<HTMLInputElement | null>();
  const [inputTags, setTags] = useState<tags[]>(() => tags || []);
  const [createOrUpdatePost] = useMutation<Mutation>(editPost ? EDIT_POST : CREATE_POST, {
    update: (cache, _, { variables }) => {
      const existingPost = cache.readQuery<Query>({
        query: GET_POST,
        variables: {
          id: variables?.id,
        },
      });

      if (existingPost) {
        cache.writeQuery({
          query: GET_POST,
          data: {
            GetPost: {
              ...existingPost.GetPost,
              ...variables,
              tags: inputTags.map((tag) => ({ ...tag, __typename: "Tag" })),
            },
          },
          variables: {
            id: variables?.id,
          },
        });
      }
    },
  });
  const { data: suggestions, loading } = useQuery(SHOW_ALL_TAGS);

  const handleData = (newData: HandleData) => {
    setData(newData);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (data) {
      const response = await createOrUpdatePost({
        variables: JSON.parse(
          JSON.stringify({
            ...data,
            id: editPost?.id,
            slug: input.current?.value,
            tags: inputTags.length ? inputTags.map((tag) => tag.id) : undefined,
          })
        ),
      });
      navigate(`/post/${editPost ? response!.data!.UpdatePost.slug : response!.data!.CreatePost.slug}`);
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="flex flex-col gap-3 w-[43.75rem] mx-3">
      <div className="flex justify-between">
        <button className="p-2 px-3 rounded-xl bg-[#DADDFB] text-[#5561E3] uppercase">{(editPost ? "edit " : "create new ") + "article"}</button>
        <img className="cursor-pointer" src={process.env.PUBLIC_URL + "/img/icon/Option.png"} alt="Option" />
      </div>
      <Editor handleData={handleData} content={data?.content} />
      {<Tags suggestions={suggestions.ShowAllTag} setTags={setTags} tags={inputTags} />}
      <label htmlFor="slug">Slug</label>
      <input ref={(element) => (input.current = element)} id="slug" type="text" className="p-1 rounded-lg focus:outline-none" defaultValue={editPost?.slug} />
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
