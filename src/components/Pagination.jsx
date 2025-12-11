import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";

const Pagination = ({ page, setPage, results }) => {
  return (
    <div className="flex items-center justify-between border-t   px-4 py-3 sm:px-6 ">
      <div className="flex flex-col items-center">
        <h5 className="mb-2 text-beige">
          Strona {page} z {results.numberOfPages}
        </h5>
        <div className="flex flex-1 justify-between items-center  ">
          {results?.previous && (
            <TbPlayerTrackPrevFilled
              className=" border-2 cursor-pointer border-beige w-10 h-10 text-beige mr-2 p-2 rounded-lg hover:bg-beige hover:text-navy  transition-transform  duration-200"
              onClick={() => setPage(results.previous.page)}
            />
          )}

          {results?.next && (
            <TbPlayerTrackNextFilled
              className=" border-2 cursor-pointer border-beige w-10 h-10 text-beige ml-2 p-2 rounded-lg  hover:bg-beige hover:text-navy transition-transform  duration-200"
              onClick={() => setPage(results.next.page)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
