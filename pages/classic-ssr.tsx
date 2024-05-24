import "../app/pico.css";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState } from "react";
import { Book } from "@prisma/client";
import { prisma } from "@/db";
import Link from "next/link";

export const getServerSideProps = (async () => {
  const initialBooks = await prisma.book.findMany();
  return { props: { initialBooks: JSON.parse(JSON.stringify(initialBooks)) } };
}) satisfies GetServerSideProps<{ initialBooks: Book[] }>;

export default function ClassicSSR({
  initialBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [books, setBooks] = useState<Book[] | undefined>(initialBooks);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await fetch(`/api/books`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
      }),
    });

    setTitle("");
    setAuthor("");
    setIsSubmitting(false);

    await fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.books));
  };

  return (
    <div className="container">
      {books ? (
        <ul>
          {books.map((book) => (
            <li key={book.title}>
              {book.title} - {book.author}
            </li>
          ))}
        </ul>
      ) : (
        <p>loading</p>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      <p>What issues did we solve:</p>
      <li>
        The first render is quick, the user makes one request and gets all the
        initial content
      </li>
      <li>There is no content layout shift</li>
      <br />
      <p>Pain points:</p>
      <li>
        We still need all the code from before to handle the interactions with
        the books
      </li>
      <li>
        When we invalidate data we have to go back to the old API to refetch it
      </li>
      <li>
        Routes are treated seperately, if we click on a book we&apos;ll need to
        refetch the list of books
      </li>
      <li>We have an API we have to maintain</li>
      <ul>
        <li>
          Classically this has meant having a backend and a frontend tech stack
        </li>
      </ul>
      <br />
      <p>
        Along came <Link href="/server-components">server components</Link>
      </p>
    </div>
  );
}
