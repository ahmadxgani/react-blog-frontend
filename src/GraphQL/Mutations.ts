import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($content: String!, $tags: [Int!], $slug: String!, $title: String!) {
    CreatePost(payload: { title: $title, content: $content, tags: $tags, slug: $slug }) {
      slug
    }
  }
`;

export const EDIT_POST = gql`
  mutation UpdatePost($content: String!, $tags: [Int!], $slug: String!, $title: String!, $id: Int!) {
    UpdatePost(payload: { title: $title, content: $content, tags: $tags, slug: $slug, id: $id }) {
      slug
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($slug: String!) {
    DeletePost(payload: { slug: $slug }) {
      success
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(payload: { email: $email, password: $password }) {
      id
      token
      username
      email
    }
  }
`;

export const REGISTER = gql`
  mutation createAuthor($username: String!, $password: String!, $email: String!) {
    CreateAuthor(payload: { username: $username, password: $password, email: $email }) {
      email
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
      id
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateAuthor($id: Int!, $username: String!) {
    UpdateAuthor(payload: { id: $id, username: $username }) {
      id
      username
      email
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
