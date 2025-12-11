import { FiStar } from "react-icons/fi";
export default function StarRatings({ stars, setStars }) {
  return (
    <div className="flex bg-beige items-center justify-between  ">
      <div className="flex gap-2 p-2 mb-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex justify-center">
            <FiStar
              size={25}
              strokeWidth={0}
              fill={index + 1 <= stars ? "gold" : "#D6DBDF"}
              cursor="pointer"
              className="star hover:fill-yellow-500 duration-150"
              onClick={() => setStars(index + 1)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
