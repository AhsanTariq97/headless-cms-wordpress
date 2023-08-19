import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect } from "react";
import { AppContext } from "../utils/AppContext";
import BlogListItem from "./constants/BlogListItem";
import Pagination from "./Pagination";
import LoadingSpinner from "./constants/LoadingSpinner";

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

  // let postsData: Post[];
  // const postsData = posts
  const postsData: Post[] = data?.posts.edges.map((edge: Edge) => edge.node);
  const totalPosts = data?.posts.pageInfo.offsetPagination.total || 0;
  const noOfPages = Math.ceil(totalPosts / BATCH_SIZE);

  // Error or in process of loading
  if (error) {
    return <p>Error occured</p>;
  }
  if (!data && loading) {
    return <LoadingSpinner />;
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
        {postsData?.map((post: Post) => <BlogListItem post={post} />)}
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

interface Edge {
  node: Post;
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
