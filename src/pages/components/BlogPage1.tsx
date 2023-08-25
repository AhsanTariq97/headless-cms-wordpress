import Image from "next/image";
import BlogContent from "./BlogContent";
import Link from "next/link";
import { readTime } from "../utils/readTime";
import { useEffect, useState } from "react";
import { Post } from "./BlogHomepage";

const BlogPage1 = ({ post }: { post: Post }) => {
  // Adding id attribute to all the h tags in the content
  let sectionIndex = 0;
  const processedContent = post.content?.replace(
    /<(h[1-6])/g,
    (_: any, p1: any) => {
      sectionIndex++;
      return `<${p1} id="section${sectionIndex}" class="before:block before:h-[100px] before:-mt-[100px]"`;
    },
  );

  // Creating an array of headings from the content, so we can display them in the sidebar
  const [headings, setHeadings] = useState<Element[]>([]);
  useEffect(() => {
    const content = processedContent;
    const parser = new DOMParser();
    const parsedContent = parser.parseFromString(content, "text/html");
    const headings = parsedContent.querySelectorAll("h1, h2, h3, h4, h5, h6");
    setHeadings(Array.from(headings));
  }, [processedContent]);

  return (
    <div className="flex flex-col items-start justify-between space-y-16 px-6 pb-16 md:px-8">
      <Image
        data-aos="fade-up"
        className="self-center rounded-3xl md:h-[80vh]"
        src={
          post.featuredImage
            ? post.featuredImage.node.sourceUrl
            : "/assets/welcome.jpg"
        }
        width={800}
        height={500}
        alt=""
      />
      <h1 data-aos="fade-up" className="w-full text-left text-4xl font-bold">
        {post.title}
      </h1>
      <div className="flex items-center justify-start space-x-16">
        <h3 className="text-lg font-medium">{post.author.node.name}</h3>
        {post.content && <p>{`${readTime(processedContent)} min read`}</p>}
      </div>
      <BlogContent headings={headings} processedContent={processedContent} />
      <Link href="/blog">&larr; Back to Blog</Link>
    </div>
  );
};

export default BlogPage1;
