import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    res.status(401).json({ message: "USER Not found" });
    return;
  }
  const formData = req.body;
  let toolData;
  try {
    toolData = await prisma.Post.findUnique({
      where: {
        id: formData.toolId,
      },
    });
    console.log(toolData, "toolData from promote");
    if (!toolData) {
      res.status(401).json({ message: "Tool Not found" });
      return;
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error finding tool" });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "https://toolhunt-clone.vercel.app/",
      line_items: [
        {
          price: formData.itemPrice,
          quantity: 1,
        },
      ],
      customer: user.stripe_customer_id,
      mode: "payment",
      metadata: {
        toolId: formData.toolId,
      },
    });

    console.log(session, "paymentLink");
    res.status(200).json(session);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error creating checkout session" });
  }
}
