import { useQuery } from "@apollo/client";
import { Query } from "../../generated-types";
import Loading from "../components/plugins/Loading";
import { useUser } from "../global/UserProvider";
import { LOAD_POSTS_BY_AUTHOR } from "../GraphQL/Queries";
import { User } from "../lib/types";

function useUsersPost(idPost: number) {
  const user = useUser();
  const { data: usersPost, loading } = useQuery<Query>(LOAD_POSTS_BY_AUTHOR, {
    variables: {
      id: (user?.currentUser.user as User)?.id,
    },
    skip: user?.currentUser.user === null,
  });

  if (!user?.currentUser.user) return false;
  if (loading) return <Loading />;

  if (usersPost?.GetAuthorById.posts.length) {
    return usersPost?.GetAuthorById.posts.some((post) => post.id === idPost);
  }
}

export default useUsersPost;
