import { createContext, ReactNode, useContext, useReducer } from "react";
import Reducer from "./Reducer";

let initialState: {
  user: string | null;
  token: string | null;
} = {
  user: null,
  token: null,
};

const parse = () => {
  try {
    initialState = localStorage.getItem("user")
      ? {
          user: JSON.parse(localStorage.getItem("user") as string),
          token: localStorage.getItem("token"),
        }
      : initialState;
  } catch (e) {
    console.log(e);
  }
};
parse();

const UserContext = createContext<{ currentUser: typeof initialState; setCurrentUser: React.Dispatch<any> } | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useReducer(Reducer, initialState);
  return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
