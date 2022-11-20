import { Navigate, useOutlet } from "react-router-dom";
import { useUser } from "../../global/UserProvider";

const ProtectedLayout = () => {
  const user = useUser();
  const outlet = useOutlet();

  if (!user?.currentUser.user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {outlet}
    </>
  );
};

export default ProtectedLayout;
