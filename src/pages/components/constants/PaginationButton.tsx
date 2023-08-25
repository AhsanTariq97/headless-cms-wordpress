import React from "react";

interface PaginationButtonProps {
  index: number;
  activeIndex: number | null;
  paginateFn: (index: number) => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  index,
  activeIndex,
  paginateFn,
}) => {
  return (
    <>
      <button
        className={`${
          activeIndex === index
            ? "bg-[#3e536e] text-white dark:bg-gray-200 dark:text-black"
            : "border border-gray-300"
        } h-[45px] w-[45px] rounded-full shadow-xl`}
        key={index}
        onClick={() => paginateFn(index)}
      >
        {index + 1}
      </button>
    </>
  );
};

export default PaginationButton;
