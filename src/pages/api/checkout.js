import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  const { itemPrice, productName } = req.body;

  try {
    const checkout = await stripe.checkout.sessions.create({
      customer: session.user.stripe_customer_id,
      line_items: [
        {
          price: itemPrice,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}`,
      cancel_url: `${req.headers.origin}`,
    });
    console.log(checkout, "checkout from the API");
    res.status(200).json(checkout);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
}
