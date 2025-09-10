import { NextResponse } from "next/server";

export async function POST(req) {
  const { lang } = await req.json();

  if (!lang || !["en", "hi", "gu", "mr"].includes(lang)) {
    return NextResponse.json({ error: "Invalid language" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("NEXT_LOCALE", lang, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return response;
}
