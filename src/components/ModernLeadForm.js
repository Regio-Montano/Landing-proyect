import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

const API_BASE = "https://lead-verification.sy447014.workers.dev";

const ModernLeadForm = () => {

  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [country, setCountry] = useState('MX');

  const [step, setStep] = useState("form");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("/api/geo");
        const data = await res.json();
        setCountry(data.country || 'MX');
      } catch {
        setCountry('MX');
      }
    };
    detectCountry();
  }, []);

  const countryCodes = {
    US: "+1", CA: "+1",
    MX: "+52", BR: "+55", AR: "+54", CO: "+57",
    ES: "+34", PT: "+351",
    DEFAULT: "+1"
  };

  const phonePlaceholders = {
    MX: "55 1234 5678",
    US: "201 555 0123",
    ES: "612 34 56 78",
    PT: "912 345 678",
    DEFAULT: "123456789"
  };

  const getPrefix = () => countryCodes[country] || countryCodes.DEFAULT;

  const formatPhone = () => {
    const prefix = getPrefix();
    const clean = formData.phone.replace(/\D/g, "");
    return `${prefix}${clean}`;
  };

  const handlePhoneChange = (e) => {
    const clean = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, phone: clean });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 SEND OTP
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone: formatPhone()
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error enviando OTP");
      }

      setStep("otp");
      setStatus("success");
      setMessage("Ingresa el código 📲");

    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("❌ Error enviando OTP");
    }
  };

  // 🔐 VERIFY + SAVE
  const verifyOTP = async () => {
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone: formatPhone(),
          code: otp
        })
      });

      const data = await res.json();

      if (!data.success) throw new Error("Código incorrecto");

      const saveRes = await fetch(`${API_BASE}/save-lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formatPhone(),
          country: country
        })
      });

      const saveData = await saveRes.json();

      if (!saveData.success) {
        console.log(saveData);
        throw new Error("Error en Notion");
      }

      setStatus("success");
      setMessage("✅ Registro completado");

    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <motion.div className="bg-white p-6 rounded-xl max-w-md mx-auto">

      <div className="text-xs text-gray-400 mb-2">
        STEP: {step}
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">
        Regístrate
      </h2>

      {message && (
        <div className={`text-center mb-4 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
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
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="correo@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          {/* 🔥 TELÉFONO PRO */}
          <div className="flex">

            <div className="bg-gray-100 px-3 flex items-center border border-r-0 rounded-l font-semibold">
              {getPrefix()}
            </div>

            <input
              type="tel"
              placeholder={phonePlaceholders[country] || phonePlaceholders.DEFAULT}
              value={formData.phone}
              onChange={handlePhoneChange}
              className="w-full p-3 border rounded-r"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded"
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
            className="w-full p-3 border rounded text-center text-lg"
          />

          <button
            onClick={verifyOTP}
            className="w-full bg-green-600 text-white py-3 rounded"
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
