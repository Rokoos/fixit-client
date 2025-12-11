import { useContext, useState } from "react";
import Button from "./../Button";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api";
import { toast, Bounce } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import TermsConditions from "../TermsConditions";
import Modal from "../Modal";

const Signup = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, setIsLoading } = useContext(UserContext);
  const { modalType, showModal } = useContext(ModalContext);
  let navigate = useNavigate();
  const [agreement, setAgreement] = useState(false);
  // console.log("isLoading", isLoading);
  const handleAgreement = () => {
    setAgreement(!agreement);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const user = {
      name,
      surname,
      email,
      password,
    };
    if (agreement) {
      signup(user)
        .then((res) => {
          setIsLoading(false);

          toast.success(res.data.message);
          navigate("/signin");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setIsLoading(false);
        });
    } else {
      toast.error(
        "Musisz zaakceptować Warunki Korzystania z Serwisu aby zarejestrować konto."
      );
    }
  };
  return (
    <div className=" flex flex-col mx-auto  items-center mt-40  max-w-[1200px]">
      <h2 className="mb-4 text-beige text-3xl font-bold">Zarejestruj</h2>
      <div className="mt-4 mb-4   w-[16rem] md:w-[20rem]  ">
        <label
          htmlFor="name"
          className=" block text-sm font-bold leading-6 text-beige"
        >
          Imię
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige sm:text-sm sm:leading-6"
          placeholder="Jan"
        />
      </div>
      <div className="mt-4 mb-4   w-[16rem] md:w-[20rem]  ">
        <label
          htmlFor="surname"
          className=" block text-sm font-bold leading-6 text-beige"
        >
          Nazwisko
        </label>

        <input
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          type="text"
          id="surname"
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige sm:text-sm sm:leading-6"
          placeholder="Jan"
        />
      </div>
      <div className="mt-4 mb-4   w-[16rem] md:w-[20rem]  ">
        <label
          htmlFor="email"
          className=" block text-sm font-bold leading-6 text-beige"
        >
          Email
        </label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige sm:text-sm sm:leading-6"
          placeholder="Jan"
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
      <div className="flex flex-col  items-center  mt-6 ">
        <div className="flex  items-center gap-2 mb-2 ">
          <input
            checked={agreement}
            onChange={handleAgreement}
            type="checkbox"
            id="some_id"
            className="
    relative peer shrink-0
    appearance-none w-4 h-4 border-2 border-beige rounded-sm bg-navy
    mt-1
    checked:bg-beige checked:border-0"
          />
          <label
            htmlFor="some_id"
            className="text-sm cursor-pointer text-gray-500"
          >
            Zapoznałem się i akceptuję
          </label>
        </div>
        <Modal
          title="Warunki Korzystania z Serwisu"
          style="  text-beige underline text-sm w-full "
          modalName="policy"
          showModal={modalType === "policy" && showModal}
          modalStyle=" max-w-[40rem] "
        >
          <TermsConditions />
        </Modal>
      </div>
      <div onClick={handleSubmit} className="mb-40">
        <Button label="Zarejestruj" style="mt-10" />
      </div>
    </div>
  );
};

export default Signup;
