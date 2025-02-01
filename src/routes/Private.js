import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

function Private({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <></>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default Private;
