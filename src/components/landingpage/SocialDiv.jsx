import Image from "next/image";

const SocialDiv = ({ icon, text }) => {
  return (
    <div className="rounded-full border-border border-2 flex gap-2 items-center">
      <div className="rounded-full p-2 bg-secondary-background">
        <Image src={icon} width={16} height={16} alt="" />
      </div>
      <p className="font-medium pr-3 font-sans">{text}</p>
    </div>
  );
};

export default SocialDiv;
