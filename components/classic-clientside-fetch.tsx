"use client";

import { Book } from "@prisma/client";
import { useEffect, useState } from "react";

export default function ClassicClientSideFetch() {
  const [books, setBooks] = useState<Book[] | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [invalidate, setInvalidate] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setBooks(undefined);
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.books));
  }, [invalidate]);

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
    setInvalidate(invalidate + 1);
    setIsSubmitting(false);
  };

  return (
    <div>
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
    </div>
  );
}
