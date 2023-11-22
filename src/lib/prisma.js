import { PrismaClient } from "@prisma/client";

let PrismaVar;
if (process.env.NODE_ENV === "production") {
  PrismaVar = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  PrismaVar = global.cachedPrisma;
}

export const prisma = PrismaVar;
