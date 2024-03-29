import { client } from "./_app";
import { gql } from "@apollo/client";
import Head from "next/head";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import BlogPage from "./components/BlogPage";
import BlogPage1 from "./components/BlogPage1";
import { Post } from "./components/BlogHomepage";

export default function Blogs({ post }: { post: Post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="font-roboto overflow-x-hidden">
        <header>
          <Navbar />
        </header>
        <main className="mx-auto max-w-screen-xl">
          <BlogPage1 post={post} />
        </main>
        <footer className="w-full">
          <Footer />
        </footer>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const result = await client.query({
    query: gql`
      query GetPosts {
        posts {
          nodes {
            slug
          }
        }
      }
    `,
  });

  return {
    paths: result.data.posts.nodes.map(({ slug }: { slug: string }) => {
      return {
        params: { slug },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const result = await client.query({
    query: gql`
      query GetPostDataBySlug($slug: String!) {
        postBy(slug: $slug) {
          title
          content
          date
          slug
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
    `,
    variables: { slug },
  });

  return {
    props: {
      post: result.data.postBy,
    },
    revalidate: 10,
  };
}
