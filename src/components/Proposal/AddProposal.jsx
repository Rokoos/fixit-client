import { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import { addProposal } from "../../api";
import { getToken } from "../../utils";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
///////////////////////////////////
const AddProposal = ({ order, setProposals }) => {
  console.log("order", order);
  const { setShowModal, setModalType } = useContext(ModalContext);
  const { user, setIsLoading } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const handleProposal = () => {
    let data = {
      orderOwnerId: order.addedBy._id,
      recipientEmail: order.addedBy.email,
      category: order.category,
      orderId: order._id,
      addedBy: user._id,
      addedByEmail: user.email,
      description,
    };
    setIsLoading(true);
    addProposal(getToken(), data)
      .then((res) => {
        setIsLoading(false);
        setProposals(res.data.proposals);
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsLoading(false);
      });
    setShowModal(false);
    setModalType("");
  };
  return (
    <div className="flex flex-col  items-center w-full  ">
      <div className="relative flex flex-row items-center w-full ">
        <IoIosCloseCircle
          onClick={() => {
            setShowModal(false);
            setModalType("");
          }}
          className="absolute w-8 h-8 cursor-pointer  text-navy  rounded-full -top-5 -right-1"
          color="#000435"
        />
      </div>
      <span className="text-navy text-xl  font-bold">Twoja Propozycja</span>
      {/* Category//////////// */}
      {/* Category */}

      <div className="  mt-4 md:mt-0 mb-4 w-full ">
        <label
          htmlFor="age"
          className=" block text-sm font-bold  leading-6 text-navy mt-2"
        >
          Opis
        </label>
        <div className="mt-2 flex flex-col  w-full">
          <textarea
            value={description}
            placeholder="Złóż propzycję (termin, koszt itd.) lub zadaj pytanie o szczegóły."
            className="border text-sm text-gray-700 p-2 h-[20vh] border-navy w-full rounded-lg text-wrap focus:outline-none"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <span
            className={`mx-auto mt-2 text-sm ${
              description.length > 500 ? "text-red-700" : "text-gray-700"
            } `}
          >
            {description.length} of 500
          </span>
        </div>
      </div>

      <button
        // onClick={() => handleSearch()}
        className="p-2 px-4 mt-2 bg-navy border-2 border-transparent text-beige w-[10rem] rounded-lg hover:bg-beige hover:text-navy hover:border-navy transition duration-300 ease-in-out "
        onClick={handleProposal}
      >
        Złóż propozycję
      </button>
      <button
        className="p-2 px-4 mt-2    w-[10rem] border-2 border-navy text-navy  rounded-lg hover:bg-navy hover:text-beige hover:border-transparent transition duration-300 ease-in-out"
        // onClick={resetFilters}
        onClick={() => {
          setShowModal(false);
          setModalType("");
        }}
      >
        Anuluj
      </button>
    </div>
  );
};

export default AddProposal;
