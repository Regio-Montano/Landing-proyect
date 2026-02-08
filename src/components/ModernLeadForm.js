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

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setMessage("¡Registro enviado correctamente!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          country: "MX",
          countryCode: "+52",
        });
      } else {
        throw new Error(result.error || "Error desconocido");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("No se pudo enviar el formulario");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-3 rounded"
      />

      <input
        name="phone"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-3 rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-3 rounded"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 rounded bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold"
      >
        {status === "loading" ? "Enviando..." : "¡Quiero registrarme gratis!"}
      </button>

      {status === "success" && (
        <div className="p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      {status === "error" && (
        <div className="p-3 bg-red-100 text-red-700 rounded">
          {message}
        </div>
      )}
    </form>
  );
}
