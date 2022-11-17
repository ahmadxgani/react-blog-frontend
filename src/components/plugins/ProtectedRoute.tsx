import { ReactNode } from "react";
import { Navigate, Route } from "react-router-dom";
import { useUser } from "../../global/UserProvider";

const ProtectedRoute = ({ children, ...rest }: { children: ReactNode }) => {
  const { currentUser }: any = useUser();
  return <Route {...rest}>{currentUser ? children : <Navigate to={"/login"} />}</Route>;
};

export default ProtectedRoute;
