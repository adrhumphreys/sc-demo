export type Book = {
  title: string;
  author: string;
  pages: number;
};

const books: Book[] = [
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J. K. Rowling",
    pages: 256,
  },
  {
    title: "The Lord of the Rings",
    author: "John Ronald Reuel Tolkien",
    pages: 435,
  },
];

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchBooks(): Promise<Book[]> {
  console.log("running func");
  await wait(500);
  return books;
}

import { cache } from "react";

export const cachedFetchBooks = cache(async () => fetchBooks());
