import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { stripe } from "./stripe";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  events: {},
  callbacks: {
    async session({ session, user }) {
      if (session) {
        const user = await prisma.user.findFirst({
          where: {
            email: session.user.email,
          },
        });
        if (!user.stripe_customer_id) {
          const customer = await stripe.customers.create({
            email: session.user.email,
          });
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              stripe_customer_id: customer.id,
            },
          });
        }
      }
      return session;
    },
  },
};
