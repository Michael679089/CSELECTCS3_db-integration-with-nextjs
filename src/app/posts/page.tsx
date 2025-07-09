// src/app/posts/page.tsx
import prisma from "@/lib/prisma";
import { getPosts } from "@/lib/utils"; // ✅ valid import
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const dynamic = "force-dynamic"; // ensures fresh data every request

export default async function Posts() {
  const posts = await getPosts();

  async function handleDelete(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      console.error("Invalid ID");
      return;
    }

    try {
      await prisma.post.delete({
        where: { id: parsedId },
      });

      revalidatePath("/posts");
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="border border-[#333333] p-10">
        <h1 className="text-4xl text-center font-bold mb-8 text-[#333333]">
          Posts
        </h1>
        <div className="text-2xl text-center py-5 my-10">
          <Link href="/posts/new" className="post-create-btn">
            Create a Post
          </Link>
        </div>

        {posts.map((post) => (
          <div key={post.id} className="grid grid-cols-2 border-b py-2">
            <div>
              <Link href={`/posts/${post.id}`} className="font-bold">
                {post.id} | {post.title}
              </Link>
              <p>by {post.author.name}</p>
            </div>
            <div className="grid grid-cols-3">
              <Link href={`/posts/${post.id}`} className="p-2 m-2 bg-amber-50">
                👁️ View
              </Link>
              <Link
                href={`/posts/${post.id}/edit`}
                className="p-2 m-2 bg-slate-100"
              >
                ⚙️ Edit
              </Link>
              <form action={handleDelete}>
                <input type="hidden" name="id" value={post.id} />
                <button
                  type="submit"
                  className="p-2 m-2 bg-red-200 cursor-pointer"
                >
                  ❌ Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
