import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session, "Session");
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { toolId } = req.body;
  console.log(toolId, "postId");
  try {
    // If the like does not exist, add it (like the post)
    const like = await prisma.Like.create({
      data: {
        user: {
          connect: { id: session.user.id.id },
        },
        post: {
          connect: { id: toolId },
        },
      },
    });
    console.log("Post liked");
    res.status(200).json("Post liked", like);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
