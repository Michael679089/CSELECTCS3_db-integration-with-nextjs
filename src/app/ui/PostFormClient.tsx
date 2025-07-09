"use client";

import { AuthorCreate } from "@/lib/interfaces";
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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="myForm">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your post title"
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your post content here..."
            rows={6}
          />
        </div>
        <div>
          <label>Writing as?</label>
          <select name="authorId">
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
