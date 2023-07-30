import React, { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";

function useOutsideAlerter(
  ref: any,
  isVisible: boolean,
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (ref.current && !ref.current.contains(event.target) && isVisible) {
        setIsVisible((prev) => !prev);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isVisible, setIsVisible]);
}

const ImageLightbox = ({ imageUrl }: { imageUrl: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoom, setIsZoom] = useState(false);
  const imageRef = useRef(null);

  useOutsideAlerter(imageRef, isOpen, setIsOpen);
  console.log("imageUrl", imageUrl);
  const onlyImage = imageUrl.replace(
    /<figcaption\b[^>]*>(.*?)<\/figcaption>/i,
    "",
  );
  console.log("onlyImage", onlyImage);

  return (
    <>
      <figure className="wp-block-image" onClick={() => setIsOpen(true)}>
        <div dangerouslySetInnerHTML={{ __html: imageUrl }} />
      </figure>
      {isOpen && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/90">
          <div
            ref={imageRef}
            className="relative max-w-[90%] max-h-[90%] overflow-hidden bg-transparent rounded-xl"
          >
            <div
              className={`max-w-full max-h-full cursor-zoom-in ${
                isZoom && "scale-150 cursor-zoom-out"
              }`}
              dangerouslySetInnerHTML={{ __html: onlyImage }}
              onClick={() => setIsZoom((prev) => !prev)}
            />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="fixed top-4 right-4"
          >
            <IoClose size={35} className="text-white/80" />
          </button>
        </div>
      )}
    </>
  );
};

export default ImageLightbox;
