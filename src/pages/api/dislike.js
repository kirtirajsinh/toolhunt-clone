import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { toolId } = req.body;
  try {
    const dislike = await prisma.Like.delete({
      where: {
        postId_userId: {
          postId: toolId,
          userId: session.user.id.id,
        },
      },
    });
    console.log("Post unliked");
    res.status(200).json("Post unliked", dislike);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
