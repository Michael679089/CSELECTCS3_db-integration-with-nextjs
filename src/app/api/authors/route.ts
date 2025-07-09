import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const authors = await prisma.user.findMany({
    select: { id: true, name: true },
  });

  return NextResponse.json(authors);
}
