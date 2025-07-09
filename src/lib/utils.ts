import prisma from "./prisma";

export function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    // Vercel automatic environment variable
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000"; // local dev fallback
}

export async function getPosts() {
  return await prisma.post.findMany({
    include: { author: true },
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
}
