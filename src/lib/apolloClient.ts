import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from "@apollo/client";

const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }));

  return forward(operation);
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default apolloClient;
