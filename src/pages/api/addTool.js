import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session, "Session");
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const { formData } = req.body;
  console.log(formData.categories, "form data in checkout ");

  try {
    const addTool = await prisma.post.create({
      data: {
        title: formData.title,
        source: formData.source,
        authorId: session.user.id.id,
        content: formData.content,
        imageUrl: formData.imageUrl,
        postCategories: {
          connectOrCreate: formData.categories.map((categoryName) => ({
            where: { title: categoryName },
            create: { title: categoryName },
          })),
        },
        postTags: {
          connectOrCreate: formData.tags.map((tagName) => ({
            where: { title: tagName },
            create: { title: tagName },
          })),
        },
      },
    });
    console.log("Tool added to database", addTool);
    res.status(200).json(addTool);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
}
