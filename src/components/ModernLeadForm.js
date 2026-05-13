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

  // 🔥 PIXEL ROBUSTO (CON RETRY REAL)
  const firePixelLead = () => {
    console.log("🚀 INTENTANDO DISPARAR LEAD");

    const tryFire = () => {
      if (typeof window !== "undefined" && typeof window.fbq === "function") {

        window.fbq('track', 'Lead', {
          content_name: 'registro_completado',
          value: 1,
          currency: 'USD'
        });

        console.log("✅ fbq track ejecutado");

      } else {
        console.warn("⏳ fbq no listo, reintentando...");
        setTimeout(tryFire, 500);
      }
    };

    tryFire();
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

      // 🔥 3. DISPARO CORRECTO (TIMING + RETRY)
      setTimeout(() => {
        firePixelLead();
      }, 300);

      setStatus("success");
      setMessage("✅ Registro completado");

    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: '#111111',
    color: '#ffffff',
    border: '1px solid #0066FF',
    borderRadius: '10px',
    outline: 'none',
    fontSize: '0.95rem',
  };

  return (
    <motion.div
      style={{
        opacity: 1,
        backgroundColor: '#000000',
        color: '#ffffff',
        border: '1px solid #0066FF',
        borderRadius: '20px',
        padding: '32px',
        maxWidth: '448px',
        margin: '0 auto',
        boxShadow: '0 0 30px rgba(0,102,255,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >

      <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginBottom: '6px', letterSpacing: '0.1em' }}>
        STEP: {step}
      </div>

      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, textAlign: 'center', marginBottom: '24px', color: '#ffffff', letterSpacing: '-0.01em' }}>
        Regístrate 🚀
      </h2>

      {message && (
        <div style={{
          textAlign: 'center', marginBottom: '16px', fontWeight: 600, fontSize: '0.9rem',
          color: status === 'success' ? '#4ade80' : '#f87171',
        }}>
          {message}
        </div>
      )}

      {step === "form" ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="correo@email.com"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
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
              backgroundColor: '#111111',
              color: '#ffffff',
              border: '1px solid #0066FF',
              borderRadius: '10px',
              paddingLeft: '52px',
              fontSize: '0.95rem',
            }}
            buttonStyle={{
              backgroundColor: '#111111',
              border: '1px solid #0066FF',
              borderRight: 'none',
              borderRadius: '10px 0 0 10px',
            }}
            containerStyle={{ width: '100%' }}
            dropdownStyle={{ backgroundColor: '#111111', color: '#ffffff', border: '1px solid #0066FF' }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #0066FF 0%, #3399FF 50%, #D4AF37 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              letterSpacing: '0.02em',
              boxShadow: '0 0 20px rgba(0,102,255,0.35)',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {status === 'loading'
              ? <Loader className="animate-spin mx-auto" />
              : "Enviar"}
          </button>

        </form>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          <input
            type="text"
            placeholder="Código OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ ...inputStyle, textAlign: 'center', fontSize: '1.2rem', letterSpacing: '0.2em' }}
          />

          <button
            onClick={verifyOTP}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #0066FF 0%, #3399FF 50%, #D4AF37 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              letterSpacing: '0.02em',
              boxShadow: '0 0 20px rgba(0,102,255,0.35)',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
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
