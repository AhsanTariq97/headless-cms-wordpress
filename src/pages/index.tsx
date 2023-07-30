import { Lexend_Giga, Roboto, Raleway } from "next/font/google";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import BlogHomepage from "./components/BlogHomepage";
import { gql } from "@apollo/client";
import { client } from "./_app";

const lexendGiga = Lexend_Giga({
  subsets: ["latin"],
  variable: "--font-lexend-giga",
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const raleway = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

export default function Home({ posts }: any) {
  const staticPosts = posts;
  return (
    <main
      className={`overflow-x-hidden ${roboto.className} ${raleway.className} ${lexendGiga.className} font-roboto`}
    >
      <Navbar />
      <main className="pb-16 mx-auto lg:max-w-screen-xl md:max-w-screen-md">
        <BlogHomepage posts={staticPosts} />
      </main>
      <Footer />
    </main>
  );
}

// For statically generating the blog homepage, fetching all posts which would be later trimmed down based on the BATCH_SIZE in BlogHomepage component
// We use pagination query (offset, skip) in the BlogHomepage component
export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_POSTS,
    notifyOnNetworkStatusChange: true,
  });

  const posts = data.posts.edges.map((edge: any) => edge.node);

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

const GET_POSTS = gql`
  query GetWordPressPosts {
    posts(first: 2, where: { orderby: { field: DATE, order: DESC } }) {
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
