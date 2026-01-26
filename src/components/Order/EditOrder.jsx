import { useEffect, useState, useCallback, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  carMakes,
  categories,
  agdCategories,
  rtvCategories,
  computerCategories,
  gardenCategories,
} from "../../constants";
import { editOrder, getOrder } from "../../api";
import { sortCarMakes, getCarModels, getYear, getToken } from "../../utils";
import { ModalContext } from "../../context/ModalContext";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import Switcher from "../Switcher";
import Button from "../Button";
import Modal from "../Modal";
import FileUploader from "../FileUploader";
import DeleteOrder from "../Order/DeleteOrder";
import Loader from "../Loader";

const EditOrder = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const { setShowModal, modalType, showModal } = useContext(ModalContext);
  const { user, setIsLoading, isLoading } = useContext(UserContext);
  const [category, setCategory] = useState("");

  const [agdCategory, setAgdCategory] = useState("");
  const [rtvCategory, setRtvCategory] = useState("");
  const [computerCategory, setComputerCategory] = useState("");
  const [gardenCategory, setGardenCategory] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [mobile, setMobile] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [description, setDescription] = useState("");

  const fetchOrder = useCallback(() => {
    setIsLoading(true);
    getOrder(getToken(), id)
      .then((res) => {
        setCategory(res.data.order.category);
        setLocation(res.data.order.location);
        setMobile(res.data.order.mobile);
        setImages(res.data.order.photos);
        setUrgent(res.data.order.urgent);
        setDescription(res.data.order.description);
        if (res.data.order.agdCategory)
          setAgdCategory(res.data.order.agdCategory);
        if (res.data.order.rtvCategory)
          setRtvCategory(res.data.order.rtvCategory);
        if (res.data.order.computerCategory)
          setComputerCategory(res.data.order.computerCategory);
        if (res.data.order.gardenCategory)
          setGardenCategory(res.data.order.gardenCategory);
        if (res.data.order.make) setMake(res.data.order.make);
        if (res.data.order.model) setModel(res.data.order.model);
        if (res.data.order.engine) setEngine(res.data.order.engine);
        if (res.data.order.year) setYear(res.data.order.year);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsLoading(false);
        navigate(`/order/${id}`);
      });
  }, []);
  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);
  const clearStates = () => {
    setComputerCategory("");
    setGardenCategory("");
    setRtvCategory("");
    setAgdCategory("");
    setMake("");
    setModel("");
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
    console.log("func", func);

    if (func === "setCategory") {
    }
  };
  const handleCategory = (e) => {
    handleChange(setCategory, e);
    clearStates();
  };

  const handleSubmit = () => {
    let data = {
      addedBy: user._id,
      recipientName: user.name,
      recipientEmail: user.email,
      location,
      mobile,
      category,
      agdCategory,
      rtvCategory,
      computerCategory,
      gardenCategory,
      urgent,
      make,
      model,
      year,
      engine,
      description,
      images: images.filter((el) => typeof el === "string"),
      imagesToDelete,
    };
    setIsLoading(true);
    editOrder(getToken(), id, data)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        navigate(`/order/${id}`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsLoading(false);
      });
  };
  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="flex flex-col mx-auto  items-center mt-10 md:mt-20 max-w-[1200px] ">
        <h2 className="mb-4 text-beige text-3xl font-bold">Edycja Zlecenia</h2>
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
                  className="w-full text-gray-700  p-2 focus:outline focus:outline-2 focus:-outline-offset-2 rounded-md  text-sm"
                  onChange={(e) => handleCategory(e)}
                  value={category}
                >
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
                      onChange={(e) => handleChange(setMake, e)}
                      value={make}
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
                {category === "auto" && make !== "" && (
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
                          onChange={(e) => handleChange(setModel, e)}
                          value={model}
                        >
                          <option>Wybierz</option>
                          {getCarModels(make, carMakes).map((n, index) => (
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
                Opis
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
            <div className="mt-4 md:mt-2 mb-4   w-[16rem] md:w-[20rem]  ">
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
          </div>
          {/*  */}

          {/*  */}
        </div>
        <div className="mt-4 w-[16rem] md:w-[20rem]">
          <FileUploader
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
            images={images}
            setImages={setImages}
            orderId={id}
            imagesToDelete={imagesToDelete}
            setImagesToDelete={setImagesToDelete}
            source="order"
          />
        </div>
        <div onClick={handleSubmit} className=" mt-10 mb-8 ">
          <Button
            label="Zapisz zmiany "
            btnStyle=" mb-10 flex mx-auto   space-y-5 md:mt-12  "
          />
        </div>
        <div className=" mb-40 w-[15rem] md:mb-10">
          <Modal
            title="Usuń zlecenie"
            style=" bg-red-800 w-full rounded-full p-4 border-2 border-red-500  hover:bg-white hover:text-red-500 transition duration-300 ease-in-out text-white "
            showModal={modalType === "orderDelete" && showModal}
            setShowModal={setShowModal}
            modalName="orderDelete"
            modalStyle={"max-w-[40rem] mx-2"}
          >
            <DeleteOrder id={id} images={images} category={category} />
          </Modal>
        </div>
      </div>
    );
  }
};

export default EditOrder;
