import { useState } from "react";

export default function ModernLeadForm() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("loading");
    setMessage("");

    try {

      const res = await fetch("https://api-shield.sy447014.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer UltraShield_2026_SECURE_KEY_9472"
        },
        body: JSON.stringify(formData)
      });

      const text = await res.text();

      if (!res.ok) throw new Error(text);

      setStatus("success");
      setMessage("Registro enviado correctamente ✔");

      setFormData({
        name: "",
        phone: "",
        email: ""
      });

    } catch (err) {
      setStatus("error");
      setMessage("Error al enviar. Intenta otra vez.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "420px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        background: "rgba(255,255,255,0.9)",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        backdropFilter: "blur(6px)"
      }}
    >

      <input
        name="name"
        placeholder="Tu nombre"
        value={formData.name}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        name="phone"
        placeholder="Tu teléfono"
        value={formData.phone}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        name="email"
        placeholder="Tu email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          padding: "12px",
          background: "#22c55e",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "15px"
        }}
      >
        {status === "loading" ? "Enviando..." : "Quiero registrarme gratis"}
      </button>

      {message && (
        <p style={{
          textAlign: "center",
          fontSize: "14px",
          color: status === "success" ? "green" : "red",
          margin: 0
        }}>
          {message}
        </p>
      )}

    </form>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
  outline: "none"
};
