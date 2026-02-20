export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    const PIXEL_ID = "777552184901375";

    const ACCESS_TOKEN = "EAANAFTdfWwMBQ321pF0bswYFajsgcxCPniVgC4To7aqswt4wbSGs3eEgb6N84tOZBUyabl8eb4TRJ487T8A7KxMbr6qBMx7XL64YKZAqzGHB4clBW66L8j62uKCFbPW75wXVqzAfWvK9O9UuZAOPwikRZAK5thSZCEJZAtUuHGH673Fj11bFZBWBMDzcvqMshf02wZDZD";

    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwajXERqDZwOlQ8ozLuw--PNJdBvbxGtKL_TwMu6h_MrIwWmc63-UUIuXL6hKkhRuTEKw/exec";

    // ========================
    // NORMALIZAR DATOS
    // ========================

    const eventId = body.eventId || crypto.randomUUID();

    const cleanEmail = body.email?.trim().toLowerCase();
    const cleanPhone = body.phone?.replace(/\D/g, "");
    const cleanName = body.name?.trim().toLowerCase();

    const ip =
      context.request.headers.get("CF-Connecting-IP") ||
      context.request.headers.get("x-forwarded-for");

    const userAgent = context.request.headers.get("user-agent");

    // ========================
    // 1️⃣ GUARDAR EN SHEETS
    // (orden alineado con tu spreadsheet)
    // ========================

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        phone: body.phone,
        email: body.email,
        campaign: body.campaign || "TRADING",
        country: body.country || "MX",
        lada: body.lada || "",
        lang: body.lang || "es",
        eventId
      })
    });

    // ========================
    // 2️⃣ META CONVERSION API (SERVER SIDE)
    // ========================

    const userData = {
      em: cleanEmail ? [await sha256(cleanEmail)] : undefined,
      ph: cleanPhone ? [await sha256(cleanPhone)] : undefined,
      fn: cleanName ? [await sha256(cleanName)] : undefined,
      client_ip_address: ip,
      client_user_agent: userAgent
    };

    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId, // 🔥 deduplicación con pixel
          action_source: "website",
          event_source_url: context.request.headers.get("referer"),
          user_data: userData
        }
      ]
    };

    await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.log("Error submit:", error);

    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// ========================
// HASH SHA256 META
// ========================

async function sha256(value) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
