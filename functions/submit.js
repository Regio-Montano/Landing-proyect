export async function onRequest(context) {

  // ===== CORS =====
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }

  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { request } = context;
    const data = await request.json();

    // ===== DETECTAR PAÍS POR IP (Cloudflare header) =====
    const country = request.headers.get("CF-IPCountry") || "MX";

    // ===== ASIGNAR ASESOR AUTOMÁTICO =====
    // puedes cambiar lógica después
    const asesores = ["LATAM A", "LATAM B", "LATAM C"];
    const asesor = asesores[Math.floor(Math.random() * asesores.length)];

    // ===== PAYLOAD EXACTO PARA SHEETS =====
    const payload = {
      name: data.name || "",
      phone: data.phone || "",
      email: data.email || "",
      campaign: "TRADING",
      country: country,
      countryCode: "", // LADA (si luego quieres extraerla del teléfono)
      asesor: asesor
    };

    // ===== URL GOOGLE SCRIPT =====
    const scriptURL = "https://script.google.com/macros/s/AKfycbwajXERqDZwOlQ8ozLuw--PNJdBvbxGtKL_TwMu6h_MrIwWmc63-UUIuXL6hKkhRuTEKw/exec";

    const res = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Error enviando a sheets");

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
}
