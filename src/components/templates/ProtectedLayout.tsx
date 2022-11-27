import { useNavigate, useOutlet } from "react-router-dom";
import { useUser } from "../../global/UserProvider";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const user = useUser();
  const outlet = useOutlet();

  if (!user?.currentUser.user) {
    navigate("/");
  }

  return <>{outlet}</>;
};

export default ProtectedLayout;
