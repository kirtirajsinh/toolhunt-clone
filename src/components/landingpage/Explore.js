import React, { useState } from "react";
import { Button } from "../ui/button";
import ExploreHeader from "./ExploreHeader";
import ExploreToolCard from "./ExploreToolCard";
import { useRouter } from "next/router";
import LoadMore from "../new/LoadMore";
import { useTools } from "../hooks/tools";
import { DislikePost, LikeTool } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import LoginButton from "../LoginButton";

const Explore = () => {
  const router = useRouter();
  const tools = useTools((state) => state.tools);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(tools, "tools in Explore component");

  return (
    <>
      <section className="flex flex-col mt-12 max-w-5xl mx-auto w-full px-6 lg:px-0">
        <ExploreHeader />
        <div className="flex flex-col gap-6">
          {tools &&
            tools.length > 0 &&
            tools.map((tool) => {
              return (
                <ExploreToolCard
                  key={tool.id}
                  id={tool.id}
                  imageUrl={tool.imageUrl}
                  title={tool.title}
                  rating={tool.rating}
                  content={tool.content}
                  featured={tool.featured}
                  source={tool.source}
                  tags={tool.postTags}
                  isLiked={tool?.likes?.length > 0}
                  setIsModalOpen={(response) => setIsModalOpen(response)}
                />
              );
            })}
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
      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onClose={(event) => event.preventDefault()}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Login to LIke any AI Tool</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <LoginButton />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Explore;
