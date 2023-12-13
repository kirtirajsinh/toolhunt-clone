import React, { useState } from "react";
import { Button } from "../ui/button";
import ExploreHeader from "./ExploreHeader";
import ExploreToolCard from "./ExploreToolCard";
import { useRouter } from "next/router";
import LoadMore from "../new/LoadMore";
import { useTools } from "../hooks/tools";

const Explore = () => {
  const router = useRouter();
  const tools = useTools((state) => state.tools);
  console.log(tools, "tools from the hook");

  return (
    <section className="flex flex-col mt-12 max-w-5xl mx-auto w-full px-6 lg:px-0">
      <ExploreHeader />
      <div className="flex flex-col gap-6">
        {tools &&
          tools.length > 0 &&
          tools.map(
            ({
              id,
              imageUrl,
              title,
              rating,
              content,
              source,
              featured,
              postTags,
            }) => {
              return (
                <ExploreToolCard
                  key={id}
                  id={id}
                  imageUrl={imageUrl}
                  title={title}
                  rating={rating}
                  content={content}
                  featured={featured}
                  source={source}
                  tags={postTags}
                />
              );
            }
          )}
      </div>
      {router.asPath === "/new" ? (
        <LoadMore />
      ) : (
        <Button
          className="self-center font-medium mt-8 mb-24 px-8 py-3 rounded-full text-base"
          style={{
            background: "var(--primary-button)",
          }}
          onClick={() => router.push("/new")}
        >
          Explore(5475) AI Tools
        </Button>
      )}
    </section>
  );
};

export default Explore;
