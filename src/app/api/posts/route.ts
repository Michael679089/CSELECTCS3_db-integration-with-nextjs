import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  console.log("Calling API Request = POST ");
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const authorId = formData.get("authorId") as string;
    const parsedAuthorID = parseInt(authorId);

    if (!title || !content || isNaN(parsedAuthorID)) {
      return NextResponse.json(
        { error: "Title, content, and authorId are required." },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: parsedAuthorID,
      },
    });

    return NextResponse.json(
      { message: "Post created successfully.", post },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/posts error:", err);
    return NextResponse.json(
      { error: "Failed to create post", details: `${err}` },
      { status: 500 }
    );
  }
}
