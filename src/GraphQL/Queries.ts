import { gql } from "@apollo/client";

export const GET_POST = gql`
  query GetPost($id: Int!) {
    GetPost(payload: { id: $id }) {
      author {
        username
      }
      title
      content
      slug
      createdAt
      updatedAt
      tags {
        name
      }
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

export const SHOW_ALL_USERS = gql`
  query ShowAllUsers {
    ShowAllAuthor {
      username
      email
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
