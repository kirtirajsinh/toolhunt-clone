import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { toolId } = req.body;
  const { userId } = req.body;
  try {
    const existingLike = await prisma.Like.findUnique({
      where: {
        postId_userId: {
          postId: toolId,
          userId: userId,
        },
      },
    });

    res.status(200).json(existingLike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
