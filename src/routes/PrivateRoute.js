import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { token } from "../utils";

const PrivateRoute = () => {
  const { user, isAuth } = useContext(UserContext);

  return token && user && isAuth ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute;
