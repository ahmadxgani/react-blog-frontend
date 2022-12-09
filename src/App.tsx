import UserProvider from "./global/UserProvider";
import GraphQLClient from "./components/plugins/GraphQLClient";
import { Router } from "./components/plugins/Router";
import ThemeProvider from "./global/ThemeProvider";

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <GraphQLClient>
          <Router />
        </GraphQLClient>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
