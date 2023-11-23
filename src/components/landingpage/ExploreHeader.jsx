import Image from "next/image";

const ExploreHeader = () => {
  return (
    <div className="flex flex-row flex-wrap justify-between items-center mb-8 gap-8 w-full">
      <div className="flex gap-2">
        <Image src="/icons/explore.svg" width={32} height={32} alt="" />
        <h3 className="font-bold text-2xl">Explore AI Tools</h3>
      </div>
      <div className="flex gap-4">
        <button className="border-border border-[1px] flex gap-2 items-center py-1 px-2 rounded-md">
          <Image src="/icons/filter.svg" width={14} height={14} alt="" />
          <span>Filters</span>
        </button>
        <button className="border-border border-[1px] flex gap-2 items-center py-1 px-2 rounded-md">
          <Image src="/icons/sort.svg" width={14} height={14} alt="" />
          <span>Sort</span>
        </button>
      </div>
    </div>
  );
};

export default ExploreHeader;
