// app/api/respond-confession/route.ts
import { NextRequest, NextResponse } from "next/server";
import { confessionStore } from "../send-confession/route";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const action = searchParams.get("action"); // accept | reject

  if (!token || !confessionStore[token]) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  if (action === "reject") {
    confessionStore[token].status = "rejected";
    confessionStore[token].invalid = true;
    confessionStore[token].respondedAt = new Date().toISOString();

    // ✅ Redirect to a clean success page instead of showing broken JSON
    return NextResponse.redirect(
      new URL("/receiver-rejected", req.url)
    );
  }

  return NextResponse.json({ success: true });
}
