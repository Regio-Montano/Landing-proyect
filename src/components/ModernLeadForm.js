import { useState } from "react";

export default function ModernLeadForm({ lang = "es" }) {

  const text = {
    es: {
      name: "Tu nombre",
      phone: "Tu teléfono",
      email: "Tu email",
      button: "Quiero registrarme gratis",
      sending: "Enviando...",
      success: "Registro enviado correctamente ✔",
      error: "Error al enviar. Intenta otra vez.",
      country: "Mexico"
    },
    pt: {
      name: "Seu nome",
      phone: "Seu telefone",
      email: "Seu email",
      button: "Quero me registrar grátis",
      sending: "Enviando...",
      success: "Registro enviado com sucesso ✔",
      error: "Erro ao enviar. Tente novamente.",
      country: "Brazil"
    }
  };

  const t = text[lang] || text.es;

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

  const getLada = (phone) => {
    if (!phone) return "";
    return phone.substring(0, 3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {

      const payload = {
        ...formData,
        campaign: "TRADING",
        country: t.country, // ← viene del idioma detectado por IP
        lada: getLada(formData.phone),
        lang: lang
      };

      const res = await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error();

      // META PIXEL
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: "Trading Lead",
          country: payload.country
        });
      }

      setStatus("success");
      setMessage(t.success);
      setFormData({ name: "", phone: "", email: "" });

    } catch {
      setStatus("error");
      setMessage(t.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>

      <input
        name="name"
        placeholder={t.name}
        value={formData.name}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        name="phone"
        placeholder={t.phone}
        value={formData.phone}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        name="email"
        placeholder={t.email}
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <button type="submit" disabled={status === "loading"} style={buttonStyle}>
        {status === "loading" ? t.sending : t.button}
      </button>

      {message && (
        <p style={{
          textAlign: "center",
          fontSize: "14px",
          color: status === "success" ? "green" : "red"
        }}>
          {message}
        </p>
      )}
    </form>
  );
}

const formStyle = {
  maxWidth: "420px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  background: "rgba(255,255,255,0.9)",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd"
};

const buttonStyle = {
  padding: "12px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold"
};
