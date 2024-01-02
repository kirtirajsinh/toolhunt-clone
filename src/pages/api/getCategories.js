// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const categoriesWithPostCount = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
      take: 30,
    });
    console.log("Fetched categories", categoriesWithPostCount);
    return res.status(200).json(categoriesWithPostCount);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
