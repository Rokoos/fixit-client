import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getToken } from "../utils";

const PrivateRoute = () => {
  const { user, isAuth, isAdmin } = useContext(UserContext);
  // const token = localStorage.getItem("fixerTkn");
  // console.log("userro", user, isLoading);

  return getToken() && user && isAuth && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
export default PrivateRoute;
