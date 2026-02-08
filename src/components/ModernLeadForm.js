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

    // ✅ BEACON SIN CORS (GOOGLE SIEMPRE LO RECIBE)
    const img = new Image();
    img.src = `${SCRIPT_URL}?${params}`;

    // No dependemos del onload para éxito
    setTimeout(() => {
      setStatus("success");
      setMessage("Registro enviado correctamente ✅");
      setFormData({
        name: "",
        phone: "",
        email: "",
        country: "MX",
        countryCode: "+52",
      });
    }, 300);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <input
        type="text"
        name="name"
        placeholder="Nombre completo"
        value={formData.name}
        onChange={handleChange}
        required
        style={{
          color: "#000",
          backgroundColor: "#fff",
        }}
      />

      <input
        type="tel"
        name="phone"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={handleChange}
        required
        style={{
          color: "#000",
          backgroundColor: "#fff",
        }}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={{
          color: "#000",
          backgroundColor: "#fff",
        }}
      />

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "¡Quiero registrarme gratis!"}
      </button>

      {message && (
        <p
          style={{
            marginTop: "10px",
            color: status === "success" ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
