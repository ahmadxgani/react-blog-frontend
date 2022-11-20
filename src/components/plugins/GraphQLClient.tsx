import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";
import { useUser } from "../../global/UserProvider";
import apolloClient from "../../lib/apolloClient";
import { User } from "../../lib/types";

const GraphQLClient = ({ children }: { children: ReactNode }) => {
  const auth = useUser();

  return <ApolloProvider client={apolloClient(auth?.currentUser.user ? (auth?.currentUser.user as User).token : "")}>{children}</ApolloProvider>;
};

export default GraphQLClient;
