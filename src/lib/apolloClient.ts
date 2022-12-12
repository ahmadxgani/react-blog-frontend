import { ApolloClient, ApolloLink, InMemoryCache, concat } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const client = (token: string) => {
  const httpLink = createUploadLink({ uri: "http://localhost:3000/graphql" });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    }));

    return forward(operation);
  });

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });
  return apolloClient;
};

export default client;
