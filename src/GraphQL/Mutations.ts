import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!,
    $content: String!,
    $tags: [String!]!,
    $slug: String!
  ) {
    createPost(
        title: $title,
        content: $content,
        tags: $tags,
        slug: $slug
    ) {
        title
        slug
        content,
        tags
      }
  }
`;
