import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "../ui/Spinner";
import { useTools } from "../hooks/tools";
import { useRouter } from "next/router";

const LoadMore = () => {
  const { ref, inView } = useInView();
  const addTools = useTools((state) => state.addTools);
  const cursor = useTools((state) => state.cursor);
  const setCursor = useTools((state) => state.setCursor);
  const categoryCursor = useTools((state) => state.categoryCursor);
  const addCategoryWiseTools = useTools((state) => state.addCategoryWiseTools);
  const setCategoryCursor = useTools((state) => state.setCategoryCursor);

  const router = useRouter();
  console.log(router.pathname, "router path");
  useEffect(() => {
    if (inView) {
      // check if the route is /new then call getTools otherwise call getToolsCategorywise
      if (router.pathname === "/new") {
        getTools();
      } else if (router.pathname.includes("/category")) {
        getToolsCategorywise();
      }
      console.log("inView", inView);
    }
  }, [inView]);

  const getTools = async () => {
    console.log("In a getTools");
    const response = await fetch(`/api/fetchTools?page=${cursor}`);
    const data = await response.json();
    console.log(data, "data from the API");
    // setTools([...tools, ...data]);
    const newCursor = data.length > 0 && data[data.length - 1]?.id;
    console.log(cursor, "cursor before update");
    console.log(newCursor, "new Cusor after update");
    addTools(data);
    setCursor(newCursor);
  };

  const getToolsCategorywise = async () => {
    console.log("In a getToolsCategoryWise");
    const category = router.asPath.split("/").pop();
    const categoryWithoutSpace = decodeURIComponent(category);

    console.log(category, "category from LoadMore");
    try {
      const response = await fetch(
        `/api/fetchToolsCategoryWise?page=${categoryCursor}&category=${categoryWithoutSpace}`
      );
      console.log(response, "response from the API");
      const data = await response.json();
      console.log(data, "data from the API");
      // setTools([...tools, ...data]);
      const newCursor = data.length > 0 && data[data.length - 1]?.id;
      console.log(cursor, "cursor before update");
      console.log(newCursor, "new Cusor after update");
      addCategoryWiseTools(data);
      setCategoryCursor(newCursor);
    } catch (e) {
      console.error(e);
    }
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
