import { gql } from "@apollo/client";

export const LOAD_POSTS = gql`
  type Post {
    author: Author!
    content: String!
    createdAt: DateTime!
    likes: Int!
    tags: [Tag!]!
    title: String!
    updatedAt: DateTime!
  }
  query {
    ShowAllPost: [Post!]!
  }
`;
