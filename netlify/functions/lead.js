// netlify/functions/lead.js
export async function handler(event) {
  try {
    // Manejo de solicitudes OPTIONS (preflight)
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Permite que cualquier origen haga preflight
          'Access-Control-Allow-Methods': 'POST, OPTIONS', // Métodos permitidos
          'Access-Control-Allow-Headers': 'Content-Type', // Headers permitidos en la solicitud real
        },
        body: '', // El cuerpo de la respuesta OPTIONS suele estar vacío
      };
    }

    // Asegurarse de que solo se acepten solicitudes POST después del preflight
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: 'Method Not Allowed',
      };
    }

    // La URL de tu Google Apps Script
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw2cRAm_dOBCxw7HJLdXbkntQpyO6Tq-7lS-f6DYgqPffAmkXMsyww5-xOVZshbi5Ea2g/exec';

    // Reenviamos tal cual el body (que viene como JSON desde el frontend) al Apps Script
    // PERO con el Content-Type: text/plain para evitar el preflight con Apps Script
    const resp = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: event.body, // El body ya viene como string JSON desde el frontend
    });

    // Apps Script devuelve JSON, pero como texto plano. Lo leemos como texto.
    const text = await resp.text(); // Apps Script devuelve JSON como texto

    // Devolvemos la respuesta al frontend, pero ahora sí como application/json
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Permite que cualquier origen acceda a esta función
        'Content-Type': 'application/json', // Le decimos al frontend que esto es JSON
      },
      body: text, // El JSON que nos devolvió Apps Script
    };
  } catch (err) {
    // Manejo de errores para cualquier problema en la función
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ result: 'error', message: String(err) }),
    };
  }
}