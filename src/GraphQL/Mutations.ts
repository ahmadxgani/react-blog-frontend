import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost(
    $article: String!,
    $tags: [String!]!,
    $slug: String!
  ) {
    createPost(
        article: $article,
        tags: $tags,
        slug: $slug
    ) {
        slug
        article,
        tags
      }
  }
`;
