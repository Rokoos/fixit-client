import { useCallback, useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { getUsers, getOrders } from "../../api";
import { Link } from "react-router-dom";
import Loader from "../Loader";

const Dashboard = () => {
  const { isLoading, setIsLoading } = useContext(UserContext);
  const [arr, setArr] = useState([]);
  const [data, setData] = useState("users");
  const [page, setPage] = useState(1);
  const fetchData = useCallback(() => {
    setIsLoading(true);
    if (data === "users") {
      getUsers(page)
        .then((res) => {
          console.log("res.data", res.data);
          setArr(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setIsLoading(false);
        });
    } else if (data === "orders") {
      getOrders()
        .then((res) => {
          console.log("res.data", res.data);
          setArr(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setIsLoading(false);
        });
    }
  }, [data]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className=" flex flex-col items-center mt-20 md:mt-40 max-w-[1200px] mb-40">
      {data === "users" ? (
        <button
          onClick={() => setData("orders")}
          className="bg-beige text-navy rounded-md p-2 mb-4"
        >
          Wczytaj Zlecenia
        </button>
      ) : (
        <button
          onClick={() => setData("users")}
          className="bg-beige text-navy rounded-md p-2 mb-4"
        >
          Wczytaj Użytkowników
        </button>
      )}
      {arr.length > 0 &&
        arr.map((el) => (
          <Link
            to={`/profile/${el._id}`}
            key={el._id}
            className="bg-beige my-2   text-navy rounded-lg p-4 w-[80%]"
          >
            {data === "users" ? (
              <div className="flex flex-row justify-between">
                <span>{`${el.name} ${el.surname}`}</span>
                <span>{`${el.email} `}</span>
              </div>
            ) : (
              <div className=" flex flex-row justify-between">
                <span>{`${el.category} `}</span>
                <span className="hidden md:block">{`${el.description.substring(
                  0,
                  20
                )} `}</span>
                <Link
                  to={`/profile/${el.addedBy._id}`}
                >{`${el.addedBy.name} ${el.addedBy.surname}`}</Link>
              </div>
            )}
          </Link>
        ))}
    </div>
  );
};

export default Dashboard;
