import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Phone, CheckCircle2, AlertTriangle, Loader } from 'lucide-react';

const GoogleScriptForm = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', _hp: '' }); // '_hp' para honeypot
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [formMessage, setFormMessage] = useState('');

  // ¡Aquí está tu URL de Google Apps Script!
  const scriptURL = "https://script.google.com/macros/s/AKfycbw6oaBNu2mWaky1ZB-Sxy7JNyW2vq1Prp_5zizPlCSXpfDuW_bkoBHq9Cs_5_U1Hx0Caw/exec";

  const onChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: si el campo '_hp' tiene valor, es un bot.
    if (formData._hp.trim() !== "") {
      console.log("Bot detectado (honeypot). No se envía el formulario.");
      setFormStatus('idle'); // No cambiar el estado visible
      setFormMessage(''); // No mostrar mensaje de error al usuario
      return;
    }

    // Validaciones básicas
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setFormMessage("Por favor completa todos los campos.");
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');
    setFormMessage(''); // Limpiar mensajes previos

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim()
    };

    try {
      const res = await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data?.result === "success") {
        setFormMessage("✅ ¡Registro exitoso! Pronto nos pondremos en contacto.");
        setFormStatus('success');
        setFormData({ name: '', phone: '', email: '', _hp: '' }); // Limpiar campos
      } else {
        throw new Error(data?.message || "Falló el guardado.");
      }
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      setFormMessage("❌ Hubo un error al enviar. Intenta de nuevo.");
      setFormStatus('error');
    }
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-xl max-w-md mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
        ¡Regístrate ahora!
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Accede al entrenamiento de trading y contenidos exclusivos.
      </p>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Honeypot (anti-bots): mantener oculto */}
        <input 
          type="text" 
          name="_hp" 
          id="_hp" 
          autoComplete="off" 
          tabIndex="-1" 
          value={formData._hp}
          onChange={onChange}
          style={{ position: 'absolute', left: '-9999px', opacity: 0 }} 
        />

        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Tu Nombre"
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900"
            required
            disabled={formStatus === 'submitting'}
          />
        </motion.div>

        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="Tu Teléfono"
            pattern="[0-9+\s()-]{7,}" 
            title="Sólo números, +, espacios, () y -"
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900"
            required
            disabled={formStatus === 'submitting'}
          />
        </motion.div>

        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Tu Correo Electrónico"
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900"
            required
            disabled={formStatus === 'submitting'}
          />
        </motion.div>

        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input 
            type="checkbox" 
            id="consent" 
            required 
            className="mt-1"
            disabled={formStatus === 'submitting'}
          />
          Acepto ser contactado y recibir información del curso.
        </label>

        <motion.button
          type="submit"
          id="submitBtn"
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          disabled={formStatus === 'submitting'}
        >
          {formStatus === 'submitting' ? (
            <>
              <Loader className="animate-spin w-5 h-5" /> Enviando...
            </>
          ) : (
            '¡Quiero registrarme gratis!'
          )}
        </motion.button>

        {formMessage && (
          <motion.div
            id="msg"
            role="alert"
            className={`text-sm mt-2 ${
              formStatus === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {formMessage}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default GoogleScriptForm;