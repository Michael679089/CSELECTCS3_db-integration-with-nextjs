// src/app/posts/new/page.tsx (Server Component)

import PostFormClient from "@/app/ui/PostFormClient";
import { AuthorCreate } from "@/lib/interfaces";
import { getBaseUrl } from "@/lib/utils";

export default async function NewPostPage() {
  const baseUrl = getBaseUrl(); // returns either localhost or Vercel URL
  const response = await fetch(`${baseUrl}/api/authors`, { cache: "no-store" });

  const authors: AuthorCreate[] = await response.json();

  return (
    <div>
      <PostFormClient authors={authors} />;
    </div>
  );
}
