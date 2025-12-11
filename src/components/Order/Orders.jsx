import { useState, useCallback, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import { getFilteredOrders } from "../../api";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import Filters from "../Filters";
import Order from "./Order";
import Pagination from "../Pagination";
import Loader from "../Loader";
import { toast } from "react-toastify";
const Orders = () => {
  const { user, isLoading, setIsLoading, filters } = useContext(UserContext);
  const { modalType, showModal } = useContext(ModalContext);
  const [arr, setArr] = useState([]);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState({});

  const fetchOffers = useCallback(() => {
    setIsLoading(true);
    getFilteredOrders(filters, page)
      .then((res) => {
        setArr(res.data.orders);
        setResults(res.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsLoading(false);
      });
  }, [setIsLoading, page, user, filters]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="h-[100vh] overflow-y-scroll flex flex-1 flex-col mb-20 md:mb-0 items-stretch">
      <div className="w-full  fixed z-10 flex self-center justify-evenly items-center mt-10 md:mt-24 max-w-[600px] ">
        <Modal
          title="Filtry"
          style=" bg-amber-100 w-[6rem] text-navy  mt-2  rounded-full cursor-pointer border border-navy py-1"
          modalStyle="w-[90vw] mx-auto max-w-[30rem]"
          modalName="filters"
          showModal={modalType === "filters" && showModal}
        >
          <Filters setPage={setPage} setArr={setArr} page={page} />
        </Modal>
        {user && (
          <Link
            to="/add-order"
            className="bg-amber-100 p-1 px-4  h-full  text-navy rounded-full mt-2 border border-navy"
          >
            Dodaj zlecenie
          </Link>
        )}
      </div>

      <div className="w-full flex   flex-col  justify-center items-center   p-2 mt-6  absolute   ">
        {arr.length === 0 && !isLoading && (
          <h4 className="text-beige mt-40  ">Nie znaleziono żadnych zleceń!</h4>
        )}
        <div className="w-full max-w-[1200px] m-auto grid place-items-center grid-cols-1 md:grid-cols-2  gap-2 p-5 mt-16    md:mt-40  ">
          {arr.length > 0 &&
            arr.map((item, index) => {
              return <Order key={item._id} item={item} />;
            })}
        </div>
        {arr.length > 0 && results.numberOfPages > 1 && (
          <Pagination results={results} page={page} setPage={setPage} />
        )}

        <div className="h-[100px]  md:hidden "></div>
      </div>
    </div>
  );
};

export default Orders;
