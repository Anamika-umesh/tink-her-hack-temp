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

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      token?: string;
      status?: "accepted" | "rejected";
      receiverReply?: string;
    };

    const { token, status, receiverReply } = body;

    if (!token || !confessionStore[token]) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Update confession store
    confessionStore[token].status = status || "pending";
    confessionStore[token].receiverReply = receiverReply || "";
    confessionStore[token].respondedAt = new Date().toISOString();

    // Mark as invalid if rejected
    if (status === "rejected") {
      confessionStore[token].invalid = true;
    }

    return NextResponse.json({
      success: true,
      message: `Confession ${status || "updated"}`,
    });
  } catch (err) {
    console.error("respond-confession POST error:", err);
    return NextResponse.json(
      { error: "Failed to respond to confession" },
      { status: 500 }
    );
  }
}
