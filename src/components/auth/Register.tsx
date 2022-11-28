import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../global/UserProvider";

const Register = () => {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.currentUser.user) {
      navigate("/dashboard/users");
    }
  }, []);

  return <p className="text-center">Register Page!</p>;
};

export default Register;
