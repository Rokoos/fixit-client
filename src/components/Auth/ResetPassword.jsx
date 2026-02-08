import { useState, useContext, useEffect } from "react";
import { resetPassword } from "../../api";
import Button from "../Button";
import { UserContext } from "../../context/UserContext";
import { GiConfirmed } from "react-icons/gi";

import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  // console.log("token", token);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setIsLoading } = useContext(UserContext);

  useEffect(() => {
    //Get the current url
    const params = new URLSearchParams(window.location.search);
    //Retrive the value of the token
    const str = params.get("token");
    setToken(str);
  }, []);

  const handleResetPassword = () => {
    setIsLoading(true);

    let data = { password, token };
    resetPassword(data)
      .then((res) => {
        console.log("res", res);
        toast.success(res.data.message);
        setPassword("");
        setConfirmPassword("");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error1", error);
        toast.error(error.response.data.message);
        setIsLoading(false);
      });
  };
  return (
    <div className=" flex flex-col mx-auto  items-center mt-40  max-w-[1200px] ">
      <h2 className="mb-2 text-beige text-3xl font-bold">Nowe Hasło </h2>
      <div className="mt-4 mb-4   w-[16rem] md:w-[20rem]  ">
        <label
          htmlFor="password"
          className=" block text-sm font-bold leading-6 text-beige"
        >
          Hasło
        </label>

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige sm:text-sm sm:leading-6"
        />
      </div>
      <div className="mt-4 mb-8   w-[16rem] md:w-[20rem]  ">
        <label
          htmlFor="confirmPassword"
          className=" block text-sm font-bold leading-6 text-beige"
        >
          Powtórz Hasło
        </label>

        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige sm:text-sm sm:leading-6"
        />
      </div>

      {password.trim().length >= 6 &&
        password.trim() === confirmPassword.trim() && (
          <GiConfirmed className="h-6 w-6 text-green-700 mt-4" />
        )}
      <div onClick={handleResetPassword}>
        <Button
          label="Resetuj"
          btnStyle="mt-4"
          disabled={
            password.trim().length < 6 ||
            password.trim() !== confirmPassword.trim()
          }
        />
      </div>
    </div>
  );
};

export default ResetPassword;
