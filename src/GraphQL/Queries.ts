import { gql } from "@apollo/client";

export const GET_POST = gql`
  query GetPost($slug: String!) {
    GetPost(payload: { slug: $slug }) {
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
      id
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
