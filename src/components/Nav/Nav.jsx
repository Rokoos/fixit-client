import { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
// import { headerLogo } from "../assets/images";
import { hamburger } from "../../assets/icons";
import { navLinks } from "../../constants";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../../utils";

const Nav = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const route = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2];
  const { user, isAdmin, setIsAuth, setIsAdmin, setUser } =
    useContext(UserContext);
  let menuRef = useRef();
  const [open, setOpen] = useState(false);
  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (open) {
      let handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          handleMenu();
        }
      };
      document.addEventListener("mousedown", handler);

      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  });

  const logoutUser = () => {
    logout();
    setUser(null);
    setIsAuth(false);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <div
      className="hidden md:block top-0 fixed bg-beige border-b border-b-navy  w-[100%] z-[1000]"
      ref={menuRef}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] ">
        <div className="flex items-center justify-end h-16">
          {/* navLinks */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                className={`${
                  route === "" ? "text-beige bg-navy" : "text-navy"
                } px-3 py-2 rounded-md text-md font-bold `}
                to="/"
              >
                Zlecenia
              </Link>
              {user ? (
                <div className="flex ">
                  {isAdmin ? (
                    <Link
                      className={`${
                        route === "admin" ? "text-beige bg-navy" : "text-navy "
                      } px-3 py-2 rounded-md text-md font-bold `}
                      to="/admin"
                    >
                      Admin
                    </Link>
                  ) : (
                    <Link
                      className={`${
                        route === "profile" && user._id === id
                          ? "text-beige bg-navy"
                          : "text-navy "
                      } px-3 py-2 rounded-md text-md font-bold `}
                      to={`/profile/${user._id}`}
                    >
                      Profil
                    </Link>
                  )}

                  <div
                    // onClick={() => logoutUser()}

                    className=" px-3 py-2 ml-2 rounded-md text-md font-bold cursor-pointer text-navy "
                  >
                    Wyloguj
                  </div>
                </div>
              ) : (
                <div className="flex ">
                  <Link
                    className={`${
                      route === "signup" ? "text-beige bg-navy" : "text-navy "
                    } px-3 py-2 mr-2 rounded-md text-md font-bold `}
                    to="/signup"
                  >
                    Zarejestruj
                  </Link>
                  <Link
                    to="/signin"
                    className={`${
                      route === "signin" ? "text-beige bg-navy" : "text-navy "
                    } px-3 py-2 ml-2 rounded-md text-md font-bold `}
                  >
                    Zaloguj
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
{
  /* <header className=" padding-x py-8 absolute z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="leading-normal text-lg font-montserrat text-slate-gray"
            >
              {item.label}
            </Link>
          ))}
        </ul>
        <div className="hidden max-lg:block">
          <img src={hamburger} alt="Hamburger" width={25} height={25} />
        </div>
      </nav>
    </header> */
}
