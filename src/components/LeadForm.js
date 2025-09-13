import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Phone, CheckCircle2, AlertTriangle } from 'lucide-react';

// 👉 La petición irá a tu función serverless de Netlify
const scriptURL = '/.netlify/functions/submit';

const LeadForm = ({ motivationText = '¡Regístrate Ahora!' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '', // opcional
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setSubmitted(false);
    setError('');
    setLoading(true);

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', email: '', country: '' });
      } else {
        throw new Error(result.error || 'Error al enviar los datos');
      }
    } catch (err) {
      console.error('Error en submit:', err);
      setError('No se pudo enviar el formulario, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {submitted ? (
        <motion.div
          className="text-center py-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle2 className="w-12 h-12 mx-auto text-green-500 mb-3" />
          <h3 className="text-xl font-bold">¡Registro exitoso!</h3>
          <p className="text-gray-600 mt-1">Hemos recibido tus datos.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <motion.div
              className="text-center py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertTriangle className="w-10 h-10 mx-auto text-red-500 mb-2" />
              <p className="text-red-600 font-medium">
                ¡Ups! Algo salió mal.
              </p>
              <p className="text-gray-600 text-sm">Inténtalo de nuevo más tarde.</p>
            </motion.div>
          )}

          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Tu Nombre"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              required
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Tu Teléfono"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Tu Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              required
            />
          </div>

          {/* Campo opcional */}
          {/* 
          <input
            type="text"
            name="country"
            placeholder="País (opcional)"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
          */}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-95 disabled:opacity-60"
          >
            {loading ? 'Enviando…' : '¡Quiero registrarme gratis!'}
          </button>
        </form>
      )}
    </div>
  );
};

export default LeadForm;
