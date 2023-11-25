import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "./auth";
import { prisma } from "./prisma";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});
