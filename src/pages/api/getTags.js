import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const tags = await prisma.Tag.findMany({
      take: 30,
    });
    res.status(200).json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error finding tags" });
  }
}
