import React, { useRef, useState } from "react";
import ExploreToolCard from "../landingpage/ExploreToolCard";
import { DislikePost, LikeTool } from "@/lib/utils";

const Section = ["Created Tools", "Liked Tools"];

const History = ({ profile }) => {
  const [active, setActive] = useState(0);
  const tabsBoxRef = useRef(null);
  console.log(profile?.likedPosts, "liked Post");
  return (
    <div className="flex flex-col justify-center  h-full">
      <ul className="tabs-box items-center" ref={tabsBoxRef}>
        {Section.map((section, index) => {
          return (
            <li
              key={section}
              className={`tab  ${
                active === index
                  ? "bg-gradient-to-r from-[#0eca90] to-[#11c2b6]  bg-clip-text text-transparent hover:bg-transparent hover:text-[#0eca90] active"
                  : ""
              }`}
              onClick={() => setActive(index)}
            >
              {section}
            </li>
          );
        })}
      </ul>
      {active === 0 && (
        <div className="flex flex-col gap-6">
          {profile &&
            profile?.Post?.map((post) => (
              <ExploreToolCard
                key={post.id}
                id={post.id}
                title={post.title}
                imageUrl={post.imageUrl}
                content={post.content}
                featured={post.featured}
                source={post.source}
                tags={post.postTags}
                isLiked={post?.post?.likes?.length > 0}
              />
            ))}
        </div>
      )}

      {active === 1 && (
        <div className="flex flex-col gap-6">
          {profile &&
            profile?.likedPosts?.map((post) => (
              <ExploreToolCard
                key={post?.post?.id}
                id={post?.post?.id}
                title={post?.post?.title}
                imageUrl={post?.post?.imageUrl}
                content={post?.post?.content}
                featured={post?.post?.featured}
                source={post?.post?.source}
                tags={post?.post?.postTags}
                isLiked={post?.post?.likes?.length > 0}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default History;
