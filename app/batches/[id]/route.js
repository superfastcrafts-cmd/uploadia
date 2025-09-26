import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  const id = params?.id ?? "";
  const items = Array.from({ length: 3 }).map((_, i) => ({
    name: `Mock item ${i + 1}`,
  }));
  return NextResponse.json({ id, items });
}