import NavBar from "@/components/NavBar";
import Offer from "@/components/landingpage/Offer";
import Trending from "@/components/landingpage/Trending";
import Explore from "@/components/landingpage/Explore";
import Footer from "@/components/landingpage/Footer";
import { prisma } from "@/lib/prisma";
import Hero from "@/components/landingpage/Hero";
import Filter from "@/components/landingpage/Filter";
import SearchBar from "@/components/landingpage/SearchBar";

export default function Home({ post }) {
  return (
    <main className={`flex min-h-screen flex-col text-primary-text`}>
      <NavBar />
      <Hero />
      <Filter />
      <SearchBar />
      <Offer />
      <Trending />
      <Explore post={post} />
      <Footer />
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

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
}
