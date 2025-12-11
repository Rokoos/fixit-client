import { useEffect, useCallback, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getOrder } from "../../api";
import { UserContext } from "../../context/UserContext";
import { checkProposalsIds, token } from "../../utils";
import momment from "moment";
import { ModalContext } from "../../context/ModalContext";
import Modal from "../Modal";
import Button from "../Button";
import Loader from "../Loader";
import AddProposal from "../Proposal/AddProposal";
import Slider from "../Slider";

//////////////////////////////
const SingleOrder = () => {
  let navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [proposals, setProposals] = useState([]);

  const { user, isLoading, setIsLoading } = useContext(UserContext);
  const { modalType, showModal } = useContext(ModalContext);

  const { id } = useParams();

  const fetchOrder = useCallback(() => {
    setIsLoading(true);

    getOrder(token, id)
      .then((res) => {
        setOrder(res.data.order);
        setProposals(res.data.proposals);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        navigate("/");
        setIsLoading(false);
      });
  }, [setProposals]);
  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);
  if (!order || isLoading) {
    return <Loader />;
  } else {
    return (
      <div
        className=" pt-10  md:mt-20   w-full  mx-auto flex 
    flex-col items-center overflow-y-scroll mb-24 "
      >
        <h2 className="mb-4 text-beige text-3xl font-bold">Zlecenie</h2>

        <div className="flex flex-col items-center text-sm italic text-beige mb-4">
          <span>
            Dodane {momment(order.createdAt).format("DD/MM/YYYY")} przez{" "}
          </span>
          <Link
            to={`/profile/${order?.addedBy?._id}`}
            className=" text-2xl py-2  text-beige"
          >{`${order.addedBy.name} ${order.addedBy.surname}`}</Link>
        </div>

        {/*Urgent*/}
        {order.urgent && (
          <div className="my-2 flex justify-center w-[16rem] md:w-[20rem] ">
            <h4 className=" block text-sm font-bold  leading-6 text-red-700 mt-2">
              PILNE!
            </h4>
          </div>
        )}

        <div className="flex flex-col md:flex-row  md:justify-center">
          <div className="flex flex-col items-center  md:mr-10">
            {/* Category */}

            <div className="mt-4 mb-2 w-[16rem] px-2 md:px-0  md:w-[20rem] ">
              <label
                htmlFor="category"
                className=" block text-sm font-bold  leading-6 text-beige mt-2"
              >
                Kategoria
              </label>
              <div className="flex justify-center my-2">
                <h4 className="  text-white text-sm">{order.category}</h4>
              </div>
            </div>

            {order.category === "auto" && (
              <div className="mt-4 mb-2 w-[16rem] px-2 md:px-0 md:w-[20rem] ">
                <label className=" block text-sm font-bold  leading-6 text-beige mt-2">
                  Pojazd
                </label>
                <div className="flex flex-col items-center my-2">
                  <h4 className="  text-white text-sm">
                    {`${order.make} ${order.model}`}
                  </h4>
                </div>
                {order.year && (
                  <>
                    <label className=" block text-sm font-bold  leading-6 text-beige mt-2">
                      Rocznik
                    </label>
                    <div className="flex flex-col items-center my-2">
                      <h4 className="  text-white text-sm">{order.year}</h4>
                    </div>
                  </>
                )}
                {order.engine && (
                  <>
                    <label className=" block text-sm font-bold  leading-6 text-beige mt-2">
                      Silnik
                    </label>
                    <div className="flex flex-col items-center my-2">
                      <h4 className="  text-white text-sm ">{order.engine}</h4>
                    </div>
                  </>
                )}
              </div>
            )}
            {order.category === "agd" && order.agdCategory && (
              <div className="mt-4 mb-2 w-[16rem] px-2 md:px-0 md:w-[20rem] ">
                <label className=" block text-sm font-bold  leading-6 text-beige mt-2">
                  Rodzaj AGD
                </label>
                <div className="flex flex-col items-center my-2">
                  <h4 className="  text-white text-sm">{order.agdCategory}</h4>
                </div>
              </div>
            )}
            {order.category === "rtv" && order.rtvCategory && (
              <div className="mt-4 mb-2 w-[16rem] px-2 md:px-0 md:w-[20rem] ">
                <label className=" block text-sm font-bold  leading-6 text-beige mt-2">
                  Rodzaj RTV
                </label>
                <div className="flex flex-col items-center my-2">
                  <h4 className="  text-white text-sm">{order.rtvCategory}</h4>
                </div>
              </div>
            )}
            {order.category === "sprzęt komputerowy" &&
              order.computerCategory && (
                <div className="mt-4 mb-2 w-[16rem] px-2 md:px-0 md:w-[20rem] ">
                  <label className=" block text-sm font-bold  leading-6 text-beige mt-2">
                    Rodzaj sprzętu
                  </label>
                  <div className="flex flex-col items-center my-2">
                    <h4 className="  text-white text-sm">
                      {order.computerCategory}
                    </h4>
                  </div>
                </div>
              )}
            {order.category === "sprzęt ogrodniczy" && order.gardenCategory && (
              <div className="mt-4 mb-2 w-[16rem] px-2 md:px-0 md:w-[20rem] ">
                <label className=" block text-sm font-bold  leading-6 text-beige mt-2">
                  Rodzaj sprzętu
                </label>
                <div className="flex flex-col items-center my-2">
                  <h4 className="  text-white text-sm">
                    {order.gardenCategory}
                  </h4>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col  md:ml-10  ">
            {/* description */}
            <div className="mb-2 w-[16rem] px-2 md:px-0 md:w-[20rem] md:mt-2 ">
              <label
                htmlFor="category"
                className=" block text-sm font-bold  leading-6 text-beige mt-2"
              >
                Opis
              </label>
              <div className="flex justify-center my-2">
                <span className="  text-white text-sm text-justify">
                  {order?.description}
                </span>
              </div>
            </div>

            {/* Location */}
            <div
              className={`my-2 w-[16rem] px-2 md:px-0 md:w-[20rem] ${
                !user && "mb-20"
              }`}
            >
              <label
                htmlFor="category"
                className=" block text-sm font-bold  leading-6 text-beige mt-2"
              >
                Lokalizacja
              </label>
              <div className="flex justify-center my-2">
                <span className="text-white text-sm mr-1 ">
                  {order?.location}
                </span>
              </div>
            </div>
            {/* Contact*/}
          </div>
        </div>
        {/*  */}
        {order.photos.length > 0 && (
          <div className="w-full mt-4">
            <p className="text-beige text-2xl text-center mb-2 font-bold">
              {" "}
              Galeria
            </p>
            <Slider images={order.photos} />
          </div>
        )}

        <>
          {order.addedBy._id === user._id && (
            <Link
              className={`mt-4 ${proposals.length > 0 ? "mb-4" : "mb-6"} `}
              to={`/edit-order/${order._id}`}
            >
              <Button label="Edytuj zlecenie" />
            </Link>
          )}

          {proposals.length > 0 &&
            (order.addedBy._id === user._id ? (
              <span className="text-beige text-sm mb-4 underline">
                Propozycje
              </span>
            ) : (
              <span className="text-beige text-sm mb-4 underline">
                Twoja propozycja
              </span>
            ))}
          {proposals.length > 0 && (
            <div className="w-full px-2 max-w-[20rem] ">
              {proposals.map((el) => (
                <Link
                  key={el._id}
                  to={`/proposal/${el._id}`}
                  className={`flex flex-col items-center border border-beige p-2 mb-2 rounded-xl ${
                    el.accepted && "bg-green-700"
                  }`}
                >
                  <span className="text-sm text-beige">
                    {/* Dodano {momment(el.createdAt).format("L")}przez */}

                    {`Dodana ${momment(el.createdAt).format("D/M/YY")} przez`}
                  </span>
                  <div className=" flex justify-start items-center gap-2 text-beige">
                    <span>{el.addedBy.name}</span>
                    <span>{el.addedBy.surname}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
        {user &&
          order.addedBy._id !== user._id &&
          !checkProposalsIds(proposals, user._id) && (
            <div className="my-4">
              <Modal
                title="Złóż propozycję"
                style="flex justify-center items-center gap-2 px-7 py-4 border-2 font-montserrat sm:text-sm  leading-none bg-beige rounded-full text-navy  min-w-[14rem] border-transparent hover:text-beige hover:bg-navy hover:border-2 hover:border-beige transition duration-300 ease-in-out hover:font-bold  bg-beige"
                modalStyle="w-[90vw] mx-auto max-w-[30rem] bg-beige rounded-lg"
                modalName="proposal"
                showModal={modalType === "proposal" && showModal}
              >
                <AddProposal order={order} setProposals={setProposals} />
              </Modal>
            </div>
          )}
        <div className="h-[50px]"></div>
      </div>
    );
  }
};

export default SingleOrder;
