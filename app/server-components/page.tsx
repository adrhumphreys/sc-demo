import { ClearButton } from "@/components/clear-button";
import { SubmitButton } from "@/components/submit-button";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function YeNewServerComponents() {
  const books = await prisma.book.findMany();

  async function addBook(formData: FormData) {
    "use server";

    const title = formData.get("title")?.toString();
    const author = formData.get("author")?.toString();

    if (!title || !author) throw new Error("missing deets");

    await prisma.book.create({
      data: { title, author },
    });

    revalidatePath("/server-components");
  }

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
      <form action={addBook}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required />
        <label htmlFor="author">Author</label>
        <input type="text" name="author" id="author" required />
        <SubmitButton />
      </form>
      <ClearButton />

      <br />
      <br />
      <p>What issues did we solve:</p>
      <li>
        The first render is quick, the user makes one request and gets all the
        initial content.
      </li>
      <li>There is no content layout shift</li>
      <li>
        When a user adds a new book, we just invalidate the specific cache, this
        can be tag, path, etc
      </li>
      <li>We don&apos;t manage the state of the form or the inputs inside</li>
      <li>We don&apos;t manage an API</li>
      <li>Do we even need JS anymore?</li>
      <br />
      <p>
        <Link href="/">Home</Link>
      </p>
    </div>
  );
}
