import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { MdAddAPhoto } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import Resizer from "react-image-file-resizer";

const FileUploader = ({
  images,
  setImages,
  setImagesToDelete,
  imagesToDelete,
}) => {
  let location = useLocation();

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      toast.warning("Use smaller image");
    } else {
      fileChangedHandler(file);
    }
  };

  const fileChangedHandler = (file) => {
    Resizer.imageFileResizer(
      file,
      250,
      250,
      "JPEG",
      100,
      0,
      async (uri) => {
        setImages([...images, uri]);
      },
      "base64"
    );
  };

  const handleDelete = (id) => {
    if (typeof id === "string") {
      let arr2 = imagesToDelete;
      const arr1 = images.filter((el) => {
        if (el.public_id === id) arr2.push(el.public_id);

        return el.public_id !== id;
      });

      setImages(arr1);
      setImagesToDelete(arr2);
    } else if (typeof id === "number") {
      let arr = [];
      arr = images.filter((el, i) => i !== id);
      setImages(arr);
    }
  };

  return (
    <Fragment>
      {images?.length === 0 ? (
        <div className=" rounded-lg mb-4  flex justify-center">
          <MdAddAPhoto className=" w-full h-[150px] text-navy p-5  bg-beige rounded-lg" />
        </div>
      ) : (
        <div className=" flex flex-col justify-center items-center">
          {images?.map((el, i) => (
            <Fragment key={el.public_id || i}>
              <div className="relative flex flex-row items-center w-full ">
                <IoIosCloseCircle
                  className="absolute w-6 h-6 cursor-pointer bg-white border-none rounded-full text-red-800 $
                     top-1 right-1 "
                  onClick={() => handleDelete(el.public_id || i)}
                />
              </div>
              <img
                src={el.url || el}
                className=" w-full rounded-lg mb-3"
                alt=""
              />
            </Fragment>
          ))}
        </div>
      )}

      {images?.length < 3 && (
        <label className=" block font-bold  leading-6 text-navy bg-beige px-3 py-1 text-center rounded-lg cursor-pointer">
          {`${
            images?.length === 0 ? "Dodaj zdjęcie" : "Dodaj kolejne zdjęcie"
          }  `}
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="border-2 border-coral-red"
          />
        </label>
      )}
    </Fragment>
  );
};

export default FileUploader;
