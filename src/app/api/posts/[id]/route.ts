import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId)) {
    return NextResponse.json(
      {
        error: `Invalid ID "${id}". Likely a non-API request like React DevTools.`,
      },
      { status: 401 }
    );
  }

  // if not stopped continue using prisma

  const post = await prisma.post.findUnique({
    where: {
      id: parsedId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json(post, { status: 200 });
}

export async function PUT(req: NextRequest) {
  console.log("Calling API Route PUT");
  const formData = await req.formData();

  if (
    !formData ||
    !parseInt(formData.get("id") as string) ||
    !formData.get("title") ||
    !formData.get("content")
  ) {
    console.log("ERROR: Missing properties, cannot update post.");
    return NextResponse.json(
      { error: "Missing properties. Cannot update post." },
      { status: 400 }
    );
  }

  // Update the post if no missing properties:
  const updatedPost = await prisma.post.update({
    where: {
      id: parseInt(formData.get("id") as string), // Type 'FormDataEntryValue' is not assignable to type 'number | undefined'. Type 'string' is not assignable to type 'number'.
    },
    data: {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });
  console.log("Post updated successfully.");
  return NextResponse.json(
    { message: "Post updated successfully.", post: updatedPost },
    { status: 200 }
  );
}
