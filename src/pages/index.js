import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import NavBar from "@/components/NavBar";
import Offer from "@/components/landingpage/Offer";
import Trending from "@/components/landingpage/Trending";
import Explore from "@/components/landingpage/Explore";
import Footer from "@/components/landingpage/Footer";

export default function Home() {
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
      <Explore />
      <Footer />
      {/* <LoginButton /> */}
    </main>
  );
}
