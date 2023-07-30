import Image from "next/image";
import Link from "next/link";
import { Post } from "../BlogHomepage";
import { useContext } from "react";
import { AppContext } from "../../utils/AppContext";
import { readTime } from "../../utils/readTime";

const BlogListItem = ({ post }: { post: Post }) => {
  const { blogActiveIndex } = useContext(AppContext);

  const { slug, title, excerpt, content, featuredImage, author } = post;

  // Storing value on clicking a blog link
  const handleClick = () => {
    sessionStorage.setItem("blogActiveIndex", JSON.stringify(blogActiveIndex));
  };

  // For lengthy excerpts, making it limit to 20 words only
  let newExcerpt = excerpt;
  if (excerpt.split(" ").length > 20) {
    newExcerpt = excerpt.split(" ").slice(0, 20).join(" ").concat("...");
  }

  return (
    <li
      key={slug}
      className="flex flex-col items-start justify-start w-full max-w-xl"
    >
      <Link href={`/${slug}`} onClick={handleClick}>
        <Image
          src={
            featuredImage
              ? featuredImage?.node.sourceUrl
              : "/assets/welcome.jpg"
          }
          className="rounded-3xl md:max-h-[250px] md:min-h-[250px]"
          alt=""
          width={600}
          height={200}
        />
      </Link>
      <div className="flex flex-col items-start justify-between py-4 space-y-4 w-full">
        <Link href={`/${slug}`} onClick={handleClick}>
          <h2 className="text-lg font-semibold text-[#1F3A6E] md:text-lg">
            {title}
          </h2>
        </Link>
        <div
          dangerouslySetInnerHTML={{ __html: newExcerpt }}
          className="text-[#6E7477] text-sm"
        />
        <div className="flex items-center justify-between w-full">
          <h3 className="text-sm font-medium">{author.node.name}</h3>
          {content && (
            <p className="text-sm font-medium">{`${readTime(
              content,
            )} min read`}</p>
          )}
        </div>
      </div>
    </li>
  );
};

export default BlogListItem;