import { gql } from "@apollo/client";

export const posts = gql`
  query {
    ShowAllPost {
      title
    }
  }
`;
