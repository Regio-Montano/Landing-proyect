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
    const scriptURL = "https://script.google.com/macros/s/AKfycbzU9b9LKza2bHSfV7_5X6K5wwSrj0StgOG9q19A9UrJGdyUscmRu7t1zP3nT3WivJDtHA/exec"

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
