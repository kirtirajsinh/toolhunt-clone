import React from "react";
import Image from "next/image";

const Advantage = () => {
  return (
    <>
      <div className="flex flex-col mt-5 space-y-8">
        <div className="flex sm:flex-row flex-col align-items-center   flex-wrap  sm:gap-4 ">
          <div className="flex flex-row items-center space-x-2 border p-2 w-full sm:w-fit ">
            <Image src="/icons/bookmark.svg" width={14} height={14} alt="" />
            <p>200,000+ subscribers</p>
          </div>
          <div className="flex flex-row items-center space-x-2 border p-2 w-full sm:w-fit ">
            <Image src="/icons/search.svg" width={14} height={14} alt="" />

            <p>Do Follow BackLinks</p>
          </div>
          <div className="flex flex-row items-center space-x-2 border p-2 w-full sm:w-fit">
            <Image src="/icons/world.svg" width={14} height={14} alt="" />

            <p>Multi Language Intro</p>
          </div>
          <div className="flex flex-row items-center space-x-2 border p-2 w-full sm:w-fit">
            <Image src="/icons/stats.svg" width={14} height={14} alt="" />

            <p>Listing and Traffic Forever</p>
          </div>
          <div className="flex flex-row items-center space-x-2 border p-2 w-full sm:w-fit">
            <Image src="/icons/people.svg" width={14} height={14} alt="" />

            <p>Value for Founders</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Advantage;
