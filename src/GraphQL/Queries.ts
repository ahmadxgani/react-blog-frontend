import { gql } from "@apollo/client";

export const LOAD_POSTS = gql`
  query {
    ShowAllPost {
      title
    }
  }
`;

export const SHOW_ALL_USERS = gql`
  query {
    ShowAllAuthor {
      username
      email
    }
  }
`;

export const SHOW_ALL_TAGS = gql`
  query {
    ShowAllTag {
      name
      id
    }
  }
`;
