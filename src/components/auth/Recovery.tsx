import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../global/UserProvider";

const Recovery = () => {
  const navigate = useNavigate();
  const user = useUser();
  const [email, setEmail] = useState("");

  if (user?.currentUser.user) {
    navigate("/profile");
  }

  return (
    <form className="card w-96 shadow-xl bg-white">
      <div className="card-body">
        <h2 className="card-title">Recovery Password</h2>
        <div>
          <label className="label">
            <span className="label-text">Enter Your Email</span>
          </label>
          <label className="input-group">
            <span>
              <EnvelopeIcon className="text-white w-6" />
            </span>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input input-bordered w-full" />
          </label>
        </div>
        <button className="btn btn-primary disabled:bg-[#5014b8] mt-5">Reset</button>
        <Link to="/login">Back to Login</Link>
      </div>
    </form>
  );
};

export default Recovery;
