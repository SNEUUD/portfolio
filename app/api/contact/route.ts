import { NextRequest, NextResponse } from "next/server";

const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 1000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitHits.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.DISCORD_WEBHOOK_URL) {
      return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 });
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Trop de tentatives, réessayez plus tard" },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const honeypot = typeof body?.website === "string" ? body.website.trim() : "";

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    if (!email || !EMAIL_REGEX.test(email) || email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    if (!message || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message invalide (1 à ${MAX_MESSAGE_LENGTH} caractères)` },
        { status: 400 }
      );
    }

    const discordPayload = {
      username: "Portfolio - Contact",
      embeds: [{
        title: "📩 Nouveau message",
        color: 5814783,
        fields: [
          { name: "Expéditeur", value: email, inline: false },
          { name: "Message", value: message, inline: false },
        ],
        footer: { text: "Envoyé depuis Portfolio Next.js" },
        timestamp: new Date().toISOString(),
      }]
    };

    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) throw new Error(`Discord a répondu avec le statut ${response.status}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur API Contact:", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 });
  }
}
