import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const body = req.body;
  console.log(body, "body from findCCategories");
  try {
    const category = await prisma.Category.findMany({
      where: {
        title: {
          contains: body.title,
          mode: "insensitive",
        },
      },
      take: 30,
    });
    console.log(category, "categories with Title");
    res.status(200).json(category);
  } catch (e) {
    console.log(e, "error finding products with title");
    res.status(500).json({ error: "Error finding products" });
  }
}
