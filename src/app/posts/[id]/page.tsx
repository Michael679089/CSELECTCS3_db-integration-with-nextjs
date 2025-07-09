import { PostShow } from "@/lib/interfaces";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  let response: Response;
  let post: PostShow;

  try {
    const id = (await params).id;
    response = await fetch(`${baseUrl}/api/posts/${id}`, {
      method: "GET",
      cache: "no-store",
    });
    post = await response.json(); // ✅ only once
    console.log(post);
  } catch (error) {
    console.error("ERROR: ", error);
    notFound(); // Show 404 if fetch or parse fails
  }

  if (!response.ok) {
    notFound();
  }

  console.log("MY POST:", post);

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
