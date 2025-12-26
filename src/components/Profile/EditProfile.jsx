import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import Button from "../Button";
import { toast } from "react-toastify";
import Switcher from "../Switcher";
import { updateUser, getUser } from "../../api";
import { getToken } from "../../utils";
import Loader from "../Loader";
import { PhoneInput } from "react-international-phone";
import Modal from "../Modal";
import DeleteProfile from "./DeleteProfile";
/////////////////////////////////
const EditProfile = () => {
  const { id } = useParams();
  const { setShowModal, modalType, showModal } = useContext(ModalContext);
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [location, setLocation] = useState("");
  const [mobile, setMobile] = useState("");
  const [showMobile, setShowMobile] = useState(true);

  const { setIsLoading, isLoading, user } = useContext(UserContext);
  const handleCheckboxChange = () => setShowMobile((previous) => !previous);

  const fetchUser = useCallback(() => {
    if (user && getToken()) {
      getUser(getToken(), id)
        .then((res) => {
          setName(res.data.user.name);
          setSurname(res.data.user.surname);
          setShowMobile(res.data.user.showMobile);
          if (res.data.user.location) setLocation(res.data.user.location);
          if (res.data.user.mobile) setMobile(res.data.user.mobile);
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          navigate(`/profile/${id}`);
          setIsLoading(false);
        });
    }
  }, [user]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  /*  */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      name,
      surname,
      mobile,
      showMobile,
      location,
    };

    updateUser(getToken(), user._id, data)
      .then((res) => {
        setIsLoading(false);
        navigate(`/profile/${user._id}`);
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className=" w-[100vw] mt-20  flex justify-center items-center mb-40 md:mb-20">
        <div
          className={` flex  w-[80vw] flex-col items-center justify-center space-y-5 md:mt-20`}
        >
          <h2 className="mb-4 text-beige text-3xl font-bold">Edycja Profilu</h2>

          {/* Name */}
          <div className="mt-4 mb-4   w-[16rem] md:w-[20rem]  ">
            <label
              htmlFor="name"
              className=" block text-sm font-bold  leading-6 text-beige mb-2"
            >
              Imię
            </label>

            <div className="flex flex-row  justify-between items-center  border  rounded-lg  mb-2">
              <input
                onChange={(e) => setName(e.target.value)}
                rows="1"
                value={name}
                id="name"
                placeholder="np. Jan "
                className="w-full rounded-lg  placeholder:text-sm  py-1 text-sm text-gray-700 px-2"
              ></input>
            </div>
          </div>
          {/* Surname */}
          <div className="mt-4 mb-4   w-[16rem] md:w-[20rem]  ">
            <label
              htmlFor="surnaem"
              className=" block text-sm font-bold  leading-6 text-beige mb-2"
            >
              Nazwisko
            </label>

            <div className="flex flex-row  justify-between items-center  border  rounded-lg  mb-2">
              <input
                onChange={(e) => setSurname(e.target.value)}
                rows="1"
                id="surname"
                value={surname}
                placeholder="np. Kowalski"
                className="w-full rounded-lg  placeholder:text-sm  py-1 text-sm text-gray-700 px-2"
              ></input>
            </div>
          </div>

          {/* Location */}
          <div className="mt-4 mb-4   w-[16rem] md:w-[20rem]  ">
            <label
              htmlFor="locations"
              className=" block text-sm font-bold  leading-6 text-beige mb-2"
            >
              Lokalizacja
            </label>

            <div className="flex flex-row  justify-between items-center  border  rounded-lg  mb-2">
              <textarea
                onChange={(e) => setLocation(e.target.value)}
                rows="1"
                value={location}
                placeholder="np. Warszawa, Wawer "
                className="w-full rounded-lg  placeholder:text-sm  py-1 text-sm text-gray-700 px-2"
              ></textarea>
            </div>
          </div>

          {/* Mobile */}
          <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
            <label
              htmlFor="mobile"
              className=" block text-sm font-bold  leading-6 text-beige"
            >
              Telefon
            </label>
            <PhoneInput
              defaultCountry="pl"
              hideDropdown
              value={mobile}
              onChange={(e) => setMobile(e)}
              className="w-full -mt-4"
              inputClassName=" w-full rounded-lg  py-2 text-center text-gray-700 ring-1 ring-inset ring-gray-300  ring-rounded-lg placeholder:text-gray-400 focus:ring-1   focus:ring-coral-red text-md sm:leading-6"
              disableCountryGuess
              forceDialCode
            />
          </div>

          <div className=" mt-20 mb-2 w-[16rem] md:w-[20rem] md:mt-6 ">
            <label className=" block text-sm font-bold  leading-6 text-beige">
              Wyświetlać nr telefonu?
            </label>
            <Switcher
              isChecked={showMobile}
              switcherStyle="text-beige"
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          <div onClick={handleSubmit} className=" mt-10 mb-8 ">
            <Button
              label="Zapisz zmiany "
              btnStyle=" mb-10 flex mx-auto   space-y-5 md:mt-12  "
            />
          </div>
          <div className=" mb-40 w-[15rem] md:mb-10">
            <Modal
              title="Usuń konto"
              style=" bg-red-800 w-full rounded-full p-4 border-2 border-red-500  hover:bg-white hover:text-red-500 transition duration-300 ease-in-out text-white "
              showModal={modalType === "orderDelete" && showModal}
              setShowModal={setShowModal}
              modalName="orderDelete"
              modalStyle={"max-w-[40rem] mx-2"}
            >
              <DeleteProfile id={id} />
            </Modal>
          </div>
        </div>
        ;
      </div>
    );
  }
};

export default EditProfile;
