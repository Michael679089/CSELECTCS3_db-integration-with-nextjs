// src/app/posts/page.tsx
import Link from "next/link";
import { getPosts } from "@/lib/prisma"; // ✅ valid import
import { Post } from "@/lib/interfaces";

export default async function Posts() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 text-[#333333]">Posts</h1>
      <ul className="max-w-2xl space-y-4">
        {posts.map((post: Post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
            <span className="text-sm text-gray-600 ml-2">
              by {post.author?.name ?? "Unknown"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
