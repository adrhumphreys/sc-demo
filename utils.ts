"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./db";

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function clearBooks() {
  await prisma.book.deleteMany();
  revalidatePath("/server-components");
}
