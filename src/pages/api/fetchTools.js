import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { page } = req.query;
  console.log(page, "page data from the query");

  try {
    const tools = await prisma.post.findMany({
      take: 10,
      skip: 1,
      include: {
        postTags: true, // Include tags in the result if needed
        postCategories: true, // Include categories in the result if needed
      },
      cursor: { id: page },
      orderBy: { id: "asc" },
    });
    console.log("Fetched tools", tools);
    res.status(200).json(tools);
  } catch (e) {
    console.error(e);
    res.status(500).json({ e });
  }
}
