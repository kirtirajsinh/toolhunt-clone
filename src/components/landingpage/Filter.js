import Image from "next/image";
import React, { useState } from "react";

const tags = [
  "Explore All Tools (311)",
  "AI Detection (645)",
  "Audio (438)",
  "Avatars (432)",
  "Business (123)",
  "Music (342)",
  "Coaching (32)",
  "Fitness (69)",
  "PDF (12)",
  "Coaching (31)",
  "Fitness (68)",
  "PDF (1)",
];

const Filter = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [active, setActive] = useState(0);
  const tabsBoxRef = React.useRef(null);

  const handleIcons = (scrollVal) => {
    const maxScrollableWidth =
      tabsBoxRef.current.scrollWidth - tabsBoxRef.current.clientWidth;
    document.getElementById("left").parentElement.style.display =
      scrollVal <= 0 ? "none" : "flex";
    document.getElementById("right").parentElement.style.display =
      maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
  };

  const handleIconClick = (icon) => {
    const scrollWidth = (tabsBoxRef.current.scrollLeft +=
      icon === "left" ? -340 : 340);
    handleIcons(scrollWidth);
  };

  const handleDragging = (e) => {
    if (!isDragging) return;
    tabsBoxRef.current.classList.add("dragging");
    tabsBoxRef.current.scrollLeft -= e.movementX;
    handleIcons(tabsBoxRef.current.scrollLeft);
  };

  const handleDragStop = () => {
    setIsDragging(false);
    tabsBoxRef.current.classList.remove("dragging");
  };

  return (
    <div className="max-w-5xl mx-auto overflow-x-hidden relative flex items-center justify-center mb-12">
      <div
        className="icon py-1.5 px-3 flex justify-between items-center rounded-full cursor-pointer absolute top-0"
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
        onMouseDown={() => setIsDragging(true)}
        onMouseMove={handleDragging}
        onMouseUp={handleDragStop}
      >
        {tags.map((tag, index) => {
          return (
            <li
              key={tag}
              className={`tab font-sans ${
                active === index
                  ? "bg-gradient-to-r from-[#0eca90] to-[#11c2b6]  bg-clip-text text-transparent hover:bg-transparent hover:text-[#0eca90] active"
                  : ""
              }`}
              onClick={() => setActive(index)}
            >
              {tag}
            </li>
          );
        })}
      </ul>
      <div
        className="icon py-1.5 px-3 flex justify-between items-center rounded-full cursor-pointer absolute top-0"
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
