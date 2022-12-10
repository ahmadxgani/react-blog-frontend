import { useLazyQuery } from "@apollo/client";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { FormEventHandler, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Query } from "../../../generated-types";
import { useUser } from "../../global/UserProvider";
import { LOGIN } from "../../GraphQL/Queries";

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
    <>
      {called && loading && <progress className="progress rounded-none absolute top-0 inset-x-0"></progress>}
      <form onSubmit={onSubmit} className="card w-96 shadow-xl bg-white">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <label className="input-group">
              <span>
                <EnvelopeIcon className="w-6" />
              </span>
              <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input input-bordered w-full" />
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Your Password</span>
            </label>
            <label className="input-group">
              <span>
                <LockClosedIcon className="w-6" />
              </span>
              <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="on" className="input input-bordered w-full" />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <label htmlFor="rememberme" className="cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="label-text">Remember me</span>
                  <input id="rememberme" type="checkbox" className="checkbox checkbox-primary w-4 h-4" />
                </div>
              </label>
              <Link to="/recovery-password" className="label-text">
                Forgot password?
              </Link>
            </label>
          </div>

          <button className="btn btn-primary disabled:bg-[#5014b8] mt-5" disabled={called}>
            Submit
          </button>
          <p>
            Don't have an account yet? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
