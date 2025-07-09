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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)] border border-black px-20 py-10">
        <div className="title_part">
          <h1 className="text-4xl font-bold mb-8 text-[#333333]">
            {post.title}
          </h1>
          <p className="text-gray-600 text-center">by {post.author.name}</p>
        </div>
        <div className="prose prose-gray mt-8 border border-black">
          {post.content || "No content available."}
        </div>
        <Link
          href={`/posts/${post.id}/edit`}
          className="bg-black text-white w-full p-5"
        >
          Edit Post
        </Link>
      </article>
    </div>
  );
}
