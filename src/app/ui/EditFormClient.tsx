"use client";

// import { useState } from "react";
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
      <pre> {JSON.stringify(post)} </pre>
      <form action={handleSubmit} className="myForm">
        <div>
          <input name="id" value={post.id} type="hidden" />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder={post.title}
            defaultValue={post.title}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            placeholder={post.content}
            rows={6}
            defaultValue={post.content}
          />
        </div>
        <button type="submit">Edit Post</button>
      </form>
    </div>
  );
}
