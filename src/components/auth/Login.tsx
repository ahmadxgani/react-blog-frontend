import { useLazyQuery } from "@apollo/client";
import { FormEventHandler, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Query } from "../../../generated-types";
import { useUser } from "../../global/UserProvider";
import { LOGIN } from "../../GraphQL/Queries";
import Loading from "../plugins/Loading";

const Login = () => {
  const [fetchToken, { loading, data }] = useLazyQuery<Query>(LOGIN);
  const navigate = useNavigate();
  const user = useUser();
  const location = useLocation();
  const [email, setEmail] = useState(() => location.state?.email);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user?.currentUser.user) {
      navigate("/dashboard/users");
    }
  }, []);

  if (loading) return <Loading />;

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        await fetchToken({
          variables: {
            email,
            password,
          },
        });
        user!.setCurrentUser({
          type: "login",
          payload: {
            user: {
              id: data!.login.id,
              token: data!.login.token,
              username: data!.login.username,
              email: data!.login.email,
            },
          },
        });
        navigate("/dashboard/users");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="on" />
      <div className="flex gap-1">
        <label htmlFor="rememberme">Remember me</label>
        <input type="checkbox" name="rememberme" id="rememberme" />
      </div>
      <p>
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
      <Link to="/recovery-password">Forgot password?</Link>
      <button>Submit</button>
    </form>
  );
};

export default Login;
