import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, message } = await request.json();

    const discordPayload = {
      username: "Portfolio - Contact",
      embeds: [{
        title: "📩 Nouveau message",
        color: 5814783,
        fields: [
          { name: "Expéditeur", value: email || "Non spécifié", inline: false },
          { name: "Message", value: message || "Pas de contenu", inline: false },
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

    if (!response.ok) throw new Error('Erreur Discord');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}