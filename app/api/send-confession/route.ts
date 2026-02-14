// app/api/send-confession/route.ts
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// In-memory store for demo purposes. Replace with DB in production.
export const confessionStore: Record<string, any> = {};

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      receiverEmail?: string;
      confessionText?: string;
      senderEmail?: string;
    };

    const { receiverEmail, confessionText, senderEmail } = body;

    if (!receiverEmail || !confessionText) {
      return NextResponse.json(
        { error: "Missing receiverEmail or confessionText" },
        { status: 400 }
      );
    }

    const token = uuidv4();

    confessionStore[token] = {
      confessionText,
      senderProfile: {
        name: senderEmail || "Anonymous",
        bio: "Someone who secretly admires you.",
        photo: "/avatar.png",
        contact: "Not shared",
      },
      status: "pending",      // pending | accepted | rejected
      receiverReply: null,
      invalid: false,         // 🔒 used to block link after reject
      createdAt: new Date().toISOString(),
    };

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Receiver page (accept)
    const receiverLink = `${appUrl}/receiver?token=${token}`;

    // Reject link (email button)
    const rejectLink = `${appUrl}/api/respond-confession?token=${token}&action=reject`;

    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 12px; background: #111; color: #fff;">
        <h2 style="color: #e63946; text-align: center;">💌 You've Received an Anonymous Confession</h2>
        <p style="text-align: center;">You can choose to accept or reject this confession.</p>

        <div style="display:flex; justify-content:center; gap:16px; margin: 30px 0;">
          <a href="${receiverLink}"
             style="background:#2ecc71;color:#000;padding:12px 20px;border-radius:8px;text-decoration:none;">
             Accept ❤️
          </a>

          <a href="${rejectLink}"
             style="background:#e63946;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;">
             Reject 💔
          </a>
        </div>

        <p style="font-size:12px;color:#aaa;text-align:center;">
          Accept to reveal the message. Reject to permanently close this link.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER || "noreply@veil.app",
      to: receiverEmail,
      subject: "💌 Anonymous confession received",
      html: emailBody,
    });

    return NextResponse.json({ success: true, receiverLink, token });
  } catch (err) {
    console.error("send-confession error:", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
