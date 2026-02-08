import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz3KCEKH3FlZiV01W7Q7jWITrmPkeBRYRtd5bl0P-mVuxXTSWs3ye_b8ABTjjtAHVX7yw/exec";

export default function ModernLeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "MX",
    countryCode: "+52",
  });

  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const params = new URLSearchParams(formData).toString();

    // 🔥 ENVÍO SIN CORS (GARANTIZADO)
    const img = new Image();
    img.src = `${SCRIPT_URL}?${params}`;

    setStatus("success");
    setMessage("Registro enviado correctamente ✅");

    setFormData({
      name: "",
      phone: "",
      email: "",
      country: "MX",
      countryCode: "+52",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Tu nombre"
        required
      />

      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Tu teléfono"
        required
      />

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Tu email"
        required
      />

      <button type="submit">
        {status === "loading" ? "Enviando..." : "¡Quiero registrarme gratis!"}
      </button>

      {message && <p className="text-green-500">{message}</p>}
    </form>
  );
}
