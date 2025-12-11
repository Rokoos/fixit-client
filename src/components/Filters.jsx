import { useState, useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { UserContext } from "../context/UserContext";
import Switcher from "./Switcher";
import { IoIosCloseCircle } from "react-icons/io";
import {
  carMakes,
  categories,
  rtvCategories,
  agdCategories,
  gardenCategories,
  computerCategories,
} from "../constants";
import { sortCarMakes, getCarModels, getYear } from "../utils";
const Filters = ({ setPage }) => {
  const { setShowModal, setModalType } = useContext(ModalContext);

  const { setFilters } = useContext(UserContext);
  const [urgent, setUrgent] = useState(false);
  const [category, setCategory] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [engine, setEngine] = useState("");
  const [agdCategory, setAgdCategory] = useState("");
  const [rtvCategory, setRtvCategory] = useState("");
  const [computerCategory, setComputerCategory] = useState("");
  const [gardenCategory, setGardenCategory] = useState("");

  const clearStates = () => {
    setComputerCategory("");
    setGardenCategory("");
    setRtvCategory("");
    setAgdCategory("");
    setCarMake("");
    setCarModel("");
    setEngine("");
    setYear("");
    setLocation("");
  };
  const handleCheckboxChange = () => setUrgent((previous) => !previous);

  const handleChange = (func, e) => {
    if (e.target.value === "Wybierz") {
      return;
    } else {
      func(e.target.value);
    }
  };

  const handleCategory = (e) => {
    handleChange(setCategory, e);
    clearStates();
  };

  const handleFilters = () => {
    let data = {};

    data = {
      category,
      carMake,
      carModel,
      engine,
      year,
      agdCategory,
      rtvCategory,
      computerCategory,
      gardenCategory,
      location,
      urgent,
    };
    setFilters(data);
    setPage(1);
  };

  return (
    <div className="flex flex-col justify-evenly items-center w-full  h-[60vh] overflow-y-scroll pb-8">
      <div className="relative flex flex-row items-center w-full ">
        <IoIosCloseCircle
          onClick={() => {
            setShowModal(false);
            setModalType("");
          }}
          className="absolute w-8 h-8 cursor-pointer   rounded-full top-5 right-5"
          color="#000435"
        />
      </div>
      <h4 className="text-navy mt-4 font-bold">FILTRY</h4>

      {/* Category */}

      <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
        <label
          htmlFor="category"
          className=" block text-sm font-bold  leading-6 text-navy mt-2"
        >
          Kategoria
        </label>
        <div className="relative mt-2 rounded-md flex justify-center">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
          <select
            id="category"
            className="w-full text-gray-700  p-2 focus:outline focus:outline-2 focus:-outline-offset-2 rounded-md outline-navy text-sm"
            onChange={(e) => handleCategory(e)}
            value={category}
          >
            <option>Wybierz</option>
            {categories.map((n, index) => (
              <option value={n} key={index}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Auto */}

      {category === "auto" && (
        <>
          {/* Make */}
          <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
            <label
              htmlFor="category"
              className=" block text-sm font-bold  leading-6 text-navy mt-2"
            >
              Marka
            </label>
            <div className="relative mt-2 rounded-md flex justify-center">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
              <select
                id="category"
                className="w-full text-gray-700  p-2 focus:outline focus:outline-2 focus:-outline-offset-2 rounded-md focus:outline-navy text-sm"
                onChange={(e) => handleChange(setCarMake, e)}
                value={carMake}
              >
                <option>Wybierz</option>
                {sortCarMakes(carMakes).map((n, index) => (
                  <option value={n.brand} key={index}>
                    {n.brand}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Model */}
          {category === "auto" && carMake !== "" && (
            <>
              <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
                <label
                  htmlFor="category"
                  className=" block text-sm font-bold  leading-6 text-navy mt-2"
                >
                  Model
                </label>
                <div className="relative mt-2 rounded-md flex justify-center">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
                  <select
                    id="category"
                    className="w-full text-gray-700  p-2 focus:outline focus:outline-2 focus:-outline-offset-2 rounded-md focus:outline-navy text-sm"
                    onChange={(e) => handleChange(setCarModel, e)}
                    value={carModel}
                  >
                    <option>Wybierz</option>
                    {getCarModels(carMake, carMakes).map((n, index) => (
                      <option value={n} key={index}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* engine */}

              <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
                <label
                  htmlFor="category"
                  className=" block text-sm font-bold  leading-6 text-navy mt-2"
                >
                  Silnik
                </label>
                <div className="relative mt-2 rounded-md flex justify-center">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
                  <select
                    id="category"
                    className="w-full text-gray-700  p-2 focus:outline focus:outline-2 focus:-outline-offset-2 rounded-md focus:outline-navy text-sm"
                    onChange={(e) => handleChange(setEngine, e)}
                    value={engine}
                  >
                    <option>Wybierz</option>
                    <option value="benzyna">benzyna</option>
                    <option value="benzyna/lpg">benzyna/lpg</option>
                    <option value="diesel">diesel</option>
                  </select>
                </div>
              </div>
              {/* year */}
              <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
                <label
                  htmlFor="category"
                  className=" block text-sm font-bold  leading-6 text-navy mt-2"
                >
                  Rocznik
                </label>
                <div className="relative mt-2 rounded-md flex justify-center">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
                  <select
                    id="category"
                    className="w-full text-gray-700  p-2 focus:outline focus:outline-2 focus:-outline-offset-2 rounded-md focus:outline-navy text-sm"
                    onChange={(e) => handleChange(setYear, e)}
                    value={year}
                  >
                    <option>Wybierz</option>
                    {getYear().map((el, i) => (
                      <option value={el} key={i}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {category === "agd" && (
        <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
          <label
            htmlFor="category"
            className=" block text-sm font-bold  leading-6 text-navy mt-2"
          >
            Rodzaj AGD
          </label>
          <div className="relative mt-2 rounded-md flex justify-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
            <select
              id="category"
              className="w-full text-gray-700  p-2 focus:outline focus:outline-2 focus:-outline-offset-2 rounded-md focus:outline-navy text-sm"
              onChange={(e) => handleChange(setAgdCategory, e)}
              value={agdCategory}
            >
              <option>Wybierz</option>
              {agdCategories.map((n, index) => (
                <option value={n} key={index}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {category === "rtv" && (
        <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
          <label
            htmlFor="category"
            className=" block text-sm font-bold  leading-6 text-navy mt-2"
          >
            Rodzaj RTV
          </label>
          <div className="relative mt-2 rounded-md flex justify-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
            <select
              id="category"
              className="w-full text-gray-700  p-2 focus:outline focus:outline-2 focus:-outline-offset-2 rounded-md focus:outline-navy text-sm"
              onChange={(e) => handleChange(setRtvCategory, e)}
              value={rtvCategory}
            >
              <option>Wybierz</option>
              {rtvCategories.map((n, index) => (
                <option value={n} key={index}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {category === "sprzęt komputerowy" && (
        <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
          <label
            htmlFor="category"
            className=" block text-sm font-bold  leading-6 text-navy mt-2"
          >
            Sprzęt Komputerowy
          </label>
          <div className="relative mt-2 rounded-md flex justify-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
            <select
              id="category"
              className="w-full text-gray-700  p-2 focus:outline focus:outline-2 focus:-outline-offset-2 rounded-md focus:outline-navy text-sm"
              onChange={(e) => handleChange(setComputerCategory, e)}
              value={computerCategory}
            >
              <option>Wybierz</option>
              {computerCategories.map((n, index) => (
                <option value={n} key={index}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {category === "sprzęt ogrodniczy" && (
        <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
          <label
            htmlFor="category"
            className=" block text-sm font-bold  leading-6 text-navy mt-2"
          >
            Rodzaj sprzętu
          </label>
          <div className="relative mt-2 rounded-md flex justify-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
            <select
              id="category"
              className="w-full text-gray-700  p-2 focus:outline focus:outline-2 focus:-outline-offset-2 rounded-md focus:outline-navy text-sm"
              onChange={(e) => handleChange(setGardenCategory, e)}
              value={gardenCategory}
            >
              <option>Wybierz</option>
              {gardenCategories.map((n, index) => (
                <option value={n} key={index}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Urgent */}
      <div className=" mt-2 mb-2 w-[16rem] md:w-[20rem]  ">
        <label className=" block text-sm font-bold  leading-6 text-navy">
          Tylko Pilne Zlecenia
        </label>
        <Switcher
          isChecked={urgent}
          switcherStyle="text-navy"
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
      {/*  */}

      {/* Location */}
      <div className=" mt-2 mb-2 w-[16rem] md:w-[20rem]  ">
        <label
          htmlFor="location"
          className=" block text-sm font-bold  leading-6 text-navy"
        >
          Lokalizacja
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
            type="location"
            name="location"
            id="location"
            value={location}
            className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-navy text-sm sm:leading-6 focus:outline-none"
            placeholder="np. Marki"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <button
        className="p-2 px-4 mt-2 bg-navy border-2 border-transparent text-beige w-[10rem] rounded-lg hover:bg-beige hover:text-navy hover:border-navy transition duration-300 ease-in-out "
        onClick={() => {
          setShowModal(false);
          setModalType("");
          handleFilters("filter");
        }}
      >
        Zastosuj
      </button>
      <button
        className="p-2 px-4 mt-2 bg-navy border-2 border-transparent text-beige w-[10rem] rounded-lg hover:bg-beige hover:text-navy hover:border-navy transition duration-300 ease-in-out "
        onClick={() => {
          setShowModal(false);
          setModalType("");
          setFilters({
            carMake: "",
            carModel: "",
            engine: "",
            year: "",
            agdCategory: "",
            rtvCategory: "",
            computerCategory: "",
            gardenCategory: "",
            location: "",
            urgent: "",
            category: "",
          });
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Filters;
