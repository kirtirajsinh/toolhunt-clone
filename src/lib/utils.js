import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const plans = [
  {
    planType: "Fast Track",
    price: "49",
    priceId: "price_1OGDWuSH5mBCFQOqk61YMd6K",
  },
  {
    planType: "Promoted",
    price: "199",
    priceId: "price_1OGFf8SH5mBCFQOqMNmpMipu",
  },
];
