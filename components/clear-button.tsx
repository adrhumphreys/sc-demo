"use client";
import { clearBooks } from "@/utils";

export function ClearButton() {
  return <button onClick={() => clearBooks()}>Clear all books</button>;
}
