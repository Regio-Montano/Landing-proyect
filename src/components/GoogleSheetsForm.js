import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Phone, CheckCircle2, AlertTriangle, Loader } from 'lucide-react';

const GoogleSheetsForm = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', hp: '' }); // 'hp' para honeypot
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [formMessage, setFormMessage] = useState('');

  // Tu URL de Google Apps Script
  const scriptURL = "https://script.google.com/macros/s/AKfycbw6oaBNu2mWaky1ZB-Sxy7JNyW2vq1Prp_5zizPlCSXpfDuW_bkoBHq9Cs_5_U1Hx0Caw/exec";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check: si el campo 'hp' tiene valor, es un bot.
    if (formData.hp.trim() !== "") {
      console.log("Bot detectado (honeypot). Formulario no enviado.");
      setFormStatus('idle'); // No cambiar el estado visible al usuario
      setFormMessage(''); // No mostrar mensaje de error al usuario
      return;
    }

    // Validación básica de campos vacíos
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setFormMessage("Por favor, completa todos los campos.");
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');
    setFormMessage('Enviando...'); // Mensaje de "Enviando..."
    
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
        setFormMessage("✅ Registro exitoso");
        setFormStatus('success');
        setFormData({ name: '', phone: '', email: '', hp: '' }); // Limpiar campos
      } else {
        throw new Error(data?.message || "Falló el guardado en el servidor.");
      }
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      setFormMessage("❌ Error al registrar");
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot (anti-bots): mantener oculto */}
        <input 
          type="text" 
          name="hp" 
          id="hp" 
          autoComplete="off" 
          tabIndex="-1" 
          value={formData.hp}
          onChange={handleChange}
          style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }} 
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
            onChange={handleChange}
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
            onChange={handleChange}
            placeholder="Tu Teléfono"
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
            onChange={handleChange}
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
            className={`text-sm mt-2 p-3 rounded-lg flex items-center gap-2 ${
              formStatus === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : formStatus === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-yellow-50 text-yellow-700 border border-yellow-200' // Para 'submitting'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {formStatus === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            {formMessage}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default GoogleSheetsForm;