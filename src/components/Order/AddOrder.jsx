import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  carMakes,
  categories,
  rtvCategories,
  agdCategories,
  gardenCategories,
  computerCategories,
} from "../../constants";
import { sortCarMakes, getCarModels, getYear, token } from "../../utils";
import { addOrder } from "../../api";
import { UserContext } from "../../context/UserContext";
import Switcher from "../Switcher";
import { toast } from "react-toastify";
import Button from "../Button";
import FileUploader from "../FileUploader";

const AddOrder = () => {
  let navigate = useNavigate();

  const { user, setIsLoading } = useContext(UserContext);
  const [category, setCategory] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [engine, setEngine] = useState("");
  const [agdCategory, setAgdCategory] = useState("");
  const [rtvCategory, setRtvCategory] = useState("");
  const [computerCategory, setComputerCategory] = useState("");
  const [gardenCategory, setGardenCategory] = useState("");
  const [year, setYear] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const clearStates = () => {
    setComputerCategory("");
    setGardenCategory("");
    setRtvCategory("");
    setAgdCategory("");
    setCarMake("");
    setCarModel("");
    setEngine("");
    setYear("");
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

  const handleSubmit = () => {
    setIsLoading(true);

    let newOrder = {
      addedBy: user._id,
      location,
      category,
      make: carMake,
      model: carModel,
      year,
      engine,
      agdCategory,
      rtvCategory,
      computerCategory,
      gardenCategory,
      description,
      images,
      urgent,
    };

    addOrder(token, newOrder)
      .then((response) => {
        setIsLoading(false);
        toast.success(response.data.message);
        navigate(`/profile/${user._id}`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col mx-auto  items-center mt-10 md:mt-20 max-w-[1200px] ">
      <h2 className="mb-4 text-beige text-3xl font-bold">Dodaj Zlecenie</h2>
      <div className="flex flex-col md:flex-row  md:justify-center">
        <div className="flex flex-col  md:mr-10">
          {/* Category */}

          <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
            <label
              htmlFor="category"
              className=" block text-sm font-bold  leading-6 text-beige mt-2"
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

          {/*  */}

          {category === "auto" && (
            <>
              {/* Make */}
              <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
                <label
                  htmlFor="category"
                  className=" block text-sm font-bold  leading-6 text-beige mt-2"
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
                      className=" block text-sm font-bold  leading-6 text-beige mt-2"
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
                      className=" block text-sm font-bold  leading-6 text-beige mt-2"
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
                      className=" block text-sm font-bold  leading-6 text-beige mt-2"
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
                className=" block text-sm font-bold  leading-6 text-beige mt-2"
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
                className=" block text-sm font-bold  leading-6 text-beige mt-2"
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
                className=" block text-sm font-bold  leading-6 text-beige mt-2"
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
                className=" block text-sm font-bold  leading-6 text-beige mt-2"
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
          {/*  */}
        </div>
        <div className="flex flex-col  md:ml-10  ">
          {/* Urgent */}

          <div className=" mt-2 mb-2 w-[16rem] md:w-[20rem] md:mt-6 ">
            <label className=" block text-sm font-bold  leading-6 text-beige">
              Pilne zlecenie
            </label>
            <Switcher
              isChecked={urgent}
              switcherStyle="text-beige"
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          {/*Description */}
          <div className="  mt-4 md:mt-0 mb-4 w-[16rem] md:w-[20rem] ">
            <label
              htmlFor="age"
              className=" block text-sm font-bold  leading-6 text-beige mt-2"
            >
              Opis zlecenia
            </label>
            <div className="mt-2 flex flex-col  w-full">
              <textarea
                value={description}
                placeholder="Opisz sytuację"
                className="border text-sm text-gray-700 p-2 h-[20vh] border-beige w-full rounded-lg text-wrap focus:outline-none"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <span
                className={`mx-auto mt-2 text-sm ${
                  description.length > 1000 ? "text-red-700" : "text-beige"
                } `}
              >
                {description.length} of 1000
              </span>
            </div>
          </div>
          {/*  */}
          {/* Location */}
          <div className="mt-4 mb-4   w-[16rem] md:w-[20rem]  ">
            <label
              htmlFor="locations"
              className=" block text-sm font-bold  leading-6 text-beige mb-2"
            >
              Lokalizacja
            </label>

            <div className="flex flex-row  justify-between items-center  border  rounded-lg  mb-2">
              <textarea
                onChange={(e) => setLocation(e.target.value)}
                rows="1"
                value={location}
                placeholder="np. Warszawa, Wawer "
                className="w-full rounded-lg  placeholder:text-sm  py-1 text-sm text-gray-700 px-2"
              ></textarea>
            </div>
          </div>

          {/* Mobile */}
        </div>
        {/*  */}

        {/*  */}
      </div>
      {/* photo */}
      <div className="my-8 w-[16rem] ">
        <FileUploader
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          images={images}
          setImages={setImages}
          source="order"
        />
      </div>
      <div onClick={handleSubmit} className=" mt-10 mb-40 ">
        <Button
          label="Dodaj Zlecenie "
          btnStyle=" flex mx-auto   space-y-5 md:mt-12  "
        />
      </div>
    </div>
  );
};

export default AddOrder;
