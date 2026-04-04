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

  // 🌍 TODOS LOS PAÍSES (principales + fallback global)
  const countryCodes = {
    US: "+1", CA: "+1",
    MX: "+52", BR: "+55", AR: "+54", CO: "+57",
    CL: "+56", PE: "+51", VE: "+58", EC: "+593",
    BO: "+591", PY: "+595", UY: "+598",

    ES: "+34", PT: "+351", FR: "+33", DE: "+49",
    IT: "+39", NL: "+31", BE: "+32", CH: "+41",
    AT: "+43", SE: "+46", NO: "+47", DK: "+45",
    FI: "+358", IE: "+353", PL: "+48", CZ: "+420",
    HU: "+36", RO: "+40", GR: "+30", TR: "+90",
    RU: "+7", UA: "+380",

    GB: "+44",

    AE: "+971", SA: "+966", QA: "+974", KW: "+965",
    IL: "+972", EG: "+20", MA: "+212", DZ: "+213",

    ZA: "+27",

    IN: "+91", PK: "+92", BD: "+880", LK: "+94",
    CN: "+86", JP: "+81", KR: "+82",
    SG: "+65", MY: "+60", TH: "+66",
    ID: "+62", PH: "+63", VN: "+84",

    AU: "+61", NZ: "+64",

    // 🔥 fallback global
    DEFAULT: "+1"
  };

  const formatPhone = (phone) => {
    const prefix = countryCodes[country] || countryCodes.DEFAULT;
    const clean = phone.replace(/\D/g, "");

    // Si ya tiene código internacional
    if (clean.startsWith(prefix.replace("+", ""))) {
      return `+${clean}`;
    }

    // Si ya viene con +
    if (phone.startsWith("+")) {
      return phone;
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
      const res = await fetch(`${API_BASE}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone: formatPhone(formData.phone)
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error enviando OTP");
      }

      setStep("otp");
      setStatus("success");
      setMessage("Ingresa el código que te enviamos 📲");

    } catch (err) {
      console.error("OTP ERROR:", err);
      setStatus("error");
      setMessage("Error enviando OTP");
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
          phone: formatPhone(formData.phone),
          code: otp
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Código incorrecto");
      }

      const saveRes = await fetch(`${API_BASE}/save-lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formatPhone(formData.phone),
          country: country
        })
      });

      const saveData = await saveRes.json();

      if (!saveRes.ok || !saveData.success) {
        throw new Error(saveData.error || "Error guardando lead");
      }

      setStatus("success");
      setMessage("✅ Número verificado y registro completado");

    } catch (err) {
      console.error("VERIFY ERROR:", err);
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
            placeholder="+34 / +52 / +351 ..."
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

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
