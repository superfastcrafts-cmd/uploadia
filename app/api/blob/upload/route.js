import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/blob/upload", method: "GET" });
}

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "Missing file" },
        { status: 400 }
      );
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Server missing BLOB_READ_WRITE_TOKEN" },
        { status: 500 }
      );
    }

    const key = `uploads/${Date.now()}-${file.name}`;
    const { url } = await put(key, file, {
      access: "public",
      token,
      contentType: file.type || "application/octet-stream",
    });

    return NextResponse.json({
      ok: true,
      url,
      pathname: new URL(url).pathname,
      name: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 });
  }
}
