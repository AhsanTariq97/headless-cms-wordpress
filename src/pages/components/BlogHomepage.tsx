import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect } from "react";
import { AppContext } from "../utils/AppContext";
import BlogListItem from "./constants/BlogListItem";
import Pagination from "./Pagination";

const BlogHomepage = ({ posts }: any) => {
  const { blogActiveIndex, setBlogActiveIndex, BATCH_SIZE } =
    useContext(AppContext);

  // To keep record of the active index
  // 1. For highlighting the current page in pagination
  // 2. This value is stored in session storage whenever user reloads or opens a blog, so that when user navigates back they land onto the same page (pagination) user left
  // 3. You can use queries for that too, by passing queries in url as we navigate to the new page.
  //    We will pass blogActiveIndex to the individual blog page, then pass it back from there when we go back to the blog home page.
  //    We also have to add popstate event handler so that we can pass currentIndex in case user press browser back button.
  //    But the problem in this method was that we can't store the userIndex value when user reloads the page. Forcing us to go to the 1st page.

  // Accessing the stored value from session storage
  useEffect(() => {
    const storedState = sessionStorage.getItem("blogActiveIndex");
    if (storedState === null) {
      setBlogActiveIndex(0);
    } else {
      setBlogActiveIndex(JSON.parse(storedState));
    }
  }, []);

  //Storing blogActiveIndex on reloading the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem(
        "blogActiveIndex",
        JSON.stringify(blogActiveIndex),
      );
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [blogActiveIndex]);

  // Fetching initial posts depending on the active index
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      size: BATCH_SIZE,
      offset: blogActiveIndex ? blogActiveIndex * BATCH_SIZE : 0,
    },
    notifyOnNetworkStatusChange: true,
  });

  let postsData;
  postsData = data?.posts.edges.map((edge: any) => edge.node);
  // postsData = posts;
  const totalPosts = data?.posts.pageInfo.offsetPagination.total || 0;
  const noOfPages = Math.ceil(totalPosts / BATCH_SIZE);

  // Error or in process of loading
  if (error) {
    return <p>Error occured</p>;
  }
  if (!data && loading) {
    return (
      <div role="status" className="h-[75vh] flex justify-center items-center">
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#7187A2]"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (!data?.posts.edges.length) {
    return <p>No posts</p>;
  }

  return (
    <div className="flex flex-col justify-between items-center space-y-8 py-8 w-[90%] mx-auto">
      <h2
        data-aos="fade-down"
        className="text-2xl font-bold md:text-3xl py-4 [text-shadow:_0_10px_20px_rgb(0_0_0_/_20%)]"
      >
        Blogs
      </h2>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {postsData?.map((post: any) => <BlogListItem post={post} />)}
      </ul>
      <Pagination fetchMore={fetchMore} noOfPages={noOfPages} />
    </div>
  );
};

export default BlogHomepage;

const GET_POSTS = gql`
  query GetWordPressPosts($offset: Int!, $size: Int!) {
    posts(
      where: {
        offsetPagination: { offset: $offset, size: $size }
        orderby: { field: DATE, order: DESC }
      }
    ) {
      pageInfo {
        offsetPagination {
          hasMore
          total
        }
      }
      edges {
        node {
          content
          excerpt
          slug
          title
          featuredImage {
            node {
              sourceUrl
            }
          }
          author {
            node {
              name
            }
          }
        }
      }
    }
  }
`;

export interface Post {
  content: string;
  excerpt: string;
  slug: string;
  title: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  author: {
    node: {
      name: string;
    };
  };
}

interface PageInfo {
  offsetPagination: {
    hasMore: boolean;
    total: number;
  };
}

interface GetWordPressPostsData {
  posts: {
    pageInfo: PageInfo;
    edges: {
      node: Post;
    }[];
  };
}

interface GetWordPressPostsVariables {
  offset: number;
  size: number;
}
