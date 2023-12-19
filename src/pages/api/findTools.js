import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const body = req.body;
  console.log(body, "body");
  try {
    const productsWithTitle = await prisma.post.findMany({
      where: {
        title: body.title,
      },
    });
    console.log(productsWithTitle, "products with title");
    res.status(200).json(productsWithTitle);
  } catch (e) {
    console.log(e, "error finding products with title");
    res.status(500).json({ error: "Error finding products" });
  }
}
