const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("loading");
  setMessage("");

  try {

    const eventId = generateEventId();

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    };

    // 🔥 LLAMADA A TU CLOUDFLARE WORKER
    const res = await fetch("https://TU-WORKER.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || data.message || "Error");
    }

    // Evento Lead para Meta Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {}, { eventID: eventId });
    }

    setStatus("success");
    setMessage("Te enviamos un código por SMS 📲");

    // Aquí luego abrimos pantalla OTP

  } catch (err) {
    console.error(err);
    setStatus("error");
    setMessage(err.message || t.error);
  }
};
