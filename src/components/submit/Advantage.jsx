import React from "react";
import { CiBookmark } from "react-icons/ci";
import { BiWorld } from "react-icons/bi";
import { IoIosStats, IoMdPeople, IoMdSearch } from "react-icons/io";

const Advantage = () => {
  return (
    <>
      <div className="flex flex-col mt-5 space-y-8">
        <div className="flex sm:flex-row flex-col align-items-center   flex-wrap  sm:gap-4 ">
          <div className="flex flex-row items-center space-x-2 border p-2 w-full sm:w-fit ">
            <CiBookmark />
            <p>200,000+ subscribers</p>
          </div>
          <div className="flex flex-row items-center space-x-2 border p-2 w-full sm:w-fit ">
            <IoMdSearch />
            <p>Do Follow BackLinks</p>
          </div>
          <div className="flex flex-row items-center space-x-2 border p-2 w-full sm:w-fit">
            <BiWorld />
            <p>Multi Language Intro</p>
          </div>
          <div className="flex flex-row items-center space-x-2 border p-2 w-full sm:w-fit">
            <IoIosStats />

            <p>Listing and Traffic Forever</p>
          </div>
          <div className="flex flex-row items-center space-x-2 border p-2 w-full sm:w-fit">
            <IoMdPeople />
            <p>Value for Founders</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Advantage;
