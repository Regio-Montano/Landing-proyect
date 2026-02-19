// functions/submit.js (Cloudflare Pages)

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    const data = await request.json();

    // ===== ROUND ROBIN =====

    // leer contador actual
    let counter = await env.LEAD_COUNTER.get("count");
    counter = counter ? parseInt(counter) : 0;
    counter++;

    // guardar contador
    await env.LEAD_COUNTER.put("count", counter.toString());

    // asesores disponibles
    const asesores = ["LATAM A", "LATAM B", "LATAM C"];

    // asignación circular
    const asesorAsignado = asesores[(counter - 1) % asesores.length];

    // agregar asesor al lead
    data.asesor = asesorAsignado;

    // ===== ENVIAR A GOOGLE SHEETS =====

    const scriptURL = "https://script.google.com/macros/s/AKfycbzimWTRUjkA9OxvFoP2y9Enu2491NebIHStosSRKAQvH7wlfzETFOrI61pI1V93jQoATA/exec";

    const response = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.text();

    return new Response(
      JSON.stringify({
        success: true,
        asesor: asesorAsignado,
        result
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      { status: 500 }
    );
  }
}
