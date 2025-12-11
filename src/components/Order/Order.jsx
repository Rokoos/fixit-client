import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { IoMdPin } from "react-icons/io";
import momment from "moment";
import { toast } from "react-toastify";
//////////////////////////////////////
const Order = ({ item }) => {
  const { user } = useContext(UserContext);
  const { location, _id, urgent, category, description, createdAt } = item;
  return (
    <Link
      to={user !== null && `/order/${_id}`}
      className=" w-full flex flex-col items-center "
      onClick={() =>
        user === null &&
        toast.error("Musisz się zalogować", { position: "top-right" })
      }
    >
      <div className="w-full flex flex-col items-center p-2 border border-navy text-gray-700 rounded-lg mb-4 cursor-pointer bg-beige">
        {urgent ? (
          <span className="ml-2 font-bold text-red-700">PILNE!</span>
        ) : (
          <span className="text-transparent">PILNE</span>
        )}
        <div className="flex justify-center">
          <span className="underline text-center mb-2">{`Naprawa - ${category}`}</span>
        </div>

        <div className=" flex flex-row justify-evenly"></div>
        <p className="my-2 text-sm">{description.substring(0, 40)}...</p>

        <div className="flex w-full justify-center items-center mt-1 ">
          <IoMdPin className="h-4 w-4 mr-1 text-navy" />
          <span>{location}</span>
        </div>
        <div>
          <span className="text-sm">
            Dodano: {momment(createdAt).format("L")}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Order;
