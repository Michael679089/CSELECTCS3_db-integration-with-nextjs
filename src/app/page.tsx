import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-20">
      <section className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
          Superblog
        </h1>
        <p className="text-gray-500 text-sm italic">
          Ako ay si <span className="font-medium text-gray-700">Michael.</span>
          .
          <br />
          <span className="text-xs text-gray-400">
            (At ako ay isang computer scientist student.)
          </span>
        </p>
      </section>

      <section className="mt-12 w-full max-w-md text-left">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Users:</h2>
        <ol className="list-decimal list-inside space-y-1 text-gray-800">
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ol>
      </section>

      <Link
        href="/posts"
        className="mt-10 text-sm text-white bg-black px-6 py-2 tracking-wide uppercase hover:bg-gray-800 transition"
      >
        View Posts
      </Link>
    </main>
  );
}
