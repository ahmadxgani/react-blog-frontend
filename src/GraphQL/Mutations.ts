import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($content: String!, $tags: [Int!]!, $slug: String!, $title: String!) {
    CreatePost(payload: { title: $title, content: $content, tags: $tags, slug: $slug }) {
      title
      content
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(payload: { email: $email, password: $password }) {
      token
    }
  }
`;
