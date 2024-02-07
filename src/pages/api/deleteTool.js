import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { toolId, authorId } = req.body;
  console.log(toolId, "postId");
  console.log(authorId, "authorId");
  console.log(session.user.id.id, "userId");
  console.log(session, "Session");
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  } else if (authorId !== session.user.id.id) {
    return res
      .status(401)
      .json({ message: "You're not authorized to do that" });
  } else {
    console.log("Im still in the function deleting");
    try {
      const tool = await prisma.Post.delete({
        where: {
          id: toolId,
        },
      });
      res.status(200).json(tool);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}
