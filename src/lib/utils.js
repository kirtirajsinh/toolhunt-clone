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

export async function LikeTool(toolId) {
  try {
    const response = await fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toolId: toolId,
      }),
    });
    const data = await response.json();
    console.log(data, "response from likeDislike");
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function DislikePost(toolId) {
  try {
    const response = await fetch("/api/dislike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toolId: toolId,
      }),
    });
    const data = await response.json();
    console.log(data, "response from likeDislike");
    return data;
  } catch (e) {
    console.log(e);
  }
}
