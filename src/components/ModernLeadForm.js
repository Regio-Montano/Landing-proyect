import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const API_BASE = "https://lead-verification.sy447014.workers.dev";

const ModernLeadForm = () => {

  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [country, setCountry] = useState('mx');

  const [step, setStep] = useState("form");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("/api/geo");
        const data = await res.json();
        const detected = (data?.country || 'MX').toLowerCase();
        setCountry(detected);
      } catch {
        setCountry('mx');
      }
    };
    detectCountry();
  }, []);

  const formatPhone = () => {
    return `+${formData.phone}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 DISPARO DIRECTO + DEBUG REAL
  const firePixelLead = () => {
    console.log("🚀 INTENTANDO DISPARAR LEAD");

    try {
      if (typeof window !== "undefined" && typeof window.fbq === "function") {

        window.fbq('track', 'Lead', {
          content_name: 'registro_completado',
          value: 1,
          currency: 'USD'
        });

        console.log("✅ fbq track ejecutado");

      } else {
        console.warn("❌ fbq NO está disponible");
      }

    } catch (err) {
      console.error("💥 ERROR PIXEL:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length < 7) {
      setMessage("Número inválido");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formatPhone() })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error enviando OTP");
      }

      setStep("otp");
      setMessage("Ingresa el código 📲");
      setStatus("success");

    } catch (err) {
      setStatus("error");
      setMessage("❌ Error enviando OTP");
    }
  };

  const verifyOTP = async () => {
    setStatus("loading");
    setMessage("");

    try {
      // 1. Verificar OTP
      const res = await fetch(`${API_BASE}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formatPhone(),
          code: otp
        })
      });

      const data = await res.json();
      if (!data.success) throw new Error("Código incorrecto");

      // 2. Guardar lead
      const saveRes = await fetch(`${API_BASE}/save-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formatPhone(),
          country
        })
      });

      const saveData = await saveRes.json();
      if (!saveData.success) throw new Error("Error en registro");

      // 🔥 3. DISPARO INMEDIATO (SIN RETRY)
      firePixelLead();

      setStatus("success");
      setMessage("✅ Registro completado");

    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <motion.div
      style={{
        opacity: 1,
        backgroundColor: "#ffffff",
        color: "#111827"
      }}
      className="p-8 rounded-2xl max-w-md mx-auto shadow-xl border"
    >

      <div className="text-xs mb-2 text-center font-medium">
        STEP: {step}
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">
        Regístrate 🚀
      </h2>

      {message && (
        <div className={`text-center mb-4 font-medium ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}

      {step === "form" ? (
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="correo@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <PhoneInput
            country={country}
            enableSearch={true}
            value={formData.phone}
            onChange={(value) =>
              setFormData({ ...formData, phone: value })
            }
            inputStyle={{
              width: '100%',
              height: '48px',
              borderRadius: '8px',
              border: '1px solid #d1d5db'
            }}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
          >
            {status === 'loading'
              ? <Loader className="animate-spin mx-auto" />
              : "Enviar"}
          </button>

        </form>
      ) : (
        <div className="space-y-4">

          <input
            type="text"
            placeholder="Código OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 border rounded-lg text-center text-lg"
          />

          <button
            onClick={verifyOTP}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
          >
            {status === 'loading'
              ? <Loader className="animate-spin mx-auto" />
              : "Verificar código"}
          </button>

        </div>
      )}

    </motion.div>
  );
};

export default ModernLeadForm;
