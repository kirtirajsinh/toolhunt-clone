import Image from "next/image";
import { useState, useRef } from "react";
import { useTools } from "../hooks/tools";
import { useRouter } from "next/router";

const Filter = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [active, setActive] = useState(0);
  const tabsBoxRef = useRef(null);
  const startXRef = useRef(0);
  const categories = useTools((state) => state.categories);
  const router = useRouter();

  const handleIcons = (scrollVal) => {
    const maxScrollableWidth =
      tabsBoxRef.current.scrollWidth - tabsBoxRef.current.clientWidth;
    document.getElementById("left").parentElement.style.display =
      scrollVal <= 0 ? "none" : "flex";
    document.getElementById("right").parentElement.style.display =
      maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
  };

  const handleIconClick = (direction) => {
    let scrollWidth;

    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        scrollWidth = tabsBoxRef.current.scrollLeft +=
          direction === "left" ? -100 : 100;
      } else {
        scrollWidth = tabsBoxRef.current.scrollLeft +=
          direction === "left" ? -340 : 340;
      }

      handleIcons(scrollWidth);
    }
  };

  const handleStartDragging = (e) => {
    setIsDragging(true);
    startXRef.current = e.type.startsWith("mouse")
      ? e.clientX
      : e.touches[0].clientX;
  };

  const handleDragging = (e) => {
    if (!isDragging) return;
    tabsBoxRef.current.classList.add("dragging");
    const currentX = e.type.startsWith("mouse")
      ? e.clientX
      : e.touches[0].clientX;
    tabsBoxRef.current.scrollLeft -= currentX - startXRef.current;
    handleIcons(tabsBoxRef.current.scrollLeft);
    startXRef.current = currentX;
  };

  const handleStopDragging = () => {
    setIsDragging(false);
    tabsBoxRef.current.classList.remove("dragging");
  };

  return (
    <div className="w-full lg:max-w-5xl mx-auto overflow-x-auto relative flex items-center justify-center mb-12 px-6 lg:px-0">
      <div
        className="icon py-1.5 px-3 flex justify-between items-center rounded-full cursor-pointer absolute top-0 ml-6 lg:ml-0"
        style={{
          background: "var(--primary-button)",
        }}
      >
        <Image
          src="/icons/arrow-left.svg"
          width={16}
          height={16}
          id="left"
          onClick={() => handleIconClick("left")}
          alt=""
        />
      </div>
      <ul
        className="tabs-box items-center"
        ref={tabsBoxRef}
        onMouseDown={handleStartDragging}
        onMouseMove={handleDragging}
        onMouseUp={handleStopDragging}
        onTouchStart={handleStartDragging}
        onTouchMove={handleDragging}
        onTouchEnd={handleStopDragging}
      >
        {categories.map((tag, index) => {
          return (
            <li
              key={tag}
              className={`tab  ${
                active === index
                  ? "bg-gradient-to-r from-[#0eca90] to-[#11c2b6]  bg-clip-text text-transparent hover:bg-transparent hover:text-[#0eca90] active"
                  : ""
              }`}
              onClick={() => {
                setActive(index);
                router.push(`/category/${tag.title}`);
              }}
            >
              {tag.title} {""} {tag?._count?.posts}
            </li>
          );
        })}
      </ul>
      <div
        className="icon py-1.5 px-3 flex justify-between items-center rounded-full cursor-pointer absolute top-0 mr-6 lg:mr-0"
        style={{
          background: "var(--primary-button)",
        }}
      >
        <Image
          src="/icons/arrow-right.svg"
          width={16}
          height={16}
          id="right"
          onClick={() => handleIconClick("right")}
          alt=""
        />
      </div>
    </div>
  );
};

export default Filter;
