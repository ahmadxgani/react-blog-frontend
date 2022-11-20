import { Navigate } from "react-router-dom";
import { useUser } from "../../global/UserProvider";

const Register = () => {
  const user = useUser();
  if (user?.currentUser.user) {
    return <Navigate to="/dashboard/users" />;
  }

  return <p className="text-center">Register Page!</p>;
};

export default Register;
