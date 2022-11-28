import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Query } from "../../../generated-types";
import { GET_POST } from "../../GraphQL/Queries";
import Loading from "../plugins/Loading";
import NewPost from "./NewPost";

function EditPost() {
  const urlParams = useParams();
  const { data, loading } = useQuery<Query>(GET_POST, {
    variables: {
      slug: urlParams.slug,
    },
  });

  if (loading) return <Loading />;

  const filteredData = {
    title: data!.GetPost.title,
    content: data!.GetPost.content,
    slug: data!.GetPost.slug,
  };

  return <NewPost tags={data!.GetPost.tags.map((tag) => ({ id: tag.id, name: tag.name }))} editPost={filteredData} />;
}

export default EditPost;
