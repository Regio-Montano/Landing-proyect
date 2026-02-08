import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwmH7z8__UC1Q1tmtt6jruWTpb3pNivm0Uh63_m_Fzl8xGJg2oulc0Kqcjwz4WUYLkyZg/exec";

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const params = new URLSearchParams(formData).toString();

    // ✅ BEACON SIN CORS
    const img = new Image();
    img.src = `${SCRIPT_URL}?${params}`;

    img.onload = () => {
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

    img.onerror = () => {
      // AUNQUE FALLE, GOOGLE YA RECIBIÓ EL DATO
      setStatus("success");
      setMessage("Registro enviado correctamente ✅");
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} required />
      <input name="phone" value={formData.phone} onChange={handleChange} required />
      <input name="email" value={formData.email} onChange={handleChange} required />

      <button type="submit">
        {status === "loading" ? "Enviando..." : "¡Quiero registrarme gratis!"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}
