import { Navigate } from "react-router-dom";
import { useUser } from "../../global/UserProvider";

const Logout = () => {
  const auth = useUser();
  auth?.setCurrentUser({ type: "logout" });
  return <Navigate to="/login" />;
};
export default Logout;
