import { useContext } from "react";
import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import Modal from "../Modal";
import { UserContext } from "../../context/UserContext";
import DeleteReview from "./DeleteReview";
import EditReview from "./EditReview";
import { ModalContext } from "../../context/ModalContext";
import moment from "moment";

const Review = ({
  setReviews,
  person,
  setPerson,
  reviewText,
  setReviewText,
  stars,
  setStars,
  rev,
  setAverageStars,
}) => {
  const { user } = useContext(UserContext);
  const { modalType, showModal } = useContext(ModalContext);
  return (
    <div className="w-full max-w-[40rem] bg-beige rounded-lg flex flex-col items-start justify-center px-4 text-navy   pb-5">
      {rev.stars != null && (
        <div className="flex w-full   items-center justify-center  ">
          <div className="flex gap-1  my-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex justify-center">
                <FiStar
                  size={25}
                  strokeWidth={0}
                  fill={index + 1 <= rev.stars ? "gold" : "#D6DBDF"}
                  cursor="pointer"
                  className="star "
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <span className="w-full text-wrap mb-4">{rev.text}</span>
      <span className="mb-4 italic">
        Dodano {moment(rev.createdAt).format("DD/MM/YYYY")} przez
        <Link to={`/profile/${rev.reviewedBy._id}`} className="font-bold">
          {" "}
          {`${rev.reviewedBy.name} ${rev.reviewedBy.surname}`}
        </Link>{" "}
      </span>
      {rev.reviewedBy._id === user._id && (
        <div className="flex flex-col items-center  w-full md:flex-row md:justify-around ">
          <Modal
            title="Edytuj"
            style="p-2 px-4 mt-2 bg-navy border-2 border-transparent text-beige w-[10rem] rounded-lg hover:bg-beige hover:text-navy hover:border-navy transition duration-300 ease-in-out "
            modalStyle="w-[90vw] mx-auto max-w-[30rem] bg-beige rounded-lg"
            modalName="editReview"
            showModal={modalType === "editReview" && showModal}
          >
            <EditReview
              setReviews={setReviews}
              review={rev}
              reviewText={reviewText}
              setReviewText={setReviewText}
              stars={stars}
              setStars={setStars}
              setPerson={setPerson}
              person={person}
              setAverageStars={setAverageStars}
            />
          </Modal>
          <Modal
            title="Usuń"
            style="p-2 px-4 mt-2 bg-red-800  border-2 border-transparent text-beige w-[10rem] rounded-lg hover:bg-beige hover:text-red-800 hover:border-red-800 transition duration-300 ease-in-out "
            modalStyle="w-[90vw]  max-w-[30rem] bg-beige rounded-lg"
            modalName="deleteReview"
            showModal={modalType === "deleteReview" && showModal}
          >
            <DeleteReview
              setReviews={setReviews}
              review={rev}
              person={person}
              setStars={setStars}
              setAverageStars={setAverageStars}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Review;
