import { useLazyQuery } from "@apollo/client";
import { FormEventHandler, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Query } from "../../../generated-types";
import { useUser } from "../../global/UserProvider";
import { LOGIN } from "../../GraphQL/Queries";
import Loading from "../plugins/Loading";

const Login = () => {
  const navigate = useNavigate();
  const user = useUser();
  const location = useLocation();
  const [email, setEmail] = useState(() => location.state?.email || "");
  const [password, setPassword] = useState("");
  const [fetchToken, { loading, called }] = useLazyQuery<Query>(LOGIN, {
    onCompleted(data) {
      user!.setCurrentUser({
        type: "login",
        payload: {
          user: {
            id: data.login.id,
            token: data.login.token,
            username: data.login.username,
            email: data.login.email,
          },
        },
      });
      navigate("/profile");
    },
  });

  useEffect(() => {
    if (user?.currentUser.user) {
      navigate("/profile");
    }
  }, []);

  if (called && loading) return <Loading />;

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
      <button className="p-1 px-2 rounded-xl bg-[#3B49DF] text-white uppercase disabled:bg-[#212da9]" disabled={called}>
        Submit
      </button>
    </form>
  );
};

export default Login;
