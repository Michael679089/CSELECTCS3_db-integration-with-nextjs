// src/app/posts/new/page.tsx (Server Component)

import PostFormComponentClient from "@/app/ui/PostFormClient";
import { AuthorCreate } from "@/lib/interfaces";

export default async function NewPostPage() {
  const response = await fetch("http://localhost:3000/api/authors", {
    cache: "no-store",
  });
  const authors: AuthorCreate[] = await response.json();

  return (
    <div>
      <PostFormComponentClient authors={authors} />;
    </div>
  );
}
