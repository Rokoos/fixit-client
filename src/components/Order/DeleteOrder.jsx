import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import { deleteOrder } from "../../api";
import { getToken } from "../../utils";

/////////////////////////////////////
const DeleteOrder = ({ id, images, category }) => {
  let navigate = useNavigate();
  const { setShowModal, setModalType } = useContext(ModalContext);
  const { setIsLoading, user } = useContext(UserContext);

  const handleDelete = () => {
    setIsLoading(true);
    let arr = [];
    if (images.length > 0) {
      images.forEach((el) => {
        arr.push(el.public_id);
      });
    }
    let data = {
      arr,
      recipientName: user.name,
      recipientEmail: user.email,
      category,
    };
    deleteOrder(getToken(), id, data)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        navigate(`/`);
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

export default DeleteOrder;
