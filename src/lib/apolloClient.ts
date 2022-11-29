import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from "@apollo/client";

const client = (token: string) => {
  const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

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
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            ShowAllTags: {
              keyArgs: [],
              merge(existing, incoming, { args }) {
                console.log(args?.offset, existing, incoming);

                // Slicing is necessary because the existing data is
                // immutable, and frozen in development.
                // const merged = existing ? existing.slice(0) : [];
                // for (let i = 0; i < incoming.length; ++i) {
                //   merged[(args?.offset || 0) + i] = incoming[i];
                // }
                // return merged;
              },
            },
          },
        },
      },
    }),
    link: concat(authMiddleware, httpLink),
  });
  return apolloClient;
};

export default client;
