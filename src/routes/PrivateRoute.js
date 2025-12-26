import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getToken } from "../utils";

const PrivateRoute = () => {
  const { user, isAuth } = useContext(UserContext);
  // const token = JSON.parse(localStorage.getItem("fixerTkn"));
  // console.log("private", user, isAuth, token);
  // console.log("token", token);

  return getToken() && user && isAuth ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute;
