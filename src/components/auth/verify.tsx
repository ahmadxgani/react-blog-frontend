import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { VERIFY_EMAIL } from "../../GraphQL/Queries";
import Loading from "../plugins/Loading";

export default function Verify() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { loading } = useQuery(VERIFY_EMAIL, {
    onCompleted(data) {
      console.log(data);
      setIsSuccess(true);
    },
  });
  if (loading) return <Loading />;

  const error = `
Maaf, kami tidak dapat memverifikasi emailmu.
Silakan coba lagi dengan tautan verifikasi baru.
  `;
  const success = `
  Email berhasil diverifikasi, silahkan login kembali. 
  `;

  return (
    <div>
      <p>{isSuccess ? success : error}</p>
      <Link to="/login">Login</Link>
    </div>
  );
}
