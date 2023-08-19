import React from "react";
import { useRef, useState, useEffect } from "react";

import CopyCode from "./constants/CopyCode";
import ReadingProgress from "./constants/ReadingProgress";
import ImageLightbox from "./constants/ImageLightbox";
import TableOfContent from "./constants/TableOfContent";
import SidebarSubscribeForm from "./constants/SidebarSubscribeForm";
import SidebarShare from "./constants/SidebarShare";

type BlogContentProps = {
  headings: Element[];
  processedContent: any;
};

const BlogContent = ({ headings, processedContent }: BlogContentProps) => {
  // Making the sidebar fix at its position when scrolling the blog
  // We have the sidebar initially placed beside the content via flex
  // On scrolling down, when the top position of the blog content reaches 120px (navbar height) from the top of viewport, we fix the sidebar at that location (via fixSidebar state)
  // When we reach bottom of blog and its bottom matches the sidebar bottom, we set fixSidebarBottom to true (both fixSidebar and fixSidebarBottom are true and thus we make position absolute set at bottom)
  // On scrolling back up, we need the sidebar to fix again when blog content appears. So we apply condition that if top position of sidebar becomes greater than 120, we set the fixSidebarBottom to false and set classes based on fixSidebar state (according to ternary)
  // Check ternary statements and browser inspect to see how the classes changes

  const [fixSidebarTop, setFixSidebarTop] = useState(false);
  const [fixSidebarBottom, setFixSidebarBottom] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const myContentRef = useRef<HTMLDivElement>(null);
  const mySidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Using ref to reference the blog content and getting its top and bottom position
    const rectContent = myContentRef.current?.getBoundingClientRect();
    const topPositionContent = rectContent?.top;
    const bottomPositionContent = rectContent?.bottom;

    // Using ref to reference the blog sidebar and getting its top and bottom position
    const rectSidebar = mySidebarRef.current?.getBoundingClientRect();
    const topPositionSidebar = rectSidebar?.top;
    const bottomPositionSidebar = rectSidebar?.bottom;

    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setScrollPosition(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Condition for fixing sidebar to top
    topPositionContent! < 120
      ? setFixSidebarTop(true)
      : setFixSidebarTop(false);

    // Condition for fixing sidebar to bottom
    bottomPositionSidebar! > bottomPositionContent!
      ? setFixSidebarBottom(true)
      : setFixSidebarBottom(false);

    // Condition for fixing sidebar to top again on scrolling back up
    {
      fixSidebarTop && fixSidebarBottom && topPositionSidebar! > 120
        ? setFixSidebarBottom(false)
        : null;
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const renderContent = () => {
    // Split the content based on the code sections
    const sections = processedContent?.split(
      /<pre class="wp-block-code"><code>(.*?)<\/code><\/pre>/s,
    );
    return (
      <div>
        {sections?.map((section: any, index: number) => {
          if (
            index % 2 === 0 &&
            !section.includes('<figure class="wp-block-image')
          ) {
            // This is a regular content section
            return (
              <div key={index} dangerouslySetInnerHTML={{ __html: section }} />
            );
          } else if (
            index % 2 === 0 &&
            section.includes('<figure class="wp-block-image')
          ) {
            const figSections = section.split(
              /<figure class="wp-block-image[^>]*>(.*?)<\/figure>/s,
            );
            return (
              <>
                {figSections?.map((figSection: any, index: number) => {
                  if (index % 2 === 0) {
                    // This is a regular content section
                    return (
                      <div
                        key={index}
                        dangerouslySetInnerHTML={{ __html: figSection }}
                      />
                    );
                  } else {
                    // This is a figure section
                    const imageUrl = figSection;
                    return <ImageLightbox imageUrl={imageUrl} />;
                  }
                })}
              </>
            );
          } else {
            // This is a code section
            const code = section;
            return <CopyCode key={index} code={code} />;
          }
        })}
      </div>
    );
  };

  const progressBarRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="w-full max-w-screen-xl">
        <div className="flex flex-row items-start justify-between">
          <div ref={myContentRef} className={`w-full text-left`}>
            <div
              ref={progressBarRef}
              className="min-w-full prose text-black dark:text-white dark:prose-headings:text-white lg:prose-lg prose-a:text-blue-400 hover:prose-a:text-blue-600 prose-a:no-underline prose-headings:underline prose-figcaption:text-center prose-img:rounded-2xl"
            >
              {renderContent()}
            </div>
            <ReadingProgress progressBarRef={progressBarRef} />
          </div>

          <div
            ref={mySidebarRef}
            className={` p-2 pl-8 hidden md:flex flex-col justify-between items-start space-y-8`}
          >
            {headings.length > 0 && <TableOfContent headings={headings} />}
            <SidebarSubscribeForm />
            <SidebarShare />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogContent;
