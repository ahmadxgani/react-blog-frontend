import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/templates/Navigation";
import Main from "./components/templates/Main";
import UserProvider from "./global/UserProvider";
import GraphQLClient from "./components/plugins/GraphQLClient";

function App() {
  return (
    <>
      <UserProvider>
        <GraphQLClient>
          <BrowserRouter>
            <Navigation />
            <Main />
          </BrowserRouter>
        </GraphQLClient>
      </UserProvider>
    </>
  );
}

export default App;
