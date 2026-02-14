import { NextRequest, NextResponse } from "next/server";
import { confessionStore } from "../send-confession/route";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 400 });
  }

  const data = confessionStore[token];

  if (!data) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 404 });
  }

  if (data.invalid) {
    return NextResponse.json({ error: "This link has been rejected" }, { status: 410 });
  }

  return NextResponse.json({
    confessionText: data.confessionText,
    senderProfile: data.senderProfile,
    status: data.status,
    createdAt: data.createdAt,
  });
}
