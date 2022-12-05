import { useMutation } from "@apollo/client";
import { FormEventHandler, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../global/UserProvider";
import { LOGIN } from "../../GraphQL/Mutations";

const Login = () => {
  const [fetchToken] = useMutation(LOGIN);
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

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const result = await fetchToken({
          variables: {
            email,
            password,
          },
        });
        user!.setCurrentUser({
          type: "login",
          payload: {
            user: {
              id: result.data.login.id,
              token: result.data.login.token,
              username: result.data.login.username,
              email: result.data.login.email,
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
