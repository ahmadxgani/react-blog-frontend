import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/templates/Navigation";
import Main from "./components/templates/Main";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Main />
      </BrowserRouter>
    </>
  );
}

export default App;
