import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
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

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16">
      <div className="my-5">
        <Link href="/posts" className="myBackBtn">
          GO Back
        </Link>
      </div>

      <article className="max-w-2xl w-full space-y-6 border border-gray-300 bg-white shadow-sm px-10 py-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
          <p className="text-sm text-gray-500">by {post.author.name}</p>
        </div>

        <div className="prose prose-gray max-w-none text-justify border border-gray-200 p-6 bg-gray-100">
          {post.content || (
            <em className="text-gray-400">No content available.</em>
          )}
        </div>

        <Link href={`/posts/${post.id}/edit`} className="editPostBtn">
          ✏️ Edit Post
        </Link>
      </article>
    </div>
  );
}
