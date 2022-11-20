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

export const CREATE_TAG = gql`
  mutation CreateTag($name: String!) {
    CreateTag(payload: { name: $name }) {
      name
      id
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation UpdateTag($id: Int!, $name: String!) {
    UpdateTag(payload: { id: $id, name: $name }) {
      name
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($id: Int!) {
    DeleteTag(payload: { id: $id }) {
      success
    }
  }
`;
