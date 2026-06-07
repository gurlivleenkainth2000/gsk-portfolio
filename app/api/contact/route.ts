import type { ContactFormValues } from "@/types/contact";

import { NextResponse } from "next/server";
import { Resend } from "resend";

// This route talks to a third-party API at request time — never prerender it.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate the raw JSON body into a trusted ContactFormValues.
 * Returns either the cleaned payload or a human-readable error string.
 */
function parseBody(
  body: unknown,
): { ok: true; data: ContactFormValues } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body." };
  }

  const { name, email, subject, message, company } = body as Record<
    string,
    unknown
  >;

  if (typeof name !== "string" || name.trim().length < 2) {
    return { ok: false, error: "Please enter your name." };
  }
  if (typeof email !== "string" || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    return { ok: false, error: "Please enter a longer message." };
  }

  return {
    ok: true,
    data: {
      name: name.trim(),
      email: email.trim(),
      subject: typeof subject === "string" ? subject.trim() : "",
      message: message.trim(),
      company: typeof company === "string" ? company : "",
    },
  };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = parseBody(body);

  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { name, email, subject, message, company } = parsed.data;

  // Honeypot tripped — pretend success so bots get no signal, but send nothing.
  if (company && company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    // eslint-disable-next-line no-console
    console.error(
      "Contact form is missing RESEND_API_KEY / CONTACT_* env vars",
    );

    return NextResponse.json(
      { error: "The contact form is not configured yet." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const cleanSubject = subject || "New portfolio contact message";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `[Portfolio] ${cleanSubject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${cleanSubject}\n\n${message}`,
  });

  if (error) {
    // eslint-disable-next-line no-console
    console.error("Resend failed to send contact email:", error);

    return NextResponse.json(
      { error: "Something went wrong sending your message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
