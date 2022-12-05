import { useMutation } from "@apollo/client";
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
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <div className="flex gap-3">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </div>
      <div className="flex gap-3">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} value={username} />
      </div>
      <div className="flex gap-3">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="on" />
      </div>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <button>Submit</button>
    </form>
  );
};

export default Register;
