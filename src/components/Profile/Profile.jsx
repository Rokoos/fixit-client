import { useState, useContext, useCallback, useEffect, useMemo } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../Button";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { getUser } from "../../api";
import { FaMobileAlt } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { phoneFormat, token } from "../../utils";

import Review from "../Review/Review";
import Modal from "../Modal";
import AddReview from "../Review/AddReview";
import moment from "moment";
import { ModalContext } from "../../context/ModalContext";
import { FiStar } from "react-icons/fi";
import { IoMdPin } from "react-icons/io";
///////////////////////////////////////////
const Profile = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [showMyOrders, setShowMyOrders] = useState(false);
  const [person, setPerson] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [stars, setStars] = useState(null);
  const [averageStars, setAverageStars] = useState(0);
  const { user, setIsLoading, isLoading } = useContext(UserContext);
  const { modalType, showModal } = useContext(ModalContext);

  const fetchUser = useCallback(() => {
    setIsLoading(true);
    getUser(token, id)
      .then((res) => {
        setPerson(res.data.user);
        setOrders(res.data.orders);
        setReviews(res.data.reviews);
        setAverageStars(res.data.averageStars);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        navigate("/");
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (!person || isLoading) {
    return <Loader />;
  } else {
    return (
      <div className=" w-full mt-20  flex justify-center items-center mb-40 md:mb-20">
        <div
          className={` flex  w-[80vw] flex-col items-center justify-center space-y-5 md:mt-20`}
        >
          <h4 className=" text-2xl mt-8 mb-4 italic  text-beige">{`${person.name} ${person.surname}`}</h4>

          {averageStars !== 0 && (
            <div className="flex w-full   items-center justify-center  ">
              <div className="flex gap-1  my-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex justify-center">
                    <FiStar
                      size={25}
                      strokeWidth={0}
                      fill={index + 1 <= averageStars ? "gold" : "#D6DBDF"}
                      cursor="pointer"
                      className="star "
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {person.mobile.length > 5 && person.showMobile && (
            <div className="flex items-center ">
              <FaMobileAlt className="text-beige w-5 h-5 mr-2" />{" "}
              <span className="text-beige">{` ${phoneFormat(
                person.mobile
              )}`}</span>
            </div>
          )}
          {person.location && (
            <div className="flex items-center ">
              <IoMdPin className="text-beige w-5 h-5 mr-2" />{" "}
              <span className="text-beige">{person.location}</span>
            </div>
          )}
          {/* User's orders */}
          {orders.length > 0 && (
            <div className=" w-full flex flex-col items-center mt-4">
              <h5
                className="underline font-bold mb-4 text-beige cursor-pointer"
                onClick={() => setShowMyOrders(!showMyOrders)}
              >
                {showMyOrders ? "Ukryj  Zlecenia" : "Pokaż  Zlecenia"}
              </h5>
              {showMyOrders && (
                <div className="w-full max-w-[20rem]">
                  {/* //powinno być person.orders.map!!! */}
                  {orders.map((el, i) => (
                    <Link
                      key={el._id}
                      to={`/order/${el._id}`}
                      className=" flex flex-col items-center border border-beige p-2 mb-2 rounded-xl"
                    >
                      <span className="text-sm text-beige">
                        {`${el.category}   ${
                          el.category === "auto" ? `- ${el.make}` : ""
                        }`}
                      </span>

                      <span className="text-sm/3 text-beige mt-2">{`Dodano ${moment(
                        el.updatedAt
                      ).format("L")}`}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {user && user._id === id && (
            <Link
              to={`/edit-profile/${id}`}
              className="bg-cyan-300 rounded-full"
            >
              {" "}
              <Button label="Edytuj profil" />
            </Link>
          )}

          {user && user._id === id && (
            <Link to="/add-order">
              <Button label="Dodaj Zlecenie" />
            </Link>
          )}

          {reviews.length > 0 && (
            <>
              <h2 className="text-beige text-xl">Opinie</h2>
              {reviews.map((rev) => (
                <Review
                  setReviews={setReviews}
                  key={rev._id}
                  setAverageStars={setAverageStars}
                  rev={rev}
                  setPerson={setPerson}
                  person={person}
                  setStars={setStars}
                  stars={stars}
                  reviewText={reviewText}
                  setReviewText={setReviewText}
                />
              ))}
            </>
          )}

          {user &&
            user._id !== id &&
            !reviews.find((el) => el.reviewedBy._id === user._id) && (
              <>
                <Modal
                  person={person}
                  title="Dodaj Opinię"
                  style="flex justify-center items-center gap-2 px-7 py-4 border-2 font-montserrat sm:text-sm  leading-none bg-beige rounded-full text-navy  min-w-[14rem] border-transparent hover:text-beige hover:bg-navy hover:border-2 hover:border-beige transition duration-300 ease-in-out hover:font-bold  bg-beige"
                  modalStyle="w-[90vw]  max-w-[30rem] bg-beige rounded-lg mx-2"
                  modalName="addReview"
                  showModal={modalType === "addReview" && showModal}
                >
                  <AddReview
                    person={person}
                    reviewText={reviewText}
                    setReviewText={setReviewText}
                    setStars={setStars}
                    setAverageStars={setAverageStars}
                    stars={stars}
                    reviews={reviews}
                    setReviews={setReviews}
                  />
                </Modal>
                {reviews.length === 0 && <div className="h-[50px]"></div>}
              </>
            )}
          {/* <Modal title="Add review" isOpened={isOpened} /> */}
        </div>
      </div>
    );
  }
};

export default Profile;
