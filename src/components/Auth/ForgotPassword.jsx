import { useContext, useState } from "react";
import arrowRight from "../../assets/icons/arrow-right.svg";
import { UserContext } from "../../context/UserContext";

import Button from "../Button";
import { toast } from "react-toastify";
import { forgotPassword } from "../../api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { setIsLoading } = useContext(UserContext);

  const handleForgotPassword = () => {
    setIsLoading(true);

    forgotPassword(email)
      .then((res) => {
        console.log("res", res);
        toast.success(res.data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsLoading(false);
      });

    setEmail("");
  };
  return (
    <div className=" flex flex-col mx-auto  items-center mt-40  max-w-[1200px] ">
      <h2 className="mb-4 text-beige text-3xl font-bold">Reset Hasła</h2>
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

      <div onClick={handleForgotPassword} className="mb-4">
        <Button label="Wyślij" style="mt-10" />
      </div>
    </div>
  );
};

export default ForgotPassword;
