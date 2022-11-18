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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOjAsImVtYWlsIjoiYWRtaW5AbWUuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkVnpZbUFmZWdQUTBmUE84S3p6aHI3T0N6Y2pKSjQyNHNERjNKZXZ0UUw3WkFDUGlza3dsM3kiLCJjcmVhdGVkQXQiOiIyMDIyLTExLTE2VDIzOjE2OjI2LjUzMVoiLCJ1cGRhdGVkQXQiOiIyMDIyLTExLTE2VDIzOjE2OjI2LjUzMVoiLCJwb3N0cyI6W10sImlhdCI6MTY2ODY0MDU5NiwiZXhwIjoxNzAwMTk4MTk2fQ.XZ8o2I8nTqyGA8z3vIRyVDmAmEevUlqwcF5QS1l_S6w",
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
