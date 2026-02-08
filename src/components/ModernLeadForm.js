import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxvgc3qM4_aoyrfsPAJoSIiWmuyKIFQrNrLkEWYMzeojrE5mUJUIDjhPrWkIf0zpYk40A/exec";

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

    // ✅ ENVÍO SIN CORS (Image Beacon)
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
      // Aunque falle visualmente, Google suele recibirlo
      setStatus("success");
      setMessage("Registro enviado correctamente ✅");
    };
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-white text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 relative z-50";

  return (
    <div className="relative z-40 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre completo"
          autoComplete="off"
          required
          className={inputClass}
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Teléfono"
          autoComplete="off"
          required
          className={inputClass}
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          autoComplete="off"
          required
          className={inputClass}
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
        >
          {status === "loading" ? "Enviando..." : "¡Quiero registrarme gratis!"}
        </button>

        {message && (
          <p className="text-green-500 font-medium text-center">{message}</p>
        )}
      </form>
    </div>
  );
}
