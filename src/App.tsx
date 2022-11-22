import UserProvider from "./global/UserProvider";
import GraphQLClient from "./components/plugins/GraphQLClient";
import { Router } from "./components/plugins/Router";

function App() {
  return (
    <UserProvider>
      <GraphQLClient>
        <Router />
      </GraphQLClient>
    </UserProvider>
  );
}

export default App;
