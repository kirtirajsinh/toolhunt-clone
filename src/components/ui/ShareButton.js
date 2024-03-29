import React from "react";
import { TwitterShareButton } from "react-share";
import Image from "next/image";

const ShareButton = ({ title, url }) => {
  return (
    <div className="w-fit">
      <div className="self-center text-[#11c2b6]  rounded-full py-2 px-3 bg-gradient-to-r from-[#0eca90] to-[#11c2b6]  bg-clip-text  border-[1px] border-[#0eca90] hover:text-[#0eca90]">
        <TwitterShareButton
          title={title}
          url={url}
          className="flex flex-row items-center space-x-2   "
        >
          <Image
            src="/icons/twitter.svg"
            width={20}
            height={20}
            alt="Twitter logo"
          />
          <span>Share</span>
        </TwitterShareButton>
      </div>
    </div>
  );
};

export default ShareButton;
