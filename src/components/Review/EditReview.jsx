import { useEffect, useState, useContext } from "react";
import { deleteReview, updateReview } from "../../api";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import { charNumber, getToken } from "../../utils";
import { toast } from "react-toastify";
import StarRatings from "../StarRatings";
import { IoIosCloseCircle } from "react-icons/io";

const EditReview = ({
  setReviews,
  person,
  stars,
  setStars,
  reviewText,
  setReviewText,
  review,
  setAverageStars,
}) => {
  const { setShowModal, setModalType } = useContext(ModalContext);
  const { user, setIsLoading } = useContext(UserContext);
  useEffect(() => {
    setReviewText(review.text);
    setStars(review.stars);
  }, []);
  const handleUpdate = () => {
    setIsLoading(true);
    let data = {
      reviewedBy: user._id,
      reviewedByUser: `${user.name} ${user.surname}`,
      reviewedUserId: person._id,
      reviewedUserEmail: person.email,
      reviewedUserName: person.name,
      text: reviewText,
      stars,
    };

    updateReview(getToken(), review._id, data)
      .then((res) => {
        setReviews(res.data.reviews);
        setAverageStars(res.data.averageStars);
        toast.success(res.data.message);
        setStars(null);
        setShowModal(false);
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
      <span className="text-navy text-xl  font-bold mb-4">Twoja Opinia</span>

      <StarRatings stars={stars} setStars={setStars} />
      <div className="  mt-4 md:mt-0 mb-4 w-full ">
        <div className="mt-2 flex flex-col  w-full">
          <textarea
            value={reviewText}
            placeholder="Tekst opinii"
            className="border text-sm text-gray-700 p-2 h-[20vh] border-navy w-full rounded-lg text-wrap focus:outline-none"
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <span
            className={`mx-auto mt-2 text-sm ${
              reviewText.length > 500 ? "text-red-700" : "text-gray-700"
            } `}
          >
            {reviewText.length} of 500
          </span>
        </div>
      </div>

      <button
        className="p-2 px-4 mt-2 bg-navy border-2 border-transparent text-beige w-[10rem] rounded-lg hover:bg-beige hover:text-navy hover:border-navy transition duration-300 ease-in-out "
        onClick={handleUpdate}
      >
        Zapisz Opinię
      </button>
      <button
        className="p-2 px-4 mt-2 mb-2    w-[10rem] border-2 border-navy text-navy  rounded-lg hover:bg-navy hover:text-beige hover:border-transparent transition duration-300 ease-in-out"
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

export default EditReview;
