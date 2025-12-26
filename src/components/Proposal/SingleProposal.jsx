import { useEffect, useCallback, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import { getProposal, acceptanceToggle } from "../../api";
import { getToken } from "../../utils";
import { toast } from "react-toastify";
import momment from "moment";
import Loader from "../Loader";
import Button from "../Button";
import Message from "../Message";
import Modal from "../Modal";
import EditProposal from "./EditProposal";
import DeleteProposal from "./DeleteProposal";
//////////////////////////////////////
const SingleProposal = () => {
  let navigate = useNavigate();
  const { user, isLoading, setIsLoading } = useContext(UserContext);
  const { modalType, showModal } = useContext(ModalContext);
  const [proposal, setProposal] = useState(null);
  const [acceptedProposalId, setAcceptedProposalId] = useState("");

  const { id } = useParams();
  const fetchProposal = useCallback(() => {
    setIsLoading(true);
    getProposal(getToken(), id)
      .then((res) => {
        setProposal(res.data.proposal);
        setAcceptedProposalId(res.data.acceptedProposalId);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsLoading(false);
        navigate("/orders");
      });
  }, []);
  useEffect(() => {
    fetchProposal();
  }, [fetchProposal]);

  const handleAcceptance = () => {
    setIsLoading(true);
    try {
      let data = { orderId: proposal.orderId };
      acceptanceToggle(getToken(), id, data).then((res) => {
        setProposal(res.data.proposal);
        toast.success(res.data.message);
        setIsLoading(false);
      });
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };
  if (!proposal || isLoading) {
    return <Loader />;
  } else {
    return (
      <div
        className=" pt-10  md:mt-20   w-full  mx-auto flex 
    flex-col items-center overflow-y-scroll mb-24 "
      >
        <h2 className="mb-4 text-beige text-3xl font-bold">Propozycja</h2>

        <div className="flex flex-col items-center text-sm italic text-beige mb-4">
          <span>
            dodana {momment(proposal.createdAt).format("DD/MM/YYYY")} przez{" "}
          </span>
          <Link
            to={`/profile/${proposal.addedBy._id}`}
            className=" text-2xl  text-beige py-4"
          >{`${proposal.addedBy.name} ${proposal.addedBy.surname}`}</Link>
        </div>
        <div className="w-[90%] p-4 max-w-[1600px]  text-sm md:text-xl italic text-beige my-8  border-t border-b border-beige break-words overflow-hidden">
          <p>{proposal.description}</p>
        </div>
        {user &&
          user._id === proposal.orderOwnerId &&
          (proposal._id === acceptedProposalId ||
            acceptedProposalId === "") && (
            <div onClick={handleAcceptance}>
              <Button
                label={proposal.accepted ? "Cofnij Akceptację" : "Akceptuj"}
              />
            </div>
          )}
        {user && user._id === proposal.addedBy._id && !proposal.accepted && (
          <div className="my-4">
            <Modal
              title="Edytuj"
              style="flex justify-center items-center gap-2 px-7 py-4 border-2 font-montserrat sm:text-sm  leading-none bg-beige rounded-full text-navy  min-w-[14rem] border-transparent hover:text-beige hover:bg-navy hover:border-2 hover:border-beige transition duration-300 ease-in-out hover:font-bold  bg-beige"
              modalStyle="w-[90vw] mx-auto max-w-[30rem] bg-beige rounded-lg"
              modalName="proposal"
              showModal={modalType === "proposal" && showModal}
            >
              <EditProposal proposal={proposal} setProposal={setProposal} />
            </Modal>
          </div>
        )}
        {user && user._id === proposal.addedBy._id && !proposal.accepted && (
          <div className="my-4">
            <Modal
              title="Usuń"
              style="flex justify-center items-center gap-2 px-7 py-4 border-2 font-montserrat sm:text-sm  leading-none bg-red-800 rounded-full text-white min-w-[14rem] border-transparent hover:text-beige hover:bg-navy hover:border-2 hover:border-beige transition duration-300 ease-in-out hover:font-bold  bg-beige"
              modalStyle="w-[90vw] mx-auto max-w-[30rem] bg-beige rounded-lg"
              modalName="deleteProposal"
              showModal={modalType === "deleteProposal" && showModal}
            >
              <DeleteProposal proposal={proposal} />
            </Modal>
          </div>
        )}

        {user &&
          user._id === proposal.orderOwnerId &&
          (proposal._id === acceptedProposalId ||
            acceptedProposalId === "") && (
            <Modal
              proposal={proposal}
              title="Wyślij Wiadomość"
              style=" bg-navy w-full max-w-[15rem] py-4 px-2 rounded-full mt-4 text-beige border border-beige hover:border-transparent hover:bg-beige hover:text-navy duration-150 ease-out "
              showModal={modalType === "message" && showModal}
              modalName="message"
              modalStyle="max-w-[40rem]"
            >
              <Message
              // setShowModal={setShowModal3}
              // setShowModal={setShowModal}
              // setModalType={setModalType}
              // proposal={proposal}
              />
            </Modal>
          )}

        <div
          className=" bg-navy w-full max-w-[15rem] py-4 px-2 rounded-full my-4 text-beige border border-beige hover:border-transparent hover:bg-beige hover:text-navy duration-150 ease-out text-center cursor-pointer "
          onClick={() => navigate(-1)}
        >
          Wróć do zlecenia
        </div>
      </div>
    );
  }
};

export default SingleProposal;
