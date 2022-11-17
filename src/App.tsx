import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/templates/Navigation";
import Main from "./components/templates/Main";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import UserProvider from "./global/UserProvider";

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
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJsZWxvdWNoIiwicm9sZSI6MCwiZW1haWwiOiJhZG1pbkBzLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGJFODJ0OC9QNTVEV2FlcVMveTNRVHU2VTQzcTloNWRGaHBZMDNHWkFYb0N5UFNhaGFJVm9lIiwiY3JlYXRlZEF0IjoiMjAyMi0wOS0zMFQxMzoyNzo1Mi4wNTNaIiwidXBkYXRlZEF0IjoiMjAyMi0wOS0zMFQxMzoyODozNi45NzNaIiwiaWF0IjoxNjY3NTYxNTE5LCJleHAiOjE2OTkxMTkxMTl9.ICdEoUZBRU0g9Ghp7gz3Ea0CEC0UwX5G9AI9akESsSw",
    },
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function App() {
  return (
    <>
      <UserProvider user={""}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Navigation />
            <Main />
          </BrowserRouter>
        </ApolloProvider>
      </UserProvider>
    </>
  );
}

export default App;
