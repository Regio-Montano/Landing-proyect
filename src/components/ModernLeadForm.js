import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, CheckCircle2, AlertTriangle, Loader } from 'lucide-react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwSLODjz0EUYoxTgWaY-uTN2_dIlFZ_UAZ8Zo_SOiV1iY6qpOh7TkMvVKKMeAI5rYqJRQ/exec;

export default function ModernLeadForm() {
  const [formStatus, setFormStatus] = useState('idle');
  const [formMessage, setFormMessage] = useState('');
  const phoneRef = useRef(null);
  const itiRef = useRef(null);

  useEffect(() => {
    if (phoneRef.current && window.intlTelInput) {
      itiRef.current = window.intlTelInput(phoneRef.current, {
        initialCountry: 'mx',
        separateDialCode: true,
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormMessage('');

    const iti = itiRef.current;
    if (!iti || !iti.isValidNumber()) {
      setFormStatus('error');
      setFormMessage('❌ Ingresa un teléfono válido');
      return;
    }

    const formData = new URLSearchParams({
      name: e.target.name.value,
      phone: iti.getNumber(),
      email: e.target.email.value,
      country: iti.getSelectedCountryData().name,
      countryCode: `+${iti.getSelectedCountryData().dialCode}`
    });

    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setFormStatus('success');
        setFormMessage('✅ Registro exitoso. Te contactaremos.');
        e.target.reset();
        iti.setNumber('');
      } else {
        throw new Error(data.error);
      }

    } catch (err) {
      console.error(err);
      setFormStatus('error');
      setFormMessage('❌ No se pudo enviar el formulario');
    }
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl max-w-md mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold text-center mb-6">¡Regístrate ahora!</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="name"
            required
            placeholder="Tu nombre"
            className="w-full pl-12 py-3 rounded-xl border"
          />
        </div>

        <input
          ref={phoneRef}
          type="tel"
          placeholder="Teléfono"
          className="w-full py-3 px-4 rounded-xl border"
        />

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="email"
            type="email"
            required
            placeholder="Tu email"
            className="w-full pl-12 py-3 rounded-xl border"
          />
        </div>

        <button
          type="submit"
          disabled={formStatus === 'submitting'}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold"
        >
          {formStatus === 'submitting'
            ? <Loader className="animate-spin mx-auto" />
            : '¡Quiero registrarme gratis!'}
        </button>

        {formMessage && (
          <div className={`p-3 rounded-lg text-sm flex gap-2 items-center ${
            formStatus === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
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
