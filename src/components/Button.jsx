const Button = ({ label, iconUrl, style, disabled }) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 px-7 py-4 border-2 font-montserrat sm:text-sm  leading-none bg-beige rounded-full text-navy  min-w-[15rem] border-transparent hover:text-beige hover:bg-navy hover:border-2 hover:border-beige transition duration-300 ease-in-out hover:font-bold ${style}`}
      disabled={disabled}
    >
      {label}
      {iconUrl && (
        <img
          src={iconUrl}
          alt="ArrowRight"
          className="ml-2 rounded-full  flex justify-self-end w-5 h-5  "
        />
      )}
    </button>
  );
};

export default Button;
