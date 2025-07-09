// src/app/posts/new/page.tsx (Server Component)

import prisma from "@/lib/prisma";
import PostFormClient from "@/app/ui/PostFormClient";
import { AuthorCreate } from "@/lib/interfaces";

export default async function NewPostPage() {
  const authors = (
    await prisma.user.findMany({
      select: { id: true, name: true },
    })
  ).filter((a): a is AuthorCreate => a.name !== null);

  const myAuthors: AuthorCreate[] = authors;

  return (
    <div>
      <PostFormClient authors={myAuthors}></PostFormClient>
    </div>
  );
}
