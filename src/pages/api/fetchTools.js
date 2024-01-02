import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const { page } = req.query;
  console.log(page, "page data from the query");
  const session = await getServerSession(req, res, authOptions);

  try {
    if (session) {
      const tools = await prisma.post.findMany({
        take: 10,
        skip: 1,
        include: {
          postTags: true, // Include tags in the result if needed
          postCategories: true,
          // Include categories in the result if needed
          likes: {
            where: {
              userId: session.user.id.id, // Filter likes to only include those by the current user
            },
            select: {
              id: true, // Select only the fields you need, for example, the ID
            },
          },
        },
        cursor: { id: page },
        orderBy: { id: "asc" },
      });
      console.log("Fetched tools", tools);
      res.status(200).json(tools);
    } else {
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
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ e });
  }
}
