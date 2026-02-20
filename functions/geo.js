export async function onRequest(context) {

  const country = context.request.cf?.country || "MX";

  return new Response(
    JSON.stringify({ country }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
}
