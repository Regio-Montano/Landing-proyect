// netlify/functions/submit.js

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    // URL de tu Google Apps Script
    const scriptURL = "https://script.google.com/macros/s/AKfycbznAD0fxgHUvELOemoPd9hFdCyiuRRXGiAG5Z-M1NUyL-0q2_ywnM8jBxx2xnipyUd2zw/exec"
      
"https://script.google.com/macros/s/AKfycbznADOfxgHUvLEomoPd9hFdCyiuRRXGiAGSZ-M1NUyl-0q2_ywmM8jBxx2nipyUd2zw/exec";

    // Redirigir los datos al Apps Script
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, result }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
}
