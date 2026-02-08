import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwyCfeXjplz7f_A1-4yp44OZJ4NFkeMpmEKHv6Q_79ieLpUHfW5XGHZLGwmPs07fc1ZPA/exec";

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

    // ✅ BEACON GET (sin CORS)
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
      setStatus("error");
      setMessage("Error enviando el registro");
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
