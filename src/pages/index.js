import Offer from "@/components/landingpage/Offer";
import Trending from "@/components/landingpage/Trending";
import Explore from "@/components/landingpage/Explore";
import { prisma } from "@/lib/prisma";
import Hero from "@/components/landingpage/Hero";
import Filter from "@/components/landingpage/Filter";
import SearchBar from "@/components/landingpage/SearchBar";
import { useTools } from "@/components/hooks/tools";
import { useEffect } from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default function Home({ post, categories, trending }) {
  const tools = useTools((state) => state.tools);
  const addTools = useTools((state) => state.addTools);
  const addCategories = useTools((state) => state.addCategories);
  const setTrendingTools = useTools((state) => state.setTrendingTools);
  useEffect(() => {
    console.log("useEffect running");
    if (tools.length > 0) return;
    const addToolsAndCategories = () => {
      if (post) {
        addTools(post);
      }

      if (categories) {
        addCategories(categories);
      }
      if (trending) {
        console.log(trending, "trending from the global state");
        setTrendingTools(trending);
      }
    };
    addToolsAndCategories();
  }, []);
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

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const getPosts = async () => {
    if (session) {
      try {
        const postsWithTags = await prisma.post.findMany({
          take: 10,
          include: {
            postTags: true, // Include tags in the result if needed
            postCategories: true, // Include categories in the result if needed
            likes: {
              where: {
                userId: session.user.id.id, // Filter likes to only include those by the current user
              },
              select: {
                id: true, // Select only the fields you need, for example, the ID
              },
            },
          },
        });

        console.log("Fetched posts", postsWithTags);

        const dataArray = [].concat(...Object.values(postsWithTags));
        return dataArray;
      } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of an error
      }
    } else {
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
    }
  };

  const getCategory = async () => {
    try {
      const url =
        process.env.NODE_ENV === "PROD"
          ? "https://toolhunt-tau.vercel.app"
          : "http://localhost:3000";
      const categoriesWithPostCount = await fetch(`${url}/api/getCategories`);
      const categoryData = await categoriesWithPostCount.json();

      return categoryData;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getTrending = async () => {
    try {
      const url =
        process.env.NODE_ENV === "PROD"
          ? "https://toolhunt-tau.vercel.app"
          : "http://localhost:3000";
      const post = await fetch(`${url}/api/getTrending`);
      const trending = await post.json();
      console.log(trending, "trending from the api");
      return trending;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const post = await getPosts();
  const categories = await getCategory();
  const trending = await getTrending();

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      categories: categories,
      trending: trending,
    },
  };
}
