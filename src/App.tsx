import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/templates/Navigation";
import Main from "./components/templates/Main";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});
const link = from([
  errorLink,
  new HttpLink({
    uri: "http://localhost:3000/graphql",
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Navigation />
          <Main />
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
