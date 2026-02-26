export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    // ======================
    // CONFIG
    // ======================
    const PIXEL_ID = "777552184901375";
    const ACCESS_TOKEN = "EAANAFTdfWwMBQ321pF0bswYFajsgcxCPniVgC4To7aqswt4wbSGs3eEgb6N84tOZBUyabl8eb4TRJ487T8A7KxMbr6qBMx7XL64YKZAqzGHB4clBW66L8j62uKCFbPW75wXVqzAfWvK9O9UuZAOPwikRZAK5thSZCEJZAtUuHGH673Fj11bFZBWBMDzcvqMshf02wZDZD";
    const TEST_EVENT_CODE = "TEST16901"; // usa el que aparece en Meta

    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwajXERqDZwOlQ8ozLuw--PNJdBvbxGtKL_TwMu6h_MrIwWmc63-UUIuXL6hKkhRuTEKw/exec";

    // ======================
    // VALIDAR EVENT ID (CLAVE)
    // ======================
    const eventId = body.eventId || crypto.randomUUID();

    // ======================
    // GUARDAR EN SHEETS
    // ======================
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    // ======================
    // META CONVERSION API
    // ======================
    const ip =
      context.request.headers.get("CF-Connecting-IP") ||
      context.request.headers.get("x-forwarded-for") ||
      "";

    const userAgent =
      context.request.headers.get("user-agent") || "";

    const userData = {
      em: body.email ? [await sha256(body.email)] : undefined,
      ph: body.phone ? [await sha256(body.phone)] : undefined,
      fn: body.name ? [await sha256(body.name)] : undefined,
      client_ip_address: ip,
      client_user_agent: userAgent
    };

    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url:
            context.request.headers.get("referer") || "",
          event_id: eventId, // ⭐ MISMO ID DEL FRONTEND
          user_data: userData
        }
      ],
      test_event_code: TEST_EVENT_CODE
    };

    const metaRes = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    const metaData = await metaRes.json();
    console.log("META RESPONSE:", metaData);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.log("ERROR:", error);

    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

async function sha256(value) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value.trim().toLowerCase());
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
