import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Phone, CheckCircle2, AlertTriangle } from 'lucide-react';

// 👇 Tu URL de Google Apps Script (la /exec)
const scriptURL = 'https://script.google.com/macros/s/AKfycbwRxV0Tvx9Z3tdi2-w_hWq4Tyj3fWIjPjf93Sy-ofiytOOee-QnghcCMRFnximfedvR/exec';

const LeadForm = ({ motivationText = "¡Regístrate Ahora!" }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError(false);

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: new URLSearchParams(formData), // se envía como form-urlencoded
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '' }); // limpia el form
    } catch (err) {
      setError(true);
    }
  };

  return (
    <motion.div
      className="p-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-center mb-4">{motivationText}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border rounded px-3 py-2">
          <User className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleChange}
            className="flex-1 outline-none"
            required
          />
        </div>

        <div className="flex items-center border rounded px-3 py-2">
          <Phone className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="tel"
            name="phone"
            placeholder="Tu teléfono"
            value={formData.phone}
            onChange={handleChange}
            className="flex-1 outline-none"
            required
          />
        </div>

        <div className="flex items-center border rounded px-3 py-2">
          <Mail className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Tu correo"
            value={formData.email}
            onChange={handleChange}
            className="flex-1 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>

      {submitted && (
        <p className="mt-4 flex items-center text-green-600">
          <CheckCircle2 className="w-5 h-5 mr-2" /> ¡Registro exitoso!
        </p>
      )}

      {error && (
        <p className="mt-4 flex items-center text-red-600">
          <AlertTriangle className="w-5 h-5 mr-2" /> Hubo un error. Intenta otra vez.
        </p>
      )}
    </motion.div>
  );
};

export default LeadForm;
