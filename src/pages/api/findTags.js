import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const body = req.body;
  console.log(body, "body from FindTools");
  try {
    const tags = await prisma.tag.findMany({
      where: {
        title: {
          contains: body.title,
          mode: "insensitive",
        },
      },
      take: 30,
    });
    console.log(tags, "products with title");
    res.status(200).json(tags);
  } catch (e) {
    console.log(e, "error finding products with title");
    res.status(500).json({ error: "Error finding products" });
  }
}
