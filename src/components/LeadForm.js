import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Phone, CheckCircle2, AlertTriangle } from 'lucide-react';

const LeadForm = ({ motivationText = "¡Regístrate Ahora!" }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // ¡ATENCIÓN, MORTAL! Aquí debes pegar la URL de tu Google Script.
  // Asegúrate de que termine en /exec.
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyaYp5cI6Z2-uMOjGei97af-vme_1yHLFWXy2AtrPm1_8LDumqkAD7OihmnRQCIG01-Mw/exec'; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false); // Resetear el estado de enviado
    setError(false); // Resetear el estado de error

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        // Google Scripts espera los datos como un objeto FormData o URL-encoded
        // No como JSON directamente si no lo configuras en el script.
        // Para simplificar, lo enviamos como FormData.
        body: new FormData(e.target), 
        // No necesitamos 'Content-Type': 'application/json' si enviamos FormData
      });

      if (response.ok) {
        // Asumiendo que el script de Google devuelve una respuesta JSON
        const data = await response.json(); 
        console.log('Respuesta del servidor:', data);
        setSubmitted(true);
        setFormData({ name: '', phone: '', email: '' }); // Limpiar el formulario
      } else {
        console.error('Error en la respuesta del servidor:', response.status, response.statusText);
        setError(true);
      }
    } catch (err) {
      console.error('Error al enviar los datos:', err);
      setError(true);
    }
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-xl max-w-md mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {!submitted && !error ? (
        <>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            {motivationText}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            No te pierdas nuestras ofertas exclusivas y contenido premium.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu Nombre"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900"
                required
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
                value={formData.phone}
                onChange={handleChange}
                placeholder="Tu Teléfono"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900"
                required
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Tu Correo Electrónico"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900"
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              ¡Quiero registrarme gratis!
            </motion.button>
          </form>
        </>
      ) : submitted ? (
        <motion.div
          className="text-center py-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-gray-900 mb-3">¡Gracias por tu interés!</h3>
          <p className="text-gray-600 text-lg">
            Hemos recibido tus datos. Pronto nos pondremos en contacto contigo.
          </p>
        </motion.div>
      ) : ( // error
        <motion.div
          className="text-center py-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-gray-900 mb-3">¡Ups! Algo salió mal.</h3>
          <p className="text-gray-600 text-lg">
            No pudimos enviar tus datos. Por favor, inténtalo de nuevo más tarde.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LeadForm;