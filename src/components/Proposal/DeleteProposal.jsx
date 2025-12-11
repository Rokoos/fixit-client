import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import { deleteProposal } from "../../api";
import { token } from "../../utils";

/////////////////////////////////////
const DeleteProposal = ({ proposal }) => {
  let navigate = useNavigate();
  const { setShowModal, setModalType } = useContext(ModalContext);
  const { setIsLoading } = useContext(UserContext);

  const handleDelete = () => {
    setIsLoading(true);

    deleteProposal(token, proposal._id, { accepted: proposal.accepted })
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        navigate(`/order/${proposal.orderId}`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsLoading(false);
      });
    setModalType("");
    setShowModal(false);
  };
  return (
    <div className=" w-full  flex flex-col items-center justify-center ">
      <h5 className="font-bold text-gray-700 font-montserrat mt-4">
        Czy na pewno usunąć?
      </h5>

      <div className="flex items-center justify-between p-6 rounded ">
        <button
          className="bg-gray-700 border border-transparent rounded-lg text-white p-2 w-[6.5rem] mr-4 hover:border-gray-700 hover:bg-white hover:text-gray-700 transition ease-in-out  duration-300"
          type="button"
          onClick={() => {
            setModalType("");
            setShowModal(false);
          }}
        >
          Anuluj
        </button>
        <button
          className=" rounded-lg text-white border border-transparent bg-red-800 p-2 w-[6.5rem] ml-4 hover:border-red-800 hover:bg-white hover:text-red-500 transition ease-in-out  duration-300"
          type="button"
          onClick={handleDelete}
        >
          Usun
        </button>
      </div>
    </div>
  );
};

export default DeleteProposal;
