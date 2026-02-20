export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    const PIXEL_ID = "777552184901375";

    const ACCESS_TOKEN = "EAANAFTdfWwMBQ321pF0bswYFajsgcxCPniVgC4To7aqswt4wbSGs3eEgb6N84tOZBUyabl8eb4TRJ487T8A7KxMbr6qBMx7XL64YKZAqzGHB4clBW66L8j62uKCFbPW75wXVqzAfWvK9O9UuZAOPwikRZAK5thSZCEJZAtUuHGH673Fj11bFZBWBMDzcvqMshf02wZDZD";

    // Hash datos usuario (requerido por Meta)
    const userData = {
      em: body.email ? [await sha256(body.email)] : undefined,
      ph: body.phone ? [await sha256(body.phone)] : undefined,
      fn: body.name ? [await sha256(body.name)] : undefined
    };

    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.log("Error:", error);

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
