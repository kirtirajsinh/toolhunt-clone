import React, { useState } from "react";
import ExploreToolCard from "../landingpage/ExploreToolCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import LoginButton from "../LoginButton";

const SimilarTools = ({ tools }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(tools, "tools from similar component");
  return (
    <>
      <div className="mt-12 flex flex-col space-y-12">
        <h1 className="md:text-3xl text-2xl font-bold">Similar Products</h1>
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
                promotedUntil={tool.promotedUntil}
              />
            );
          })}
      </div>
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

export default SimilarTools;
