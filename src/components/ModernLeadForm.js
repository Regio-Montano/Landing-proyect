import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

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
    MX: "+52", BR: "+55", AR: "+54", CO: "+57",
    CL: "+56", PE: "+51", VE: "+58", EC: "+593",
    BO: "+591", PY: "+595", UY: "+598"
  };

  const formatPhone = (phone) => {
    const prefix = countryCodes[country] || "+52";
    const clean = phone.replace(/\D/g, "");

    if (clean.startsWith(prefix.replace("+", ""))) {
      return `+${clean}`;
    }

    return `${prefix}${clean}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 ENVIAR OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formatPhone(formData.phone)
      };

      const res = await fetch("https://lead-verification.sy447014.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error enviando OTP");
      }

      setStep("otp");
      setStatus("success");
      setMessage("Ingresa el código que te enviamos 📲");

    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  // 🔐 VALIDAR OTP + GUARDAR LEAD
  const verifyOTP = async () => {
    setStatus("loading");
    setMessage("");

    try {
      // 1️⃣ Verificar OTP
      const res = await fetch("https://lead-verification.sy447014.workers.dev/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone: formatPhone(formData.phone),
          code: otp
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Código incorrecto");
      }

      // 2️⃣ GUARDAR EN GOOGLE SHEETS 🔥
      const sheetRes = await fetch(
        "https://script.google.com/macros/s/AKfycbyNCsN5M9MZYNi2rEzc1L4D1nFnWySbGcFf1pmeYpIKxMruxuFI1mNyNta4Lz5UVxuvJw/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formatPhone(formData.phone)
          })
        }
      );

      const sheetData = await sheetRes.json();

      if (!sheetRes.ok || sheetData.result !== "success") {
        throw new Error("Error guardando lead");
      }

      // 3️⃣ SUCCESS FINAL
      setStatus("success");
      setMessage("✅ Número verificado y registro completado");

    } catch (err) {
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
        ¡Regístrate Ahora!
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
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="+52 5551234567"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded"
          >
            {status === 'loading' ? <Loader className="animate-spin mx-auto" /> : "Enviar"}
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
            {status === 'loading' ? <Loader className="animate-spin mx-auto" /> : "Verificar código"}
          </button>

        </div>
      )}
    </motion.div>
  );
};

export default ModernLeadForm;
