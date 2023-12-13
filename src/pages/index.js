import Offer from "@/components/landingpage/Offer";
import Trending from "@/components/landingpage/Trending";
import Explore from "@/components/landingpage/Explore";
import { prisma } from "@/lib/prisma";
import Hero from "@/components/landingpage/Hero";
import Filter from "@/components/landingpage/Filter";
import SearchBar from "@/components/landingpage/SearchBar";
import { useTools } from "@/components/hooks/tools";
import { useEffect } from "react";

export default function Home({ post }) {
  const tools = useTools((state) => state.tools);
  const addTools = useTools((state) => state.addTools);

  useEffect(() => {
    if (tools.length > 0) return;
    addTools(post);
  }, [post]);
  return (
    <main className={`flex min-h-screen flex-col text-primary-text`}>
      <Hero />
      <Filter />
      <SearchBar />
      <Offer />
      <Trending />
      <Explore />
    </main>
  );
}

export async function getServerSideProps() {
  const getPosts = async () => {
    try {
      const postsWithTags = await prisma.post.findMany({
        take: 10,
        include: {
          postTags: true, // Include tags in the result if needed
          postCategories: true, // Include categories in the result if needed
        },
      });

      console.log("Fetched posts", postsWithTags);

      const dataArray = [].concat(...Object.values(postsWithTags));
      return dataArray;
    } catch (error) {
      console.error(error);
      return []; // Return an empty array in case of an error
    }
  };

  const post = await getPosts();

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
}
