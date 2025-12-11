import { useState, useContext } from "react";
// import { UserContext } from "../context/UserContext";
import { ModalContext } from "../context/ModalContext";
// import { sendMessage } from "../api";
import { toast } from "react-toastify";
// import { token } from "../utils";

const Message = () => {
  // const { user, isAdmin, setIsLoading } = useContext(UserContext);
  const { setShowModal, setModalType } = useContext(ModalContext);
  // console.log("modalType", modalType);
  const [messageText, setMessageText] = useState("");
  // const handleReceiverEmail = () => {
  //   if (modalType === "violation") {
  //     // return "warsawnanny@gmail.com";
  //     return "m.widomski@tlen.pl";
  //   } else if (modalType === "message") {
  //     return person.email;
  //   }
  // };
  const handleMessage = () => {
    // setIsLoading(true);
    // if (reviewText.trim().length === 0) {
    //   toast.warning("You can not send an empty message!");
    // } else {
    //   let data = {
    //     isAdmin,
    //     type: modalType,
    //     email: handleReceiverEmail(),
    //     subject: isAdmin
    //       ? `Admin of Warsaw Nanny`
    //       : `${user.name} ${user.surname}`,
    //     text: reviewText.trim(),
    //     senderId: user._id,
    //     violatorId: modalType === "violation" ? person._id : "",
    //     violatorData:
    //       modalType === "violation" ? `${person.name} ${person.surname}` : "",
    //   };

    //   // console.log("message", data);
    //   sendMessage(authtoken, data)
    //     .then((res) => {
    //       toast.success(res.data, {
    //         position: "bottom-center",
    //         autoClose: 1000,
    //       });
    //       setIsLoading(false);
    //     })
    //     .catch((error) => {
    //       setIsLoading(false);
    //       console.log(error);
    //     });
    //   console.log(data);
    //   setReviewText("");
    //   setShowModal(false);
    //   setModalType("");
    // }
    // let data = {
    //   isAdmin,
    //   type: modalType,
    //   email: handleReceiverEmail(),
    //   subject: isAdmin
    //     ? `Admin of Warsaw Nanny`
    //     : `${user.name} ${user.surname}`,
    //   text: messageText.trim(),
    //   senderId: user._id,
    //   violatorId: modalType === "violation" ? person._id : "",
    //   violatorData:
    //     modalType === "violation" ? `${person.name} ${person.surname}` : "",
    // };
    // sendMessage(authtoken, data)
    //   .then((res) => {
    //     toast.success(res.data, {
    //       autoClose: 2000,
    //     });
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.message, { autoClose: 2000 });
    //     setIsLoading(false);
    //   });
    toast.success("Wysłano wiadomość");

    setMessageText("");
    setShowModal(false);
    setModalType("");
  };

  return (
    <>
      <div className=" w-full  flex flex-col  items-center ">
        <h4 className="my-2  font-bold text-gray-700 font-montserrat">
          Napisz wiadomość
        </h4>
        <textarea
          rows="7"
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
          className=" w-full rounded-lg border border-gray-400   p-2 text-gray-800 placeholder-gray-400  text-sm"
          placeholder="Twoja wiadomość..."
          // disabled={reviewText.length == 500}
        ></textarea>
        <div className="flex flex-col items-center">
          <span
            className={`${
              messageText.length <= 1000
                ? "text-gray-700 text-sm"
                : "text-red-700 text-sm"
            } pt-2`}
          >
            {messageText.length} of 1000
          </span>
        </div>
        <div className="flex flex-row justify-around items-center  w-full py-2">
          {/*  {modalType === "message" && (
            <img
              className="hidden md:block  w-6 h-6 bg-amber-300  rounded-xl overflow-auto cursor-pointer"
              src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
              onClick={() => setShowPicker((val) => !val)}
            />
          )} */}

          <button
            className="bg-gray-500 border border-transparent  rounded-lg text-white  hover:border-gray-500 hover:text-gray-500 hover:bg-white transition duration-150 ease-in-out p-2 w-[6.5rem]"
            onClick={() => {
              setShowModal(false);
              setModalType("");
            }}
          >
            Anuluj
          </button>
          <button
            className="bg-green-500 rounded-lg  text-white hover:border hover:border-green-500 hover:bg-white hover:text-green-500 transition duration-150 ease-in-out p-2 w-[6.5rem]"
            onClick={handleMessage}
          >
            {" "}
            Wyślij
          </button>
        </div>
      </div>
    </>
  );
};

export default Message;
