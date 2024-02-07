import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTools } from "../hooks/tools";
import { Card } from "../ui/card";
import { useRouter } from "next/router";

const SearchBar = () => {
  const categories = useTools((state) => state.categories);
  const [filteredResult, setFilteredResult] = useState();
  const [product, setProduct] = useState();
  const [isCardVisible, setIsCardVisible] = useState(false);
  const router = useRouter();

  const searchTextRef = useRef("");
  const cardRef = useRef(null);
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTextRef.current) return;
    const products = await fetch("/api/findTools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: searchTextRef.current }),
    });
    const response = await products.json();
    console.log(response, "products");
    setProduct(response);
    const filteredCategories = categories.filter((category) =>
      category.title.toLowerCase().includes(searchTextRef.current.toLowerCase())
    );

    setFilteredResult(filteredCategories);
    console.log(filteredCategories, "filtered Category");
    setIsCardVisible(true);
  };

  const handleClickOutside = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      setIsCardVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto w-full px-6 lg:px-0">
      <form
        className="rounded-full border-border border-2 relative"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          name="searchText"
          onChange={(e) => (searchTextRef.current = e.target.value)}
          placeholder="I want to create a..."
          className="rounded-full w-full py-2.5 pl-6 pr-12 bg-secondary-background text-base text-secondary-text placeholder:text-secondary-text focus:outline-none focus:ring-1 focus:ring-primary-text"
        />
        <button type="button">
          <Image
            src="/icons/search.svg"
            width={20}
            height={20}
            alt=""
            className="absolute right-4 top-0 translate-y-[50%]"
          />
        </button>
      </form>
      {(filteredResult || product) && isCardVisible && (
        <Card
          ref={cardRef}
          className=" max-w-5xl absolute inset-x-6  mx-auto px-4 z-500 mt-6 py-6 bg-secondary-background rounded shadow-md z-10 max-h-64 overflow-y-scroll"
        >
          {filteredResult.map((category) => (
            <p
              className="hover:bg-primary-text md:text-lg rounded-md hover:text-secondary-text cursor-pointer py-4 px-2 "
              key={category.id}
              onClick={() => router.push(`/category/${category.title}`)}
            >
              {category.title}
            </p>
          ))}
          {product &&
            product.map((tool) => (
              <p
                className="hover:bg-primary-text md:text-lg rounded-md hover:text-secondary-text cursor-pointer py-4 px-2"
                key={tool.id}
                onClick={() => router.push(`/tool/${tool.id}`)}
              >
                {tool.title}
              </p>
            ))}
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
