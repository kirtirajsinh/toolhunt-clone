import Image from "next/image";
import { useState } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="max-w-5xl mx-auto w-full px-6 lg:px-0">
      <div className="rounded-full border-border border-2 relative">
        <input
          type="text"
          name="searchText"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          placeholder="I want to create a..."
          className="rounded-full w-full py-2.5 pl-6 pr-12 bg-secondary-background text-base font-sans focus:outline-none focus:ring-2"
        />
        <Image
          src="/icons/search.svg"
          width={20}
          height={20}
          alt=""
          className="absolute right-4 top-0 translate-y-[50%]"
        />
      </div>
    </div>
  );
};

export default SearchBar;
