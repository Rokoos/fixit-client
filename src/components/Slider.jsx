import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = ({ images }) => {
  return (
    <div className="w-[90%] max-w-[40rem] mx-auto text-center ">
      <Carousel
        renderIndicator={false}
        showThumbs={images.length > 1 ? true : false}
        thumbWidth={50}
        showStatus={false}
        showArrows
      >
        {images.map((el) => (
          <img
            key={el.public_key}
            className="w-full  rounded-xl"
            src={el.url}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
