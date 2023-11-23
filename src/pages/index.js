import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import NavBar from "@/components/NavBar";
import Offer from "@/components/landingpage/Offer";
import Trending from "@/components/landingpage/Trending";
import Explore from "@/components/landingpage/Explore";
import Footer from "@/components/landingpage/Footer";
import { prisma } from "@/lib/prisma";

export default function Home({ post }) {
  return (
    <main className={`flex min-h-screen flex-col    `}>
      <NavBar />
      <h1 className="text-6xl font-bold text-center mt-20">
        Discover the best AI tools <br /> for EveryDay
      </h1>
      <p className="text-center mt-8">
        Unlock productivity with 5620+ AI tools & growing
      </p>
      <Offer />
      <Trending />
      <Explore post={post} />
      <Footer />
      {/* <LoginButton /> */}
    </main>
  );
}

export async function getServerSideProps() {
  const getPosts = async () => {
    try {
      const postsWithTags = await prisma.post.findMany();

      const dataArray = [].concat(...Object.values(postsWithTags));
      return dataArray;
    } catch (error) {
      console.error(error);
      return []; // Return an empty array in case of an error
    }
  };

  const post = await getPosts();

  console.log(post, "jobs from the job calling function");

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
}
