import { useState, useEffect, RefObject } from "react";

const ReadingProgress = ({
  progressBarRef,
}: {
  progressBarRef: RefObject<HTMLDivElement>;
}) => {
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollListener = () => {
    const element = progressBarRef.current;
    if (!element) return;

    const windowsHeight = window.innerHeight;

    const contentHeight = element?.getBoundingClientRect().height;
    const contentTop = element?.getBoundingClientRect().top;
    const contentBottom = element?.getBoundingClientRect().bottom;

    const windowScroll = window.scrollY || 0;

    if (contentTop >= windowsHeight) {
      return setReadingProgress(0);
    }
    if (contentBottom <= windowsHeight) {
      return setReadingProgress(100);
    }
    setReadingProgress(((windowScroll - 245) / contentHeight) * 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  });

  return (
    <div
      className={`fixed left-0 top-0 z-[100] h-1 bg-[#473743] dark:bg-slate-300`}
      style={{ width: `${readingProgress}%` }}
    />
  );
};

export default ReadingProgress;
