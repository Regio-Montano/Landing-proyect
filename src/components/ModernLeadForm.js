import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Phone, Loader } from 'lucide-react';

const ModernLeadForm = ({ lang }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [country, setCountry] = useState('MX');

  const [step, setStep] = useState("form"); // 🔥 clave
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

      setStep("otp"); // 🔥 aquí cambias de pantalla
      setStatus("success");
      setMessage("Ingresa el código que te enviamos 📲");

    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  // 🔐 VALIDAR OTP
  const verifyOTP = async () => {
    setStatus("loading");

    try {
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

      setStatus("success");
      setMessage("✅ Número verificado correctamente");

    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-xl max-w-md mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
        ¡Regístrate Ahora!
      </h2>

      {message && (
        <div className={`text-center mb-4 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}

      {step === "form" ? (
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Tu Nombre"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 py-3 border rounded-md"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Tu Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 py-3 border rounded-md"
              required
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="+52 5551234567"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 py-3 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? <Loader className="animate-spin mx-auto" /> : "Enviar"}
          </button>

        </form>
      ) : (
        <div className="space-y-6">

          <input
            type="text"
            placeholder="Código de verificación"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border rounded-md text-center text-lg"
          />

          <button
            onClick={verifyOTP}
            className="w-full bg-green-600 text-white py-3 rounded-md"
          >
            Verificar código
          </button>

        </div>
      )}
    </motion.div>
  );
};

export default ModernLeadForm;
