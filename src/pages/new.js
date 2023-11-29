import Explore from "@/components/landingpage/Explore";
import Filter from "@/components/landingpage/Filter";
import Hero from "@/components/landingpage/Hero";
import SearchBar from "@/components/landingpage/SearchBar";
import { prisma } from "@/lib/prisma";
import React from "react";

const New = ({ post, cursor }) => {
  console.log(cursor, "cursor from SSP");
  return (
    <main className={`flex min-h-screen flex-col text-primary-text`}>
      <Hero />
      <Filter />
      <SearchBar />
      <Explore post={post} cursor={cursor} />
    </main>
  );
};

export default New;

export async function getServerSideProps() {
  const getPosts = async () => {
    try {
      const postsWithTags = await prisma.post.findMany({
        take: 10,
        orderBy: {
          id: "asc", // Ensure the posts are ordered by ID
        },
      });

      const cursor =
        postsWithTags.length > 0
          ? postsWithTags[postsWithTags.length - 1].id
          : null;

      console.log(cursor, "cursor from the API"); // For debugging purposes

      const dataArray = [].concat(...Object.values(postsWithTags));
      return {
        dataArray,
        cursor,
      };
    } catch (error) {
      console.error(error);
      return []; // Return an empty array in case of an error
    }
  };

  const post = await getPosts();

  return {
    props: {
      post: JSON.parse(JSON.stringify(post.dataArray)),
      cursor: post.cursor,
    },
  };
}
