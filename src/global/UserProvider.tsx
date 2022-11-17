import { createContext, ReactNode, useContext, useState } from "react";

const UserContext = createContext<{ currentUser: any; setCurrentUser: any } | null>(null);

const UserProvider = ({ user, children }: { user: any; children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(user);
  return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
