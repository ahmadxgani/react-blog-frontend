import { useEffect } from "react";
import { useNavigate, useOutlet } from "react-router-dom";
import { useUser } from "../../global/UserProvider";

const AuthLayout = () => {
  const user = useUser();
  const outlet = useOutlet();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.currentUser.user) {
      navigate("/profile");
    }
  }, []);

  return <div className="bg-[#E6E5F3] min-h-screen h-full flex items-center justify-center">{outlet}</div>;
};

export default AuthLayout;
