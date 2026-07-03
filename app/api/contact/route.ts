import { NextRequest, NextResponse } from "next/server";

const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 1000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    if (!process.env.DISCORD_WEBHOOK_URL) {
      return NextResponse.json({ error: "Configuration Discord manquante" }, { status: 500 });
    }

    const body = await request.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

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
