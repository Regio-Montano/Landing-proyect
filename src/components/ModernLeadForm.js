import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Phone, CheckCircle2, AlertTriangle, Loader } from 'lucide-react';

const ModernLeadForm = ({ lang }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const texts = {
    es: {
      title: '¡Regístrate Ahora!',
      name: 'Tu Nombre',
      email: 'Tu Email',
      phone: 'Tu Teléfono',
      submit: 'Enviar',
      loading: 'Enviando...',
      success: '¡Registro exitoso!',
      error: 'Error al enviar'
    },
    pt: {
      title: 'Registre-se Agora!',
      name: 'Seu Nome',
      email: 'Seu Email',
      phone: 'Seu Telefone',
      submit: 'Enviar',
      loading: 'Enviando...',
      success: 'Registro bem-sucedido!',
      error: 'Erro ao enviar'
    }
  };

  const t = texts[lang] || texts.es;

  const generateEventId = () => Math.random().toString(36).substring(2, 15);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const eventId = generateEventId();

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };

      // 🔥 LLAMADA A TU CLOUDFLARE WORKER
      const res = await fetch("https://lead-verification.sy447014.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || data.message || "Error");
      }

      // Evento Lead para Meta Pixel
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {}, { eventID: eventId });
      }

      setStatus("success");
      setMessage("Te enviamos un código por SMS 📲");

      // Aquí luego abrimos pantalla OTP

    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(err.message || t.error);
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
        {t.title}
      </h2>

      {message && (
        <div className={`text-center mb-4 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div className="relative">
          <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="name"
            placeholder={t.name}
            value={formData.name}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
            required
          />
        </motion.div>

        <motion.div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder={t.email}
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
            required
          />
        </motion.div>

        <motion.div className="relative">
          <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            name="phone"
            placeholder={t.phone}
            value={formData.phone}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
            required
          />
        </motion.div>

        <motion.button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
          disabled={status === 'loading'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === 'loading' ? <Loader className="w-5 h-5 mx-auto animate-spin" /> : t.submit}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ModernLeadForm;
