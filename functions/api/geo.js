export async function onRequest(context) {

  const country = "BR";

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
