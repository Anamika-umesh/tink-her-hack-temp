// app/api/get-confession/route.ts
import { NextRequest, NextResponse } from "next/server";
import { confessionStore } from "../send-confession/route";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token || !confessionStore[token]) {
    return NextResponse.json({ error: "Invalid link" }, { status: 404 });
  }

  return NextResponse.json({
    ...confessionStore[token],   // includes receiverReply, status
  });
}

