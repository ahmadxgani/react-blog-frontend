import { gql } from "@apollo/client";

export const GET_POST = gql`
  query GetPost($slug: String!) {
    GetPost(payload: { slug: $slug }) {
      id
      author {
        username
      }
      title
      content
      slug
      createdAt
      updatedAt
      tags {
        id
        name
      }
    }
  }
`;

export const GET_ROLE = gql`
  query GetRole($id: Int!) {
    GetAuthorById(payload: { id: $id }) {
      role
    }
  }
`;

export const LOAD_POSTS = gql`
  query LoadPosts {
    ShowAllPost {
      title
      slug
      tags {
        name
      }
    }
  }
`;

export const LOAD_POSTS_BY_AUTHOR = gql`
  query LoadPostsByAuthor($id: Int!) {
    GetAuthorById(payload: { id: $id }) {
      posts {
        id
        title
        slug
        tags {
          name
        }
      }
    }
  }
`;

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(payload: { email: $email, password: $password }) {
      id
      token
      username
      email
    }
  }
`;

export const SHOW_ALL_USERS = gql`
  query ShowAllUsers {
    ShowAllAuthor {
      id
      username
      email
      role
    }
  }
`;

export const SHOW_ALL_TAGS = gql`
  query ShowAllTags {
    ShowAllTag {
      name
      id
    }
  }
`;
