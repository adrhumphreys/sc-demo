import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { wait } from "@/utils";

export async function POST(req: Request) {
  const { title, author } = await req.json();

  const newBook = await prisma.book.create({
    data: { title, author },
  });

  await wait(1000);

  return NextResponse.json(newBook, { status: 200 });
}

export async function GET() {
  const books = await prisma.book.findMany();

  await wait(1000);

  return NextResponse.json({ books });
}
