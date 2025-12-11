import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { logout, menuStyles } from "../../utils";
import { FaHome, FaUser } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdLogIn } from "react-icons/io";
import { MdNoteAdd } from "react-icons/md";
import { RiLogoutCircleLine, RiUserAddFill } from "react-icons/ri";

import { Link, useLocation, useNavigate } from "react-router-dom";

const Menu = () => {
  const { user, setUser, setIsAuth, setIsAdmin, setFilters } =
    useContext(UserContext);

  // console.log("userChats", userChats);
  // console.log("usermenu", user);
  let location = useLocation();
  let navigate = useNavigate();
  // console.log("location", location.pathname);
  const route = location.pathname.split("/")[1];
  // console.log("url", location.pathname.split("/")[1]);
  const id = location.pathname.split("/")[2];
  const logoutUser = () => {
    logout();
    setUser(null);
    setIsAuth(false);
    setIsAdmin(false);
    navigate("/");
  };
  const loggedInMenu = () => (
    <>
      {user.role === "admin" ? (
        <Link
          to="/admin"
          className={`w-4/12  p-5 border-2 cursor-pointer flex flex-col items-center justify-between  ${
            route === "admin" && user._id === id
              ? "border-navy bg-beige text-navy"
              : "border-beige bg-navy text-beige"
          } transition-all duration-200`}
        >
          <FaUser className="w-6 h-6" />

          <span className="text-sm">Admin</span>
        </Link>
      ) : (
        <Link
          to={`/profile/${user._id}`}
          className={`w-4/12  p-5 border-2 cursor-pointer flex flex-col items-center justify-between  ${
            route === "profile" && user._id === id
              ? "border-navy bg-beige text-navy"
              : "border-beige bg-navy text-beige"
          } transition-all duration-200`}
        >
          <FaUser className="w-6 h-6" />

          <span className="text-sm">Profil</span>
        </Link>
      )}

      <div
        className="w-4/12  p-5 border-2 cursor-pointer  flex flex-col  items-center justify-between border-beige  bg-navy text-beige "
        onClick={() => logoutUser()}
      >
        <RiLogoutCircleLine className="w-6 h-6" />
        <span className="text-sm">Wyloguj</span>
      </div>
    </>
  );

  const loggedOutMenu = () => (
    <>
      <Link
        to="/signin"
        className={`w-4/12 p-5 border-2 cursor-pointer flex flex-col items-center justify-between 
        ${
          route === "signin"
            ? "border-navy bg-beige text-navy"
            : "border-beige bg-navy text-beige"
        } transition-all duration-200`}
      >
        <IoMdLogIn className="w-6 h-6" />

        <span className="text-sm">Logowanie</span>
      </Link>
      <Link
        to="/signup"
        className={`w-4/12 p-5 border-2 cursor-pointer flex flex-col items-center justify-between  ${
          route === "signup"
            ? "border-navy bg-beige text-navy"
            : "border-beige bg-navy text-beige"
        } transition-all duration-200`}
      >
        <RiUserAddFill className="w-6 h-6" />

        <span className="text-sm">Rejestracja</span>
      </Link>
    </>
  );
  return (
    <div className="md:hidden fixed bottom-0 w-full  flex text-white z-10 ">
      <Link
        to="/"
        className={`
          w-4/12
         p-5 border-2 cursor-pointer flex flex-col items-center justify-between ${
           route === ""
             ? "border-navy bg-beige text-navy"
             : "border-beige bg-navy text-beige"
         } transition-all duration-200`}
        onClick={() => {
          setFilters({
            carMake: "",
            carModel: "",
            engine: "",
            year: "",
            agdCategory: "",
            rtvCategory: "",
            computerCategory: "",
            gardenCategory: "",
            location: "",
            urgent: "",
            category: "",
          });
        }}
      >
        <FaPeopleGroup className="w-6 h-6" />

        <span className="text-sm">Zlecenia</span>
      </Link>
      {user ? loggedInMenu() : loggedOutMenu()}
    </div>
  );
};

export default Menu;
