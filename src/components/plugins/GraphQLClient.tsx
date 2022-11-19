import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";
import { useUser } from "../../global/UserProvider";
import apolloClient from "../../lib/apolloClient";

const GraphQLClient = ({ children }: { children: ReactNode }) => {
  const auth = useUser();
  return <ApolloProvider client={apolloClient(auth?.currentUser.token as string)}>{children}</ApolloProvider>;
};

export default GraphQLClient;
