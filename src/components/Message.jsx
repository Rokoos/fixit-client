import { useContext } from "react";
import { getToken } from "../utils";
import { UserContext } from "../context/UserContext";
import { ModalContext } from "../context/ModalContext";
import { sendMessage } from "../api";
import { toast } from "react-toastify";

const Message = ({ proposal, text, setText }) => {
  const { user, setIsLoading } = useContext(UserContext);
  const { setShowModal, setModalType } = useContext(ModalContext);

  const handleMessage = (e) => {
    let obj = {
      text,
      recipientEmail: proposal.addedBy.email,
      recipientName: proposal.addedBy.name,
      senderFullName: `${user.name} ${user.surname}`,
      senderId: user._id,
      proposalId: proposal._id,
      orderId: proposal.orderId._id,
      category: proposal.orderId.category,
    };
    setIsLoading(true);
    sendMessage(getToken(), obj)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        setText("");
        setShowModal(false);
        setModalType("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsLoading(false);
        //     setText("");
        // setShowModal(false);
        // setModalType("");
      });
  };

  return (
    <>
      <div className=" w-full  flex flex-col  items-center ">
        <h4 className="my-2  font-bold text-gray-700 font-montserrat">
          Napisz wiadomość
        </h4>
        <textarea
          rows="7"
          onChange={(e) => setText(e.target.value)}
          value={text}
          className=" w-full rounded-lg border border-gray-400   p-2 text-gray-800 placeholder-gray-400  text-sm"
          placeholder="Twoja wiadomość..."
          // disabled={reviewText.length == 500}
        ></textarea>
        <div className="flex flex-col items-center">
          <span
            className={`${
              text.length <= 500
                ? "text-gray-700 text-sm"
                : "text-red-700 text-sm"
            } pt-2`}
          >
            {text.length} of 500
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
