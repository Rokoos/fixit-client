import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import { deleteReview } from "../../api";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
import { token } from "../../utils";
const DeleteReview = ({
  setReviews,
  review,
  person,
  setStars,
  setAverageStars,
}) => {
  const { setShowModal, setModalType } = useContext(ModalContext);
  const { setIsLoading } = useContext(UserContext);

  const handleReview = () => {
    setIsLoading(true);
    let data = { _id: review._id, reviewedUserId: person._id };
    deleteReview(token, data)
      .then((res) => {
        setReviews(res.data.reviews);
        setAverageStars(res.data.averageStars);
        toast.success(res.data.message);
        setStars(null);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsLoading(false);
      });
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
      <span className="text-navy text-xl  font-bold mb-4">Czy na pewno?</span>

      <div>
        <button
          className="p-2 px-4 mt-2 bg-navy border-2 border-transparent text-beige w-[6rem] rounded-lg hover:bg-beige hover:text-navy hover:border-navy transition duration-300 ease-in-out mr-1"
          onClick={() => {
            setShowModal(false);
            setModalType("");
          }}
        >
          Anuluj
        </button>
        <button
          className="p-2 px-4 mt-2 mb-2 bg-red-800 ml-1   w-[6rem] border-2 border-transparent text-beige  rounded-lg hover:bg-beige hover:text-red-800 hover:border-red-800 transition duration-300 ease-in-out"
          onClick={() => {
            handleReview();
            setShowModal(false);
            setModalType("");
          }}
        >
          Usuń
        </button>
      </div>
    </div>
  );
};

export default DeleteReview;
