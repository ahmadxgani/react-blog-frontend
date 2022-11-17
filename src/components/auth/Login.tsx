import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col">
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <div className="flex gap-1">
        <input type="checkbox" name="rememberme" id="rememberme" />
        <label htmlFor="rememberme">Remember me</label>
      </div>
      <p>
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
      <Link to="/recovery-password">Forgot password?</Link>
      <button>Submit</button>
    </div>
  );
};

export default Login;
