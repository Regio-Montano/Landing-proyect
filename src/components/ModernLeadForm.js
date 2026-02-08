/* global intlTelInput, intlTelInputUtils */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, CheckCircle2, AlertTriangle, Loader } from 'lucide-react';

// ✅ URL REAL DE GOOGLE APPS SCRIPT
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx5ccqNhCiwqs1kbgT7Xedl-uo0OZL4ekgpfLvQ6QR9EG3nxDXqTydVtlUFYiW-YFq6ig/exec;

export default function ModernLeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: 'Mexico',
    countryCode: '+52',
    hp: '' // honeypot
  });

  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error
  const [formMessage, setFormMessage] = useState('');

  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);

  // 🔹 Inicializar intl-tel-input (FORMA CORRECTA)
  useEffect(() => {
    if (phoneInputRef.current && window.intlTelInput) {
      itiRef.current = window.intlTelInput(phoneInputRef.current, {
        initialCountry: 'mx',
        separateDialCode: true,
        preferredCountries: [
          'mx','co','ar','cl','pe','ec','ve','uy','py','bo',
          'pa','cr','sv','gt','hn','ni','do','cu','bz','pr'
        ],
        utilsScript:
          'https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js',
      });
    }

    return () => {
      itiRef.current?.destroy();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛑 Honeypot
    if (formData.hp.trim()) return;

    const iti = itiRef.current;
    if (!iti) {
      setFormStatus('error');
      setFormMessage('Error interno del teléfono.');
      return;
    }

    // ✅ NÚMERO REAL EN FORMATO INTERNACIONAL
    const fullPhone = iti.getNumber(intlTelInputUtils.numberFormat.E164);

    if (!fullPhone) {
      setFormStatus('error');
      setFormMessage('❌ Ingresa un teléfono válido.');
      return;
    }

    setFormStatus('submitting');
    setFormMessage('Enviando…');

    try {
      const countryData = iti.getSelectedCountryData();

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: fullPhone,              // 👈 +525537207627
        country: countryData.name,
        countryCode: `+${countryData.dialCode}`,
      };

      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      const data = JSON.parse(text);

      if (res.ok && data.success) {
        setFormStatus('success');
        setFormMessage('✅ ¡Registro exitoso!');

        setFormData({
          name: '',
          email: '',
          country: 'Mexico',
          countryCode: '+52',
          hp: ''
        });

        iti.setNumber('');
        iti.setCountry('mx');
      } else {
        throw new Error(data.error || 'Error al guardar');
      }

    } catch (err) {
      console.error(err);
      setFormStatus('error');
      setFormMessage('❌ No se pudo enviar el formulario.');
    }
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-xl border rounded-3xl p-8 shadow-xl max-w-md mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold text-center mb-4">
        ¡Regístrate ahora!
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Honeypot */}
        <input
          type="text"
          name="hp"
          value={formData.hp}
          onChange={handleChange}
          className="hidden"
          tabIndex="-1"
        />

        {/* Nombre */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
            className="w-full pl-12 py-3 rounded-xl border text-black bg-white"
          />
        </div>

        {/* Teléfono (NO CONTROLADO POR REACT) */}
        <input
          type="tel"
          ref={phoneInputRef}
          placeholder="Teléfono"
          className="w-full py-3 px-4 rounded-xl border text-black bg-white"
        />

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Tu email"
            required
            className="w-full pl-12 py-3 rounded-xl border text-black bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={formStatus === 'submitting'}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold"
        >
          {formStatus === 'submitting'
            ? <Loader className="animate-spin mx-auto" />
            : '¡Quiero registrarme gratis!'
          }
        </button>

        {formMessage && (
          <div
            className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
              formStatus === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {formStatus === 'success'
              ? <CheckCircle2 size={18} />
              : <AlertTriangle size={18} />
            }
            {formMessage}
          </div>
        )}
      </form>
    </motion.div>
  );
}
