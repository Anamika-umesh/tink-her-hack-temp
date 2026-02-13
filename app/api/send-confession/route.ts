// app/api/send-confession/route.ts
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Demo in-memory store (replace with DB later)
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
    const { receiverEmail, confessionText, senderEmail } = await request.json();

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
      },
      createdAt: new Date().toISOString(),
    };

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // login page is "/"
    const receiverLink = `${appUrl}/?redirect=/receiver?token=${token}`;

    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0f0f0f; color: #fff; padding: 20px; border-radius: 12px;">
        <h2 style="color: #e63946; text-align: center;">💌 Someone Has a Secret for You</h2>
        <p style="text-align: center;">
          You’ve received an <b>anonymous confession</b> on <b>VEIL</b>.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${receiverLink}"
             style="background: #e63946; color: #fff; padding: 12px 24px; border-radius: 30px; text-decoration: none;">
            🔐 View Confession Securely
          </a>
        </div>
        <p style="text-align: center; font-size: 12px; color: #aaa;">
          Accept to reveal the message. Reject if not interested.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"VEIL Confessions" <${process.env.EMAIL_USER}>`,
      to: receiverEmail,
      subject: "💌 Someone Sent You a Secret Confession",
      html: emailBody,
    });

    return NextResponse.json({ success: true, receiverLink, token });
  } catch (err) {
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
