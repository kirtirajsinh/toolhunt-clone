import { useTools } from "@/components/hooks/tools";
import ExploreToolCard from "@/components/landingpage/ExploreToolCard";
import ShareButton from "@/components/ui/ShareButton";
import { Button } from "@/components/ui/button";
import { AIData } from "@/lib/AIToolsData";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Tool = ({ tool }) => {
  const router = useRouter();
  const { id: toolId } = router.query;
  console.log(tool.postCategories, "tool Data");
  const tools = useTools((state) => state.tools);
  console.log(tools, "tools from the global state");

  return (
    <>
      <div className="flex flex-col mt-12 max-w-5xl mx-auto w-full px-6 lg:px-0  min-h-screen">
        <div className="flex flex-row md:flex-row md:items-center justify-between">
          <div className="flex flex-row  items-center space-x-12">
            <p className="md:text-5xl text-2xl font-bold">{tool?.title}</p>
            <Button
              onClick={() => window.open(`${tool.source}`, "_blank")}
              className="font-semibold flex gap-2 items-center rounded-full hover:shadow-md px-6 md:px-8 py-2 bg-gradient-to-r from-[#0eca90] to-[#11c2b6]  bg-clip-text text-transparent border-[1px] border-[#0eca90] hover:bg-transparent hover:text-[#0eca90]"
            >
              Visit Site{" "}
            </Button>
          </div>
          <div>
            <ShareButton
              title={tool?.title}
              url={
                // share the current url
                `https://toolhunt.ai/tool/${tool?.id}`
              }
            />
          </div>
        </div>
        <p className="text-secondary-text mt-3">
          Unlock Productivity with 5260+ AI tools & growing{" "}
        </p>
        <div className="flex flex-col  md:flex-row md:space-x-32  mt-8 ">
          <Image
            src={tool.imageUrl}
            width={200}
            height={200}
            className="h-80 w-96 object-cover rounded"
            alt={tool.title}
          />
          <div className="flex flex-col   mt-3">
            <p className="md:text-2xl text-xl">What is {tool?.title}?</p>
            <p className="text-sm text-secondary-text leading-6 mt-3 ">
              {tool?.content}
            </p>
            <hr className="border-secondary-border my-6" />
            <div className="flex gap-1 items-center mb-6">
              <Image
                src="/icons/bullet-point.svg"
                width={12}
                height={12}
                alt=""
                className="w-2 h-2"
              />
              <span className="font-light text-sm">
                Added on {tool?.createdAt}
              </span>
            </div>

            <div className="flex  md:flex-row flex-wrap mt-3">
              {tool.postCategories?.map((category, key) => {
                return (
                  <div
                    key={key}
                    className="  bg-secondary-background rounded-full px-3 py-1 text-xs font-semibold rounded border  mr-2 mb-2"
                  >
                    {category.title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col space-y-12">
          <h1 className="md:text-3xl text-2xl font-bold">Similar Products</h1>
          {tools
            .filter(
              (similarTool) =>
                similarTool.id !== tool.id &&
                similarTool.categories.filter((category) =>
                  tool.categories.includes(category)
                ).length >= 2
            )
            .map((similarTool) => (
              <div key={similarTool.id} className="gap-6 ">
                <ExploreToolCard
                  id={similarTool.id}
                  imageUrl={similarTool.imageUrl}
                  title={similarTool.title}
                  rating={similarTool.rating}
                  content={similarTool.content}
                  featured={similarTool.featured}
                  source={similarTool.source}
                  tags={similarTool.tags}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Tool;

export async function getServerSideProps(context) {
  const toolId = context.query.id;

  console.log(toolId, "toolId from getServerProps");

  if (!toolId) {
    return {
      props: {
        error: "Tool id is required",
      },
    };
  }

  const getTool = async () => {
    try {
      const tool = await prisma.post.findUnique({
        where: {
          id: toolId,
        },
        include: {
          postCategories: true,
          postTags: true,
        },
      });
      const simplifiedTool = {
        ...tool,
        tags: tool.tags.map((itemsTag) => itemsTag.tag),
      };
      return simplifiedTool;
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const tool = await getTool();
  return {
    props: {
      tool: JSON.parse(JSON.stringify(tool)),
    },
  };
}
