import Link from "next/link";
import SocialDiv from "./SocialDiv";

const Footer = () => {
  return (
    <div className="bg-secondary-background w-full py-6">
      <div className="max-w-5xl mx-auto flex flex-row items-center justify-between w-full py-10 px-6 lg:px-0 gap-8 md:gap-0">
        <div className="flex flex-col md:flex-row gap-16 w-1/2">
          <div className="flex flex-col gap-2">
            <p className="text-xl md:text-2xl font-bold tracking-wider">Logo</p>
            <p className="text-xs text-secondary-foreground">
              {" "}
              Directory of best AI Tools <br /> on the Internet{" "}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="#" className="">
              Submit Tools
            </Link>
            <Link href="#">Privacy </Link>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="#" className="">
              Blogs
            </Link>
            <Link href="#">Terms </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 self-start">
          <p className="font-semibold text-sm">Follow Us</p>
          <div className="flex gap-4 flex-wrap">
            <SocialDiv icon="/icons/linkedin.svg" text="34k" />
            <SocialDiv icon="/icons/plane.svg" text="34k" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
