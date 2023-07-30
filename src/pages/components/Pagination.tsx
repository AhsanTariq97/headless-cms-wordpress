import { useContext } from "react";
import { AppContext } from "../utils/AppContext";
import PaginationButton from "./constants/PaginationButton";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({
  fetchMore,
  noOfPages,
}: {
  fetchMore: any;
  noOfPages: number;
}) => {
  const {
    blogActiveIndex,
    setBlogActiveIndex,
    BATCH_SIZE,
    RANGE_FORWARD_BACKWARD,
  } = useContext(AppContext);

  // Setting offset value based on pagination
  const paginateFn = (index: string | number) => {
    let offset: number;

    if (index === "prev") {
      setBlogActiveIndex(blogActiveIndex! - 1);
      offset = blogActiveIndex! * BATCH_SIZE - BATCH_SIZE;
    } else if (index === "next") {
      setBlogActiveIndex(blogActiveIndex! + 1);
      offset = blogActiveIndex! * BATCH_SIZE + BATCH_SIZE;
    } else {
      setBlogActiveIndex(Number(index));
      offset = Number(index) * BATCH_SIZE;
    }

    fetchMore({
      variables: { offset },
      updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return previousResult;
        return fetchMoreResult;
      },
    });
  };

  return (
    <div className="flex items-center justify-between space-x-1 text-sm xs:space-x-2 md:space-x-4 xs:text-base sm:text-lg">
      <button
        disabled={blogActiveIndex === 0}
        onClick={() => paginateFn("prev")}
        className={`${
          blogActiveIndex === 0 ? "cursor-default opacity-25" : ""
        } w-[45px] h-[45px] border border-gray-300 rounded-full shadow-xl`}
      >
        <IoIosArrowBack size={20} className="mx-auto" />
      </button>
      {Array.from({ length: noOfPages }, (_, index) => {
        //For less than 5 pages, show all pagination. If greater than 5, we go to else condition
        if (noOfPages <= 5) {
          return (
            <PaginationButton
              index={index}
              activeIndex={blogActiveIndex}
              paginateFn={paginateFn}
            />
          );
        } else {
          if (blogActiveIndex === 0) {
            /*If blogActiveIndex is 0, then we show the first 3 and then the last one*/
            if (index < 3) {
              return (
                <PaginationButton
                  index={index}
                  activeIndex={blogActiveIndex}
                  paginateFn={paginateFn}
                />
              );
            }
            if (index === noOfPages - 1) {
              return (
                <>
                  <button className="cursor-default">...</button>
                  <PaginationButton
                    index={index}
                    activeIndex={blogActiveIndex}
                    paginateFn={paginateFn}
                  />
                </>
              );
            }
          } else if (blogActiveIndex === noOfPages - 1) {
            /*If blogActiveIndex is the last one, then we show the last 3 and the 1st one*/
            if (index === 0) {
              return (
                <>
                  <PaginationButton
                    index={index}
                    activeIndex={blogActiveIndex}
                    paginateFn={paginateFn}
                  />
                  <button className="cursor-default">...</button>
                </>
              );
            }
            if (index > noOfPages - 1 - 3) {
              return (
                <PaginationButton
                  index={index}
                  activeIndex={blogActiveIndex}
                  paginateFn={paginateFn}
                />
              );
            }
          } else {
            /*If blogActiveIndex is somewhere in between 1st and last, then we show one forward and one backward of the blogActiveIndex and 1st and last*/
            if (index === 0) {
              return (
                <>
                  <PaginationButton
                    index={index}
                    activeIndex={blogActiveIndex}
                    paginateFn={paginateFn}
                  />
                  {blogActiveIndex! <= RANGE_FORWARD_BACKWARD + 1 ? (
                    ""
                  ) : (
                    <button className="cursor-default">...</button>
                  )}
                </>
              );
            }
            // Shows forward and backward of blogActiveIndex based on RANGE_FORWARD_BACKWARD value
            if (index > 0 && index < noOfPages - 1) {
              if (
                index >= blogActiveIndex! - RANGE_FORWARD_BACKWARD &&
                index <= blogActiveIndex! + RANGE_FORWARD_BACKWARD
              ) {
                return (
                  <PaginationButton
                    index={index}
                    activeIndex={blogActiveIndex}
                    paginateFn={paginateFn}
                  />
                );
              }
            }
            if (index === noOfPages - 1) {
              return (
                <>
                  {blogActiveIndex! >=
                  noOfPages - 1 - RANGE_FORWARD_BACKWARD - 1 ? (
                    ""
                  ) : (
                    <button className="cursor-default">...</button>
                  )}
                  <PaginationButton
                    index={index}
                    activeIndex={blogActiveIndex}
                    paginateFn={paginateFn}
                  />
                </>
              );
            }
          }
        }
      })}
      <button
        disabled={blogActiveIndex === noOfPages - 1}
        onClick={() => paginateFn("next")}
        className={`${
          blogActiveIndex === noOfPages - 1 ? "cursor-default opacity-25" : ""
        } w-[45px] h-[45px] border border-gray-300 rounded-full shadow-xl`}
      >
        <IoIosArrowForward size={20} className="mx-auto" />
      </button>
    </div>
  );
};

export default Pagination;
