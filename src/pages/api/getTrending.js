import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  console.log("I m in TREnding ");
  try {
    const mostLikedPost = await prisma.post.findMany({
      orderBy: {
        likes: {
          _count: "desc",
        },
      },
      take: 10,
    });

    console.log(mostLikedPost, "products with title");
    res.status(200).json(mostLikedPost);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error finding products" });
  }
}
