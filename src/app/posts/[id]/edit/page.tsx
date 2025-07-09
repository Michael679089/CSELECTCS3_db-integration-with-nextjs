import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditFormClient from "@/app/ui/EditFormClient";
import Link from "next/link";

import { post } from "@/lib/interfaces";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
    },
  });

  if (!post) {
    // this one calls a 404 page.
    notFound();
  }

  const myPost = {
    id: post.id,
    title: post.title,
    content: post.content,
  } as post;

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center w-full">
      <div className="my-5">
        <Link href="/posts" className="myBackBtn">
          GO Back
        </Link>
      </div>
      <h1> Hello this text is from the Server: </h1>
      <EditFormClient post={myPost} />
    </div>
  );
}
