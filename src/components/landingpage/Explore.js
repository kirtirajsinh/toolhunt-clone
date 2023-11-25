import React from "react";
import { Button } from "../ui/button";
import ExploreHeader from "./ExploreHeader";
import ExploreToolCard from "./ExploreToolCard";
import { ExploreTools } from "@/lib/AIToolsData";

const Explore = ({ post }) => {
  return (
    <section className="flex flex-col mt-12 max-w-5xl mx-auto w-full px-6 lg:px-0">
      <ExploreHeader />
      <div className="flex flex-col gap-6">
        {ExploreTools.map(
          ({
            id,
            imageUrl,
            title,
            rating,
            content,
            source,
            featured,
            tags,
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
                tags={tags}
              />
            );
          }
        )}
      </div>
      <Button
        className="self-center font-medium mt-8 mb-24 px-8 py-3 rounded-full text-base"
        style={{
          background: "var(--primary-button)",
        }}
      >
        Explore(5475) AI Tools
      </Button>
    </section>
  );
};

export default Explore;
