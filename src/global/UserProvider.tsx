import { createContext, ReactNode, useContext, useReducer } from "react";
import { User } from "../lib/types";
import Reducer from "./Reducer";

let initialState: {
  user: string | null | User;
} = localStorage.getItem("user")
  ? {
      user: JSON.parse(localStorage.getItem("user") as string),
    }
  : {
      user: null,
    };

const UserContext = createContext<{ currentUser: typeof initialState; setCurrentUser: React.Dispatch<any> } | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useReducer(Reducer, initialState);
  return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
