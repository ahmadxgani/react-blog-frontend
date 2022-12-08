import { useMutation } from "@apollo/client";
import { EnvelopeIcon, LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { FormEventHandler, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mutation } from "../../../generated-types";
import { useUser } from "../../global/UserProvider";
import { REGISTER } from "../../GraphQL/Mutations";

const Register = () => {
  const [register] = useMutation<Mutation>(REGISTER);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const user = useUser();

  useEffect(() => {
    if (user?.currentUser.user) {
      navigate("/profile");
    }
  }, []);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const result = await register({
          variables: {
            email,
            username,
            password,
          },
        });

        navigate("/login", {
          state: {
            email: result.data?.CreateAuthor.email,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="card w-96 shadow-xl bg-white">
      <div className="card-body">
        <h2 className="card-title">Register</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Username</span>
          </label>
          <label className="input-group">
            <span>
              <UserCircleIcon className="w-6" />
            </span>
            <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} value={username} className="input input-bordered w-full" autoComplete="off" />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <label className="input-group">
            <span>
              <EnvelopeIcon className="w-6" />
            </span>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input input-bordered w-full" autoComplete="email" />
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
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} className="input input-bordered w-full" autoComplete="password" />
          </label>
        </div>

        <button className="btn btn-primary disabled:bg-[#5014b8] mt-5">Submit</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
