import { createContext, ReactNode, useContext, useReducer, useState } from "react";
import Reducer from "./Reducer";

let initialState: {
  isLoggedIn: boolean;
  user: string | null;
  token: string | null;
} = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const parse = () => {
  try {
    initialState = localStorage.getItem("user")
      ? {
          user: JSON.parse(localStorage.getItem("user") as string),
          token: localStorage.getItem("token"),
          isLoggedIn: true,
        }
      : initialState;
  } catch (e) {
    console.log(e);
  }
};
parse();

const UserContext = createContext<{ currentUser: any; setCurrentUser: any } | null>(null);
const UserProvider = ({ user, children }: { user: any; children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useReducer(Reducer, initialState);
  return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
