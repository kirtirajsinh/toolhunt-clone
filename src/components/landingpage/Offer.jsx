import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";

const Offer = () => {
  return (
    <>
      <Card className=" flex flex-row items-center px-9 w-[1140px] py-8 justify-between mt-4 mx-60 ">
        <Image
          src="/chatgpt.png"
          alt="ChatGPT"
          width={80}
          height={80}
          className="w-40 "
        />
        <p className="">
          ClipTutor transforms Youtubr Videos into personalised <br /> tutor for
          efficient learnig and teaching it.
        </p>
        <button
          className=" p-2 rounded-md "
          style={{
            background: "var(--primary-button)",
          }}
        >
          Unlock Offer
        </button>
      </Card>
    </>
  );
};

export default Offer;
