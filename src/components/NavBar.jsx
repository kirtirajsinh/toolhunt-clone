import Link from "next/link";
import LoginButton from "./LoginButton";
import Image from "next/image";
import SocialDiv from "./landingpage/SocialDiv";


const NavBar = () => {
  return (
    <div className="h-28 flex items-center w-full">
      <div className="max-w-5xl mx-auto flex flex-row items-center justify-between w-full px-8 lg:px-0">
        <div className="flex gap-8 items-center">
          <p className="font-bold text-2xl tracking-wider">Logo</p>
          <div className="flex gap-4">
            <SocialDiv icon="/icons/linkedin.svg" text="34k" />
            <SocialDiv icon="/icons/vector.svg" text="34k" />
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <Link href="/submit" className="">Submit</Link>
          <Link href="/">Watchlist</Link>

          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
