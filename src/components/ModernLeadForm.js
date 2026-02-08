import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, CheckCircle2, AlertTriangle, Loader } from 'lucide-react';

// ✅ URL DIRECTA A GOOGLE APPS SCRIPT (CORRECTA)
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyK-9kmog8xWztqKfVec_RMSTIMw85S57av8OBJ7bobAZ3vwdI7jfkLCU3C--5-LUwhmQ/exec';

export default function ModernLeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: 'Mexico',
    countryCode: '+52',
    hp: '' // honeypot
  });

  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error
  const [formMessage, setFormMessage] = useState('');

  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);

  // 🔹 Inicializar intl-tel-input
  useEffect(() => {
    if (phoneInputRef.current && window.intlTelInput) {
      itiRef.current = window.intlTelInput(phoneInputRef.current, {
        initialCountry: 'mx',
        preferredCountries: [
          'mx','co','ar','cl','pe','ec','ve','uy','py','bo',
          'pa','cr','sv','gt','hn','ni','do','cu','bz','pr'
        ],
        separateDialCode: true,
      });

      const handlePhoneUpdate = () => {
        const iti = itiRef.current;
        if (!iti) return;

        const fullNumber = iti.getNumber();
        const countryData = iti.getSelectedCountryData();

        setFormData(prev => ({
          ...prev,
          phone: fullNumber,
          countryCode: `+${countryData.dialCode}`,
          country: countryData.name,
        }));
      };

      phoneInputRef.current.addEventListener('change', handlePhoneUpdate);
      phoneInputRef.current.addEventListener('countrychange', handlePhoneUpdate);

      return () => {
        phoneInputRef.current.removeEventListener('change', handlePhoneUpdate);
        phoneInputRef.current.removeEventListener('countrychange', handlePhoneUpdate);
        itiRef.current?.destroy();
      };
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛑 Honeypot anti-bots
    if (formData.hp?.trim()) return;

    setFormStatus('submitting');
    setFormMessage('Enviando…');

    try {
      const iti = itiRef.current;

      if (!iti || !iti.isValidNumber()) {
        setFormStatus('error');
        setFormMessage('❌ Ingresa un teléfono válido.');
        return;
      }

      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        country: formData.country,
        countryCode: formData.countryCode,
      };

      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // ✅ GOOGLE SCRIPT RESPONDE TEXTO → PARSE SEGURO
      const text = await res.text();
      const data = JSON.parse(text);

      if (res.ok && data.success) {
        setFormStatus('success');
        setFormMessage('✅ ¡Registro exitoso! Pronto te contactaremos.');

        setFormData({
          name: '',
          phone: '',
          email: '',
          country: 'Mexico',
          countryCode: '+52',
          hp: ''
        });

        iti.setNumber('');
        iti.setCountry('mx');
      } else {
        throw new Error(data.error || 'Error al guardar los datos');
      }

    } catch (err) {
      console.error('Error en submit:', err);
      setFormStatus('error');
      setFormMessage('❌ No se pudo enviar el formulario. Intenta de nuevo.');
    }
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-xl max-w-md mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold text-center mb-4">¡Regístrate ahora!</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Honeypot */}
        <input
          type="text"
          name="hp"
          value={formData.hp}
          onChange={handleChange}
          className="hidden"
          tabIndex="-1"
          autoComplete="off"
        />

        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
            className="w-full pl-12 py-3 rounded-xl border"
            disabled={formStatus === 'submitting'}
          />
        </div>

        <input
          type="tel"
          ref={phoneInputRef}
          placeholder="Teléfono"
          className="w-full py-3 px-4 rounded-xl border"
          disabled={formStatus === 'submitting'}
        />

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Tu email"
            required
            className="w-full pl-12 py-3 rounded-xl border"
            disabled={formStatus === 'submitting'}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold"
          disabled={formStatus === 'submitting'}
        >
          {formStatus === 'submitting' ? <Loader className="animate-spin" /> : '¡Quiero registrarme gratis!'}
        </button>

        {formMessage && (
          <div className={`p-3 rounded-lg text-sm ${
            formStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {formStatus === 'success' ? <CheckCircle2 /> : <AlertTriangle />} {formMessage}
          </div>
        )}
      </form>
    </motion.div>
  );
}
