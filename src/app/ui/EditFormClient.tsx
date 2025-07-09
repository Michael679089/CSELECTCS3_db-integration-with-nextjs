"use client";

import { post } from "@/lib/interfaces";
import { useRouter } from "next/navigation";

export default function EditFormClient({ post }: { post: post }) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    if (
      formData.get("title") === post.title &&
      formData.get("content") === post.content
    ) {
      console.log("ERROR: Title & Content unchanged. Updated cancelled");
      return;
    }

    try {
      const response = await fetch(`/api/posts/${formData.get("id")}`, {
        method: "PUT",
        body: formData,
      });
      const responseJSON = await response.json();
      if (responseJSON.error) {
        throw new Error("ERROR: ", responseJSON.error);
      }

      router.push("/posts");
    } catch (error) {
      // Not JSON - probably an HTML redirect or error
      console.error("Failed to update post:", error);
    }
  }

  return (
    <div>
      {/* Debug Output */}
      <pre className="mb-10 w-full max-w-4xl overflow-x-auto bg-gray-100 text-xs leading-tight text-gray-800 p-4 border border-gray-300">
        {JSON.stringify(post, null, 2)}
      </pre>

      {/* Edit Form */}
      <form action={handleSubmit} className="myForm">
        <input name="id" value={post.id} type="hidden" />

        {/* Title Field */}
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={post.title}
            placeholder="Post title"
          />
        </div>

        {/* Content Field */}
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            defaultValue={post.content}
            placeholder="Write your content here..."
            rows={12}
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
