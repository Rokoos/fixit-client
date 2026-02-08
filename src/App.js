import {
  useState,
  useEffect,
  useContext,
  Suspense,
  lazy,
  useCallback,
} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import { currentUser } from "./api";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import { getToken } from "./utils";
import SingleOrder from "./components/Order/SingleOrder";

const Profile = lazy(() => import("./components/Profile/Profile"));
const EditProfile = lazy(() => import("./components/Profile/EditProfile"));
const SingleProposal = lazy(
  () => import("./components/Proposal/SingleProposal"),
);

const Nav = lazy(() => import("./components/Nav/Nav"));
const Signin = lazy(() => import("./components/Auth/Signin"));
const Signup = lazy(() => import("./components/Auth/Signup"));
const ForgotPassword = lazy(() => import("./components/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/Auth/ResetPassword"));
const Menu = lazy(() => import("./components/Nav/Menu"));
// const Message = lazy(() => import("./components/Message"));
const AddOrder = lazy(() => import("./components/Order/AddOrder"));
const EditOrder = lazy(() => import("./components/Order/EditOrder"));

const Orders = lazy(() => import("./components/Order/Orders"));

const AdminDashboard = lazy(() => import("./components/Admin/Dashboard"));
const App = () => {
  const { user, setUser, setIsAuth, setIsAdmin } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const checkUser = useCallback(() => {
    if (getToken()) {
      setIsLoading(true);
      currentUser(getToken())
        .then((res) => {
          setUser(res.data);
          setIsAuth(true);
          res.data.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("error", err);
          setIsLoading(false);
        });
    }
  }, [setUser, setIsAdmin, setIsAuth]);
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <ToastContainer />
      {!isLoading && (
        <Routes>
          <Route path="/" element={<Orders />} exact />

          <Route element={<PrivateRoute />}>
            <Route element={<Profile />} path="/profile/:id" />
            <Route path="/edit-profile/:id" element={<EditProfile />} />
            <Route path="/add-order" element={<AddOrder />} />
            <Route path="/order/:id" element={<SingleOrder />} />
            <Route path="/edit-order/:id" element={<EditOrder />} />
            <Route path="/proposal/:id" element={<SingleProposal />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route element={<AdminDashboard />} path="/admin" />
          </Route>

          <Route
            path="/signin"
            element={user ? <Navigate to="/" /> : <Signin />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
          {/* <Route path="/*" element={<NotFound />} /> */}
          <Route
            path="/forgotPassword"
            element={user ? <Navigate to="/" /> : <ForgotPassword />}
          />
          <Route
            path="/resetPassword"
            element={user ? <Navigate to="/" /> : <ResetPassword />}
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      )}

      <Menu />
    </Suspense>
  );
};

export default App;
