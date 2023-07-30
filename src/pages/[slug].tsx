import { client } from "./_app";
import { gql } from "@apollo/client";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import BlogPage from "./components/BlogPage";
import BlogContent from "./components/BlogContent";
import { readTime } from "./utils/readTime";
import BlogPage1 from "./components/BlogPage1";

export default function Blogs({ post }: any) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="overflow-x-hidden font-roboto">
        <header>
          <Navbar />
        </header>
        <main className="max-w-screen-xl mx-auto">
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
    paths: result.data.posts.nodes.map(({ slug }: any) => {
      return {
        params: { slug },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
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
