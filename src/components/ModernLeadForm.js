import { useState } from "react";

export default function ModernLeadForm() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "MX",
    countryCode: "+52"
  });

  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {

      const response = await fetch("https://api-shield.sy447014.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer UltraShield_2026_SECURE_KEY_9472"
        },
        body: JSON.stringify({
          nombre: formData.name,
          telefono: formData.countryCode + formData.phone,
          email: formData.email
        })
      });

      const result = await response.json();

      if (result.success !== false) {
        setStatus("success");
        setMessage("Registro enviado correctamente ✅");

        setFormData({
          name: "",
          phone: "",
          email: "",
          country: "MX",
          countryCode: "+52"
        });

      } else {
        throw new Error(result.error || "Error al enviar");
      }

    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Error al enviar. Intenta otra vez.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

      <input
        name="name"
        placeholder="Tu nombre"
        value={formData.name}
        onChange={handleChange}
        required
        className="p-3 rounded"
      />

      <input
        name="phone"
        placeholder="Tu teléfono"
        value={formData.phone}
        onChange={handleChange}
        required
        className="p-3 rounded"
      />

      <input
        name="email"
        type="email"
        placeholder="Tu email"
        value={formData.email}
        onChange={handleChange}
        required
        className="p-3 rounded"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-green-500 text-white p-3 rounded font-bold"
      >
        {status === "loading" ? "Enviando..." : "Quiero registrarme gratis!"}
      </button>

      {message && (
        <p className={`text-center ${
          status === "success" ? "text-green-400" : "text-red-400"
        }`}>
          {message}
        </p>
      )}

    </form>
  );
}
