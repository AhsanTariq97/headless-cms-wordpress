import Link from "next/link";

const TableOfContent = ({ headings }: { headings: any }) => {
  // Scroll to the heading but without href id which modifies the URL too.
  const smoothScrollTo = (index: number) => {
    const id = `section${index + 1}`;
    const element = document.getElementById(id);
    element!.scrollIntoView({
      block: "start",
      behavior: "smooth", // smooth scroll
    });
  };

  return (
    <div className="w-full rounded-3xl border border-[#c7c7c7] px-4 py-2 ">
      <div className="flex flex-col space-y-4 py-2">
        <h3 className="text-lg font-bold">Table of Contents</h3>
        <div className="flex flex-col space-y-2">
          {Array.from(headings).map((heading: any, index) => (
            <Link
              href={`#section${index + 1}`}
              onClick={(event) => {
                event.preventDefault();
                smoothScrollTo(index);
              }}
            >
              <p key={heading.textContent} className="text-sm">
                {heading.textContent}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOfContent;
