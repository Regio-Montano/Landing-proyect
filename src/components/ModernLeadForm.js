import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, CheckCircle2, AlertTriangle, Loader } from 'lucide-react';

// 🔴 URL DE TU GOOGLE APPS SCRIPT (NO CAMBIAR)
const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyK-9kmog8xWztqKfVec_RMSTIMw85S57av8OBJ7bobAZ3vwdI7jfkLCU3C--5-LUwhmQ/exec';

export default function ModernLeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: 'Mexico',
    countryCode: '+52',
    hp: '', // honeypot
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
        separateDialCode: true,
        preferredCountries: [
          'mx','co','ar','cl','pe','ec','ve','uy','py','bo',
          'pa','cr','sv','gt','hn','ni','do','cu','bz','pr',
        ],
      });

      const updatePhoneData = () => {
        const iti = itiRef.current;
        if (!iti) return;

        const number = iti.getNumber();
        const countryData = iti.getSelectedCountryData();

        setFormData(prev => ({
          ...prev,
          phone: number,
          country: countryData.name,
          countryCode: `+${countryData.dialCode}`,
        }));
      };

      phoneInputRef.current.addEventListener('change', updatePhoneData);
      phoneInputRef.current.addEventListener('countrychange', updatePhoneData);

      return () => {
        phoneInputRef.current?.removeEventListener('change', updatePhoneData);
        phoneInputRef.current?.removeEventListener('countrychange', updatePhoneData);
        itiRef.current?.destroy();
      };
    }
  }, []);

  // 🔹 Inputs normales
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 🚀 SUBMIT — SIN JSON, SIN HEADERS (CORS FIX)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛑 Honeypot anti-bots
    if (formData.hp.trim()) return;

    const iti = itiRef.current;
    if (!iti || !iti.isValidNumber()) {
      setFormStatus('error');
      setFormMessage('❌ Ingresa un teléfono válido.');
      return;
    }

    setFormStatus('submitting');
    setFormMessage('Enviando…');

    try {
      // 🔥 FORMA CORRECTA PARA GOOGLE APPS SCRIPT
      const params = new URLSearchParams({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        country: formData.country,
        countryCode: formData.countryCode,
      });

      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: params,
      });

      const data = await res.json();

      if (data.success) {
        setFormStatus('success');
        setFormMessage('✅ ¡Registro exitoso! Pronto te contactaremos.');

        setFormData({
          name: '',
          phone: '',
          email: '',
          country: 'Mexico',
          countryCode: '+52',
          hp: '',
        });

        iti.setNumber('');
        iti.setCountry('mx');
      } else {
        throw new Error(data.error || 'Error desconocido');
      }

    } catch (err) {
      console.error('Submit error:', err);
      setFormStatus('error');
      setFormMessage('❌ No se pudo enviar el formulario.');
    }
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-xl max-w-md mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold text-center mb-6">
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
          autoComplete="off"
        />

        {/* Nombre */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full pl-12 py-3 rounded-xl border"
            disabled={formStatus === 'submitting'}
          />
        </div>

        {/* Teléfono */}
        <input
          type="tel"
          ref={phoneInputRef}
          placeholder="Teléfono"
          className="w-full py-3 px-4 rounded-xl border"
          disabled={formStatus === 'submitting'}
        />

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Tu email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full pl-12 py-3 rounded-xl border"
            disabled={formStatus === 'submitting'}
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={formStatus === 'submitting'}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center gap-2"
        >
          {formStatus === 'submitting'
            ? <Loader className="animate-spin" />
            : '¡Quiero registrarme gratis!'}
        </button>

        {/* Mensaje */}
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
              : <AlertTriangle size={18} />}
            {formMessage}
          </div>
        )}
      </form>
    </motion.div>
  );
}
