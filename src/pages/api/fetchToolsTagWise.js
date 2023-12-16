import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { page, tag } = req.query;
  console.log(page, "page data from the query");
  console.log(tag, "category data from the query");
  try {
    const tools = await prisma.tag.findUnique({
      where: { title: tag },

      include: {
        Post: {
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
    res.status(200).json(tools.Post);
  } catch (e) {
    console.error(e);
    res.status(500).json({ e });
  }
}
