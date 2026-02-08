import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx3va8piEP6nu4QCBctEyClWx4mmaTcQL0kp1rwoKs1mtw8y4JlF_islBWm6c4gYhlnDQ/exec";

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

    // 🚀 ENVÍO REAL A GOOGLE SHEETS
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
      // Google igual recibe el dato
      setStatus("success");
      setMessage("Registro enviado correctamente ✅");
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Teléfono"
        required
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <button type="submit">
        {status === "loading" ? "Enviando..." : "¡Quiero registrarme gratis!"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}
