import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-secondary-background flex flex-row items-center justify-between py-10 h-[169px] px-56">
      <div className="flex flex-col">
        <p className="md:text-2xl font-bold">Logo</p>
        <p className="text-xs text-secondary-foreground">
          {" "}
          Directory of best AI Tools <br /> on the Internet{" "}
        </p>
      </div>
      <div className="grid grid-cols-2 space-x-12 ">
        <Link href="#" className="">
          Submit Tools
        </Link>
        <Link href="#">Privacy </Link>
        <Link href="#" className="">
          Blogs{" "}
        </Link>
        <Link href="#">Terms </Link>
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-sm">Follow US</p>
        <div className="grid grid-cols-4 space-x-2 mt-2">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15" cy="15" r="15" fill="url(#paint0_linear_54_22)" />
            <defs>
              <linearGradient
                id="paint0_linear_54_22"
                x1="-0.6"
                y1="15"
                x2="30.0141"
                y2="15.0581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0ECA90" />
                <stop offset="1" stopColor="#11C2B6" />
              </linearGradient>
            </defs>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <circle cx="15" cy="15" r="15" fill="url(#paint0_linear_54_21)" />
            <defs>
              <linearGradient
                id="paint0_linear_54_21"
                x1="-0.6"
                y1="15"
                x2="30.0141"
                y2="15.0581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0ECA90" />
                <stop offset="1" stopColor="#11C2B6" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <circle cx="15" cy="15" r="15" fill="url(#paint0_linear_55_236)" />
            <path
              d="M10.6709 8.04161C9.37236 8.27672 8.32259 9.31009 8.05741 10.6141C8 10.8848 8 10.9613 8 14.9964C8 19.0314 8 19.108 8.05741 19.3786C8.32532 20.6991 9.37783 21.7242 10.7037 21.9539C11.0564 22.0167 18.9516 22.014 19.3069 21.9539C20.6438 21.7188 21.7209 20.6416 21.956 19.3048C21.9915 19.0943 21.997 18.5312 21.997 14.9772C21.997 10.9613 21.997 10.8848 21.9396 10.6141C21.6744 9.30189 20.6164 8.26852 19.3069 8.03888C19.0964 8.00334 18.5388 7.99787 14.9739 8.00061C11.5731 8.00334 10.8486 8.00881 10.6709 8.04161ZM19.2331 9.16793C19.3589 9.20074 19.5667 9.28275 19.6979 9.3511C20.1435 9.58074 20.4387 9.88419 20.6574 10.3353C20.9062 10.8492 20.8898 10.5102 20.8898 14.9964C20.8898 19.4442 20.9035 19.1381 20.682 19.6165C20.4606 20.0922 20.1326 20.4257 19.6596 20.6553C19.1457 20.9041 19.4846 20.8877 14.9985 20.8877C10.5124 20.8877 10.8513 20.9041 10.3374 20.6553C9.86718 20.4257 9.56919 20.1277 9.33956 19.6575C9.09078 19.1435 9.10718 19.4825 9.10718 14.9964C9.10718 10.5102 9.09078 10.8492 9.33956 10.3353C9.56919 9.86505 9.86718 9.56707 10.3374 9.33743C10.6026 9.20894 10.8787 9.12966 11.1439 9.11052C11.2122 9.10506 13.0083 9.10232 15.1352 9.10232L19.0035 9.10779L19.2331 9.16793Z"
              fill="#142922"
            />
            <path
              d="M18.5306 10.5294C18.2763 10.6579 18.1561 10.8793 18.1752 11.1964C18.1889 11.4343 18.29 11.6092 18.4814 11.7295C18.6044 11.8033 18.6372 11.8115 18.8532 11.8115C19.0691 11.8115 19.1019 11.8033 19.225 11.7295C19.307 11.6776 19.389 11.5956 19.4409 11.5135C19.5147 11.3905 19.5229 11.3577 19.5229 11.1417C19.5229 10.9258 19.5147 10.893 19.4409 10.77C19.3152 10.5676 19.143 10.4747 18.8832 10.4638C18.7028 10.4556 18.6563 10.4638 18.5306 10.5294Z"
              fill="#142922"
            />
            <path
              d="M14.6568 11.4593C13.3637 11.6015 12.344 12.2904 11.8246 13.3703C11.6551 13.7256 11.5648 14.01 11.4992 14.39C11.3024 15.5217 11.6305 16.6235 12.4069 17.4463C12.9345 18.0013 13.6316 18.3786 14.3806 18.5098C14.695 18.5645 15.3019 18.5645 15.6163 18.5098C16.7153 18.3184 17.6967 17.5885 18.1943 16.5879C18.6946 15.5901 18.6672 14.3189 18.1259 13.2746C17.6557 12.3642 16.7809 11.7272 15.7229 11.5222C15.4578 11.4703 14.8755 11.4375 14.6568 11.4593ZM15.4304 12.5939C16.215 12.7169 16.9723 13.3402 17.2703 14.1084C17.4015 14.4474 17.4398 14.6879 17.4234 15.0789C17.396 15.7268 17.1964 16.2189 16.7918 16.6563C16.4665 17.0062 16.1029 17.2222 15.6273 17.3506C15.2937 17.4409 14.7032 17.4409 14.3697 17.3506C13.6261 17.1511 13.0356 16.6453 12.7622 15.9756C12.5818 15.5245 12.5162 14.9422 12.6037 14.5266C12.7021 14.04 12.9372 13.6108 13.2926 13.2609C13.8612 12.6977 14.6103 12.4654 15.4304 12.5939Z"
              fill="#142922"
            />
            <defs>
              <linearGradient
                id="paint0_linear_55_236"
                x1="-0.6"
                y1="15"
                x2="30.0141"
                y2="15.0581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0ECA90" />
                <stop offset="1" stopColor="#11C2B6" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <circle cx="15" cy="15" r="15" fill="url(#paint0_linear_54_19)" />
            <defs>
              <linearGradient
                id="paint0_linear_54_19"
                x1="-0.6"
                y1="15"
                x2="30.0141"
                y2="15.0581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0ECA90" />
                <stop offset="1" stopColor="#11C2B6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Footer;
