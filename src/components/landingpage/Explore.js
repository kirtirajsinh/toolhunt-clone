import React, { useState } from "react";
import { Button } from "../ui/button";
import ExploreHeader from "./ExploreHeader";
import ExploreToolCard from "./ExploreToolCard";
import { useRouter } from "next/router";
import LoadMore from "../new/LoadMore";

const Explore = ({ post, cursor }) => {
  const router = useRouter();
  const [tools, setTools] = useState(post);
  const [page, setPage] = useState(cursor);
  return (
    <section className="flex flex-col mt-12 max-w-5xl mx-auto w-full px-6 lg:px-0">
      <ExploreHeader />
      <div className="flex flex-col gap-6">
        {tools.map(
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
      {router.asPath === "/new" ? (
        <LoadMore
          setTools={setTools}
          tools={tools}
          cursor={page}
          setCursor={setPage}
        />
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
