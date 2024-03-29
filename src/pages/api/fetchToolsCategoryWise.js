import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { page, category } = req.query;
  console.log(page, "page data from the query");
  console.log(category, "category data from the query");
  try {
    const tools = await prisma.category.findUnique({
      where: { title: category },

      include: {
        posts: {
          take: 10,
          skip: 1,
          cursor: { id: page },
          orderBy: { id: "asc" },
          include: {
            postCategories: true,
            postTags: true,
          },
        },
      },
    });
    console.log("Fetched tools", tools);
    res.status(200).json(tools.posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ e });
  }
}
