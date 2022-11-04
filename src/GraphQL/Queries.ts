import { gql } from "@apollo/client";

export const posts = gql`
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
