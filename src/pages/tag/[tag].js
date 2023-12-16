import { useTools } from "@/components/hooks/tools";
import ExploreToolCard from "@/components/landingpage/ExploreToolCard";
import LoadMore from "@/components/new/LoadMore";
import { prisma } from "@/lib/prisma";
import React, { useEffect } from "react";

const Tags = ({ tools, cursor }) => {
  const addTagWiseTools = useTools((state) => state.addTagWiseTools);
  const tagWiseTools = useTools((state) => state.tagWiseTools);
  const setTagCursor = useTools((state) => state.setTagCursor);
  const removeTagWisetools = useTools((state) => state.removeTagWisetools);
  console.log(tools.Post, "tools in the tag page");
  useEffect(() => {
    if (!cursor || !tools) return;

    removeTagWisetools();

    console.log("Tag tools added and previous removed");

    addTagWiseTools(tools.Post);

    setTagCursor(cursor);
  }, [tools]);
  return (
    <div className="flex flex-col mt-12 max-w-5xl mx-auto w-full px-6 space-y-6 mb-6 lg:px-0  min-h-screen">
      {tagWiseTools &&
        tagWiseTools.map((tool) => (
          <div key={tool.id} className="gap-6 ">
            <div className="flex flex-col space-y-12">
              <ExploreToolCard
                id={tool.id}
                imageUrl={tool.imageUrl}
                title={tool.title}
                rating={tool.rating}
                content={tool.content}
                featured={tool.featured}
                source={tool.source}
                tags={tool.postTags}
              />
            </div>
          </div>
        ))}
      <LoadMore />
    </div>
  );
};

export default Tags;

export async function getServerSideProps(context) {
  const tag = context.query.tag;

  console.log(tag, "tag from getServerProps");

  if (!tag) {
    return {
      props: {
        error: "tag is required",
      },
    };
  }

  const getTools = async () => {
    try {
      const postsWithTag = await prisma.tag.findUnique({
        where: { title: tag },

        include: {
          Post: {
            take: 10,
            include: {
              postCategories: true,
              postTags: true,
            },
            orderBy: {
              id: "asc", // Ensure the posts are ordered by ID
            },
          },
        },
      });
      console.log(postsWithTag, "Post from a Tag from serverSide");
      const cursor = postsWithTag.Post[postsWithTag.Post.length - 1].id;

      console.log(cursor, "Cursor from getServerSideProps");
      return { postsWithTag, cursor };
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const tools = await getTools();
  console.log(tools, "Tools from serverSide");
  return {
    props: {
      tools: JSON.parse(JSON.stringify(tools.postsWithTag)),
      cursor: tools.cursor,
    },
  };
}
