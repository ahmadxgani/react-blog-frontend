import { useMutation } from "@apollo/client";
import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "../../global/UserProvider";
import { LOGIN } from "../../GraphQL/Mutations";

const Login = () => {
  const [fetchToken] = useMutation(LOGIN);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useUser();

  if (user?.currentUser.user) {
    return <Navigate to="/dashboard/users" />;
  }

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
              token: result.data.login.token,
              username: result.data.login.username,
              email: result.data.login.email,
            },
          },
        });
        setEmail("");
        setPassword("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setEmail(emailRef.current?.value as string);
    setPassword(passwordRef.current?.value as string);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        ref={(input) => {
          emailRef.current = input;
        }}
        onChange={onChange}
        value={email}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        ref={(input) => {
          passwordRef.current = input;
        }}
        onChange={onChange}
        value={password}
      />
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
