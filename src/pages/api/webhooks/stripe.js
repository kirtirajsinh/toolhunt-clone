import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const signature = req.headers["stripe-signature"] ?? "";
  const buf = await buffer(req);
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (e) {
    console.log(e);
    return res.status(400).send(`Webhook Error: ${e}`);
  }

  // Handle the event
  const session = event.data.object;
  if (event.type === "checkout.session.completed") {
    console.log(session, "session Data from webhook");
    console.log(session?.metadata, "session metaData webhook");
    if (session?.metadata?.toolId) {
      const promotionDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
      const promotedUntil = new Date(Date.now() + promotionDuration);
      console.log(promotedUntil, "promotedUntil");
      const update = await prisma.post.update({
        where: {
          id: session.metadata.toolId,
        },
        data: {
          promotedUntil: promotedUntil,
        },
      });
      console.log(update, "update");
    }
  }

  res.json({ received: true });
}
