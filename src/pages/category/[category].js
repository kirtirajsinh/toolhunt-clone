import { useTools } from "@/components/hooks/tools";
import ExploreToolCard from "@/components/landingpage/ExploreToolCard";
import LoadMore from "@/components/new/LoadMore";
import { prisma } from "@/lib/prisma";
import React, { useEffect } from "react";

const Tool = ({ tools, cursor }) => {
  const addCategoryWiseTools = useTools((state) => state.addCategoryWiseTools);
  const categoryWiseTools = useTools((state) => state.categoryWiseTools);
  const setCategoryCursor = useTools((state) => state.setCategoryCursor);
  const removeCategoryWiseTools = useTools(
    (state) => state.removeCategoryWiseTools
  );
  useEffect(() => {
    if (!cursor || !tools) return;
    removeCategoryWiseTools();
    console.log("Category tools added and previous removed");
    addCategoryWiseTools(tools.posts);
    setCategoryCursor(cursor);
  }, [tools]);

  return (
    <div className="flex flex-col mt-12 max-w-5xl mx-auto w-full px-6 space-y-6 mb-6 lg:px-0  min-h-screen">
      {categoryWiseTools &&
        categoryWiseTools.map((tool) => (
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

export default Tool;

export async function getServerSideProps(context) {
  const categorySlug = context.query.category;

  console.log(categorySlug, "Category from getServerProps");

  if (!categorySlug) {
    return {
      props: {
        error: "Category is required",
      },
    };
  }

  const getTools = async () => {
    try {
      const postsWithTag = await prisma.category.findUnique({
        where: { title: categorySlug },

        include: {
          posts: {
            take: 10,
            include: {
              postCategories: true,
              postTags: true,
              _count: true,
            },
            orderBy: {
              id: "asc", // Ensure the posts are ordered by ID
            },
          },
        },
      });
      console.log(postsWithTag, "Post from a Tag from serverSide");
      const cursor = postsWithTag.posts[postsWithTag.posts.length - 1].id;
      console.log(cursor, "Cursor from getServerSideProps");
      // console.log(cursor, "Cursor from getServerSideProps");
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
