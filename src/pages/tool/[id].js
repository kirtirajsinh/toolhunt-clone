import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Tool = ({ tool }) => {
  const router = useRouter();
  const { id: toolId } = router.query;
  console.log(router.query, "router.query");
  console.log(tool, "tool Details");

  return (
    <>
      <div className="flex flex-col justify-center mt-32  mx-12 space-y-12 ">
        <div className="flex flex-row items-center space-x-12">
          <p className="text-2xl font-bold">{tool?.title}</p>
          <Button onClick={() => router.push(`${tool.source}`)}>
            Visit Site{" "}
          </Button>
        </div>
        <div className="flex flex-row space-x-32 items-center">
          <div className="flex flex-col  space-y-12">
            <p className="text-lg">{tool.content}</p>
            {tool.tags.map((tag) => (
              <p key={tag.id}>{tag.title}</p>
            ))}
          </div>
          <Image
            src={tool.imageUrl}
            width={200}
            height={200}
            className="h-80 w-96 object-cover "
            alt={tool.title}
          />
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
          tags: {
            include: {
              tag: true,
            },
          },
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
