import Image from "next/image";
import Link from "next/link";
import { Post } from "../BlogHomepage";
import { useContext } from "react";
import { AppContext } from "../../utils/AppContext";
import { readTime } from "../../utils/readTime";
import { truncateText } from "@/pages/utils/truncateText";

const BlogListItem = ({ post }: { post: Post }) => {
  const { blogActiveIndex } = useContext(AppContext);

  const { slug, title, excerpt, content, featuredImage, author } = post;

  // Storing value on clicking a blog link
  const handleClick = () => {
    sessionStorage.setItem("blogActiveIndex", JSON.stringify(blogActiveIndex));
  };

  return (
    <li
      key={slug}
      className="flex w-full max-w-xl flex-col items-start justify-start"
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
      <div className="flex w-full flex-col items-start justify-between space-y-4 py-4">
        <Link href={`/${slug}`} onClick={handleClick}>
          <h2 className="text-lg font-semibold text-[#1F3A6E] dark:text-white md:text-lg">
            {title}
          </h2>
        </Link>
        <div
          dangerouslySetInnerHTML={{
            __html: truncateText(excerpt, 20) as string,
          }}
          className="text-sm text-[#6E7477] dark:text-gray-400"
        />
        <div className="flex w-full items-center justify-between">
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
