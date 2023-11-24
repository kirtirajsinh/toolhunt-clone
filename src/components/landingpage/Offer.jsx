import Image from "next/image";

const Offer = () => {
  return (
    <div className="px-8 lg:px-0">
      <div
        className="flex flex-row flex-wrap md:flex-nowrap items-center w-full max-w-5xl p-6 md:px-9 md:py-8 mt-8 mx-auto bg-cover rounded-xl overflow-hidden gap-6 md:gap-8"
        style={{ backgroundImage: "url(/offer-bg.png)" }}
      >
        <Image
          src="/chatgpt.png"
          alt="ChatGPT"
          width={140}
          height={40}
          className="w-40"
        />
        <div className="flex flex-wrap gap-4 w-full justify-between">
          <p className="font-medium text-base lg:text-xl md:w-[70%]">
            ClipTutor transforms Youtubr Videos into personalised tutor
            for efficient learnig and teaching it.
          </p>
          <button
            className="py-2 px-4 rounded-md self-start"
            style={{
              background: "var(--primary-button)",
            }}
          >
            Unlock Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
