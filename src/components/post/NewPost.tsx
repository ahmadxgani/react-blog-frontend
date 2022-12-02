import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mutation, Query } from "../../../generated-types";
import { useUser } from "../../global/UserProvider";
import { CREATE_POST, EDIT_POST } from "../../GraphQL/Mutations";
import { GET_POST, LOAD_POSTS_BY_AUTHOR, SHOW_ALL_TAGS } from "../../GraphQL/Queries";
import { HandleData, tags, User } from "../../lib/types";
import Editor from "../plugins/Editor";
import Loading from "../plugins/Loading";
import Tags from "../plugins/Tags";

function NewPost({ editPost = null, tags = null }: { editPost?: (HandleData & { slug: string; id: number }) | null; tags?: tags[] | null }) {
  const navigate = useNavigate();
  const [data, setData] = useState<HandleData | null>(() => editPost);
  const [isGenerated, setIsGenerated] = useState(false);
  const inputSlug = useRef<HTMLInputElement | null>();
  const checkboxSlug = useRef<HTMLInputElement | null>();
  const user = useUser();
  const [inputTags, setTags] = useState<tags[]>(() => tags || []);
  const [createOrUpdatePost] = useMutation<Mutation>(editPost ? EDIT_POST : CREATE_POST, {
    update: (cache, _, { variables }) => {
      const existingPost = cache.readQuery<Query>({
        query: GET_POST,
        variables: {
          slug: variables?.slug,
        },
      });

      const existingAuthorPosts = cache.readQuery<Query>({
        query: LOAD_POSTS_BY_AUTHOR,
        variables: {
          id: (user?.currentUser.user as User).id,
        },
      });

      if (existingAuthorPosts) {
        cache.writeQuery({
          query: LOAD_POSTS_BY_AUTHOR,
          data: {
            GetAuthorById: {
              posts: editPost
                ? [
                    ...existingAuthorPosts.GetAuthorById.posts.filter(() => existingAuthorPosts.GetAuthorById.posts.findIndex((post) => post.id !== variables?.id)),
                    {
                      title: variables?.title,
                      slug: _.data!.UpdatePost.slug,
                      tags: inputTags.map((tag) => ({ name: tag.name })),
                    },
                  ]
                : [
                    ...existingAuthorPosts.GetAuthorById.posts,
                    {
                      title: variables?.title,
                      slug: _.data?.CreatePost.slug,
                      tags: inputTags.map((tag) => ({ name: tag.name })),
                    },
                  ],
            },
          },
          variables: {
            id: (user?.currentUser.user as User).id,
          },
        });
      }

      if (existingPost) {
        cache.writeQuery({
          query: GET_POST,
          data: {
            GetPost: {
              ...existingPost.GetPost,
              ...variables,
              tags: inputTags,
            },
          },
          variables: {
            slug: variables?.slug,
          },
        });
      }
    },
  });
  const { data: suggestions, loading } = useQuery(SHOW_ALL_TAGS);

  const handleData = (newData: HandleData) => {
    setData(newData);
  };

  const handleIsGenerated = () => {
    setIsGenerated(!isGenerated);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (data) {
      const response = await createOrUpdatePost({
        variables: JSON.parse(
          JSON.stringify({
            ...data,
            id: editPost?.id,
            slug: inputSlug.current?.value,
            tags: inputTags.length ? inputTags.map((tag) => tag.id) : undefined,
          })
        ),
      });
      navigate(`/post/${editPost ? response!.data!.UpdatePost.slug : response!.data!.CreatePost.slug}`);
    }
  };

  useEffect(() => {
    if (isGenerated && !!inputSlug.current && !!data?.title) {
      inputSlug.current.value = Slugify(data.title);
    }
  }, [isGenerated]);

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
      <input ref={(element) => (inputSlug.current = element)} id="slug" type="text" className="p-1 rounded-lg focus:outline-none" defaultValue={editPost?.slug} disabled={isGenerated} />
      <div className="flex">
        <input type="checkbox" onChange={handleIsGenerated} />
        <span>generate slug from title</span>
      </div>
      <div className="flex gap-5 items-center self-end mt-5">
        <p className="uppercase cursor-pointer">save as draft</p>
        <button className="p-1 px-2 rounded-xl bg-[#3B49DF] text-white uppercase disabled:bg-[#212da9]" onClick={handleClick} disabled={!data}>
          submit
        </button>
      </div>
    </div>
  );
}

function Slugify(title: string) {
  return title
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default NewPost;
