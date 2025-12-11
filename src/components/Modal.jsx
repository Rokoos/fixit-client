import { useState, useContext, useEffect } from "react";
import { deleteReview } from "../api";
import { ModalContext } from "../context/ModalContext";

export default function Modal({
  children,
  title,
  style,
  modalStyle,
  showModal,
  modalName,
}) {
  const { setShowModal, setModalType } = useContext(ModalContext);

  return (
    <>
      <button
        className={`  h-full ${style} `}
        onClick={() => {
          setModalType(modalName);
          setShowModal(true);
        }}
      >
        {title}
      </button>

      {showModal ? (
        <>
          <div
            className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-full  `}
          >
            <div className={`relative w-full my-6   ${modalStyle} `}>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none ">
                {/*header*/}

                {/*body*/}
                <div className="flex flex-col justify-center items-center bg-beige  mt-5 p-2 rounded-lg ">
                  {children}
                </div>

                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
