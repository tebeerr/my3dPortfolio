import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Types ────────────────────────────────────────────────────────────────────

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

interface ApiError {
  error: string;
  field?: string;
}

// ── Validation ───────────────────────────────────────────────────────────────

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: unknown): ContactPayload | ApiError {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const { name, email, message } = body as Record<string, unknown>;

  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim() : "";
  const trimmedMessage = typeof message === "string" ? message.trim() : "";

  if (!trimmedEmail) return { error: "Email is required", field: "email" };
  if (!EMAIL_RE.test(trimmedEmail)) return { error: "Invalid email address", field: "email" };
  if (trimmedEmail.length > MAX_EMAIL) return { error: "Email is too long", field: "email" };

  if (!trimmedMessage) return { error: "Message is required", field: "message" };
  if (trimmedMessage.length > MAX_MESSAGE) return { error: "Message is too long (5 000 char max)", field: "message" };

  if (trimmedName.length > MAX_NAME) return { error: "Name is too long", field: "name" };

  return { name: trimmedName, email: trimmedEmail, message: trimmedMessage };
}

function isError(result: ContactPayload | ApiError): result is ApiError {
  return "error" in result;
}

// ── SMTP Transport ───────────────────────────────────────────────────────────

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

// ── HTML template ────────────────────────────────────────────────────────────

function buildHtml({ name, email, message }: ContactPayload): string {
  const escapedName = escapeHtml(name || "Anonymous");
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #070a10; color: #e6f1ff; border: 1px solid rgba(100,255,218,0.15); border-radius: 12px;">
      <h2 style="margin: 0 0 4px; font-size: 20px; color: #64ffda;">New portfolio message</h2>
      <p style="margin: 0 0 24px; font-size: 13px; color: #8892b0;">from ramziteber.vercel.app</p>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #8892b0; width: 80px; vertical-align: top;">Name</td>
          <td style="padding: 8px 0; color: #e6f1ff;">${escapedName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #8892b0; vertical-align: top;">Email</td>
          <td style="padding: 8px 0;"><a href="mailto:${escapedEmail}" style="color: #64ffda; text-decoration: none;">${escapedEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #8892b0; vertical-align: top;">Message</td>
          <td style="padding: 8px 0; color: #e6f1ff; line-height: 1.6;">${escapedMessage}</td>
        </tr>
      </table>

      <hr style="border: none; border-top: 1px solid rgba(100,255,218,0.12); margin: 24px 0 12px;" />
      <p style="margin: 0; font-size: 11px; color: #5a6778;">You can reply directly to this email — it will reach ${escapedEmail}.</p>
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Validate
  const result = validate(body);
  if (isError(result)) {
    return NextResponse.json(result, { status: 422 });
  }

  // Build transport
  const transporter = createTransport();
  if (!transporter) {
    return NextResponse.json(
      { error: "Mail service is not configured. Please contact me directly at teberramzi@gmail.com." },
      { status: 503 }
    );
  }

  // Send
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || "teberramzi@gmail.com",
      replyTo: result.email,
      subject: `Portfolio: ${result.name || "Anonymous"} — ${result.message.slice(0, 60)}`,
      html: buildHtml(result),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] SMTP error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
