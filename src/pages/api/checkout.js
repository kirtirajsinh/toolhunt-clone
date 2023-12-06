import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session, "Session");
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const { formData } = req.body;

  console.log(formData, "form data in checkout ");

  try {
    const addTool = await prisma.post.create({
      data: {
        title: formData.title,
        content: formData.description,
        imageUrl: formData.image,
        source: formData.siteURL,
        tags: formData.tags,
        categories: formData.categories,
        price: formData.price,
        authorId: session.user.id.id,
      },
    });
    console.log("Tool added to database", addTool);
    res.status(200).json(addTool);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
}
