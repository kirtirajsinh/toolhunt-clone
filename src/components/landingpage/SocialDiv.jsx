import Image from "next/image";

const SocialDiv = ({ icon, text }) => {
  return (
    <div className="rounded-full border-border border-2 flex gap-2 items-center">
      <div className="flex items-center justify-center rounded-full p-2 bg-secondary-button scale-110">
        <Image src={icon} width={14} height={14} alt="" />
      </div>
      <p className="font-medium pr-3 ">{text}</p>
    </div>
  );
};

export default SocialDiv;
