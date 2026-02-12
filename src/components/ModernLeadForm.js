import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzYk81ugcdYTgV1oAtWCEYinOJgkI-7nGep3TLtuxS5kls0sfKi-vxpVXcNCzKQULRv/exec"; // 👈 ESTE ES CRÍTICO

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

    // 🚀 ENVÍO REAL SIN CORS
    const img = new Image();
    img.src = `${SCRIPT_URL}?${params}&t=${Date.now()}`;

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
      // Google igual recibe aunque no cargue imagen
      setStatus("success");
      setMessage("Registro enviado correctamente ✅");
    };
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Tu nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Tu teléfono"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        placeholder="Tu email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {status === "loading" ? "Enviando..." : "¡Quiero registrarme gratis!"}
      </button>

      {message && <p className="text-green-600">{message}</p>}
    </form>
  );
}
