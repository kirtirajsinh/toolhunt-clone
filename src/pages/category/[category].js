import ExploreToolCard from "@/components/landingpage/ExploreToolCard";
import { prisma } from "@/lib/prisma";
import { useRouter } from "next/router";
import React from "react";

const Tool = ({ tools, cursor }) => {
  const router = useRouter();
  const { category: categorySlug } = router.query;
  console.log(categorySlug, " slug from component");
  console.log(tools, "tools from props");

  return (
    <div className="flex flex-col mt-12 max-w-5xl mx-auto w-full px-6 space-y-6 mb-6 lg:px-0  min-h-screen">
      {tools &&
        tools.Post.map((tool) => (
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
    </div>
  );
};

export default Tool;

export async function getServerSideProps(context) {
  const category = context.query.category;

  console.log(category, "Category from getServerProps");

  if (!category) {
    return {
      props: {
        error: "Category is required",
      },
    };
  }

  const getTools = async () => {
    try {
      const postsWithTag = await prisma.tag.findUnique({
        where: { title: category },

        include: {
          Post: {
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
      const cursor = postsWithTag.Post[postsWithTag.Post.length - 1].title;

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
