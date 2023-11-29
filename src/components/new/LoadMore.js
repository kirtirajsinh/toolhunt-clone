import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "../ui/Spinner";

const LoadMore = ({ setTools, tools, cursor, setCursor }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      getTools();
      console.log("inView", inView);
    }
  }, [inView]);

  const getTools = async () => {
    const response = await fetch(`/api/fetchTools?page=${cursor}`);
    const data = await response.json();
    setTools([...tools, ...data]);
    const newCursor = data.length > 0 && data[data.length - 1]?.id;
    console.log(cursor, "cursor before update");
    console.log(newCursor, "new Cusor after update");
    setCursor(newCursor);
  };
  return (
    <>
      <div
        className="w-full  p-4 rounded-lg flex gap-6 relative overflow-hidden cursor-pointer flex-wrap md:flex-nowrap justify-center"
        ref={ref}
      >
        <Spinner />
      </div>
    </>
  );
};

export default LoadMore;
