import Button from "./Button";
import { arrowRight } from "../assets/icons";
import { shoes, statistics } from "../constants";
// import { bigShoe1, nannyHero } from "../assets/images";
import { theNannys } from "../nannys";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className=" w-full flex xl:flex-row flex-col xl:mt-60  justify-center  max-container ">
        <div className=" mt-20 xl:w-3/5 xl:mt-10  flex flex-col justify-center items-center">
          <span className="text-coral-red mt-10 xl:mt-0 font-palanquin text-3xl min-[360px]:text-4xl md:text-8xl max-sm:leading-[82px] font-bold  ">
            Warsaw Nanny
          </span>
        </div>
      </div>
      <div className="hidden md:flex justify-center max-w-[1600px] max-container">
        <div className=" flex w-4/5  justify-center items-center mb-10 ">
          <Link to="/signup" className="md:w-1/2  flex justify-center my-3">
            <Button label="Register" iconUrl={arrowRight} />
          </Link>
          <span className="text-coral-red font-bold">OR</span>
          <Link to="/signin" className="md:w-1/2 flex justify-center my-3">
            <Button label="Login" iconUrl={arrowRight} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
