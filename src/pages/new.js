import { useTools } from "@/components/hooks/tools";
import Explore from "@/components/landingpage/Explore";
import Filter from "@/components/landingpage/Filter";
import Hero from "@/components/landingpage/Hero";
import SearchBar from "@/components/landingpage/SearchBar";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import React, { useEffect } from "react";

const New = ({ post, cursor }) => {
  console.log(cursor, "cursor from SSP");
  const setCursor = useTools((state) => state.setCursor);
  const addTools = useTools((state) => state.addTools);
  useEffect(() => {
    if (!cursor || !post) return;
    setCursor(cursor);
    addTools(post);
  }, []);

  return (
    <main className={`flex min-h-screen flex-col text-primary-text`}>
      <Hero />
      <Filter />
      <SearchBar />
      <Explore />
    </main>
  );
};

export default New;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const getPosts = async () => {
    try {
      const postsWithTags = await prisma.post.findMany({
        take: 10,
        include: {
          postTags: true, // Include tags in the result if needed
          postCategories: true, // Include categories in the result if needed
          likes: session
            ? {
                where: {
                  userId: session.user.id.id, // Filter likes to only include those by the current user
                },
                select: {
                  id: true, // Select only the fields you need, for example, the ID
                },
              }
            : false,
        },
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
