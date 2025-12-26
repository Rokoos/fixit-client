import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../../api";
import Button from "../Button";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setIsAuth, setIsAdmin, setIsLoading } =
    useContext(UserContext);

  let navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    signin({ email, password })
      .then((res) => {
        toast.success(`Witaj ${res.data.user.name}!`);
        localStorage.setItem("fixerTkn", JSON.stringify(res.data.token));
        setUser(res.data.user);
        setIsAuth(true);
        // res.data.user.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
        if (res.data.user.role === "admin") {
          setIsAdmin(true);
          navigate("/admin");
        } else {
          setIsAdmin(false);
          navigate(`/profile/${res.data.user._id}`);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setEmail("");
        setPassword("");
        setIsLoading(false);
      });
  };
  return (
    <div className=" flex flex-col mx-auto  items-center mt-40  max-w-[1200px] ">
      <h2 className="mb-4 text-beige text-3xl font-bold">Zaloguj</h2>
      <div className="mt-4 mb-4   w-[16rem] md:w-[20rem]  ">
        <label
          htmlFor="email"
          className=" block text-sm font-bold leading-6 text-beige"
        >
          Adres Email
        </label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige sm:text-sm sm:leading-6"
          placeholder="janKowalski@test.pl"
        />
      </div>
      <div className="mt-4 mb-4   w-[16rem] md:w-[20rem]  ">
        <label
          htmlFor="password"
          className="block text-sm font-bold leading-6 text-beige mt-2"
        >
          Hasło
        </label>

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige sm:text-sm sm:leading-6 "
          placeholder="Wpisz hasło"
        />
      </div>
      <div onClick={handleSignin} className="mb-40">
        <Button label="Zaloguj" style="mt-10" />
      </div>
    </div>
  );
};

export default Signin;
