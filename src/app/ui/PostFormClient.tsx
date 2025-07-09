"use client";

import { AuthorCreate } from "@/lib/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewPostForm({ authors }: { authors: AuthorCreate[] }) {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const formResponse = await fetch("/api/posts/0", {
      method: "POST",
      body: formData,
    });

    if (formResponse.ok) {
      router.push("/posts");
    } else {
      const error = await formResponse.json();
      console.error("Create post error:", error);
    }
  }

  return (
    <div className="min-h-screen max-w-2xl mx-auto px-6 py-10 bg-white border border-gray-300">
      <div className="mb-6">
        <Link href="/posts" className="myBackBtn">
          ← Go Back
        </Link>
      </div>

      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        Create New Post
      </h1>

      <form onSubmit={handleSubmit} className="myForm">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your post title"
            required
          />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            placeholder="Write your post content here..."
            required
          />
        </div>

        <div>
          <label htmlFor="authorId">Writing as?</label>
          <select name="authorId" id="authorId" required>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}, {a.id}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
