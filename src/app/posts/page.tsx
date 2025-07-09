// src/app/posts/page.tsx
import { getPosts } from "@/lib/prisma"; // ✅ valid import
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { NextResponse } from "next/server";

export default async function Posts() {
  const posts = await getPosts();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  async function handleDelete(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const parsedId = parseInt(id);

    console.log("sending id:", parsedId);
    try {
      const deleteResponse = await fetch(`${baseUrl}/api/posts/${parsedId}`, {
        method: "DELETE",
      });
      const deleteResponseJSON = await deleteResponse.json();

      if (deleteResponseJSON.success == true) {
        revalidatePath("/posts");
        NextResponse.redirect(`${baseUrl}/posts`);
      }
    } catch (error) {
      console.log(error);
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
