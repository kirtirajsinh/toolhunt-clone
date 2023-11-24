import Image from "next/image";
import { Balancer } from "react-wrap-balancer";

const Hero = () => {
  return (
    <div className="flex my-20 relative w-full lg:max-w-7xl mx-auto items-center">
      <Image
        src="/hero-bg1.png"
        width={400}
        height={320}
        alt=""
        className="lg:flex-1 z-10 absolute left-0 lg:static max-w-[250px] lg:max-w-full"
      />
      <div className="w-full lg:w-6/12 z-20">
        <h1 className="text-5xl md:text-6xl font-bold text-center">
          <Balancer>Discover the best AI tools for EveryDay</Balancer>
        </h1>
        <p className="text-center mt-8 font-sans">
          Unlock productivity with 5620+ AI tools & growing
        </p>
      </div>
      <Image
        src="/hero-bg2.png"
        width={400}
        height={320}
        alt=""
        className="lg:flex-1 absolute right-0 lg:static max-w-[250px] lg:max-w-full"
      />
    </div>
  );
};

export default Hero;
