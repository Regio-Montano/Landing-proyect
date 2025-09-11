import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Phone, CheckCircle2, AlertTriangle, Loader } from 'lucide-react';
// No importamos intlTelInput directamente aquí, asumimos que está en window
// import intlTelInput from 'intl-tel-input'; 

// La URL ahora apunta a tu función Netlify
const SCRIPT_URL = '/.netlify/functions/lead';

export default function ModernLeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '', // Este será el número completo con código de país
    email: '',
    country: 'Mexico',  // Valor por defecto
    countryCode: '+52', // Valor por defecto
    hp: '' // Honeypot
  });
  const [formStatus, setFormStatus] = useState('idle');  // 'idle' | 'submitting' | 'success' | 'error'
  const [formMessage, setFormMessage] = useState('');
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null); // Referencia a la instancia de intlTelInput

  // Inicializa intl-tel-input
  useEffect(() => {
    if (phoneInputRef.current && window.intlTelInput) {
      itiRef.current = window.intlTelInput(phoneInputRef.current, {
        initialCountry: 'mx',
        preferredCountries: ['mx','co','ar','cl','pe', 'ec', 've', 'uy', 'py', 'bo', 'pa', 'cr', 'sv', 'gt', 'hn', 'ni', 'do', 'cu', 'bz', 'pr'],
        separateDialCode: true,
        // utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js' // Ya se carga globalmente
      });

      // Escuchar cambios en el input y en la selección de país
      const handlePhoneUpdate = () => {
        const iti = itiRef.current;
        if (iti) {
          const fullNumber = iti.getNumber(); // Obtiene el número completo (ej: +521234567890)
          const selectedCountryData = iti.getSelectedCountryData(); // Obtiene los datos del país seleccionado
          
          setFormData(prev => ({
            ...prev,
            phone: fullNumber, // Ahora phone guarda el número completo
            countryCode: `+${selectedCountryData.dialCode}`, // El código de marcación (ej: +52)
            country: selectedCountryData.name, // El nombre del país (ej: Mexico)
          }));
        }
      };

      phoneInputRef.current.addEventListener('change', handlePhoneUpdate);
      phoneInputRef.current.addEventListener('countrychange', handlePhoneUpdate);

      // Limpiar al desmontar el componente
      return () => {
        phoneInputRef.current.removeEventListener('change', handlePhoneUpdate);
        phoneInputRef.current.removeEventListener('countrychange', handlePhoneUpdate);
        itiRef.current?.destroy();
      };
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: si hp tiene algo, abortar
    if (formData.hp?.trim()) {
      console.log("Bot detectado (honeypot). Formulario no enviado.");
      setFormStatus('idle'); // No cambiar el estado visible al usuario
      setFormMessage(''); // No mostrar mensaje de error al usuario
      return;
    }

    setFormStatus('submitting');
    setFormMessage('Enviando…');

    try {
      const iti = itiRef.current;
      
      // Validar el número de teléfono con intl-tel-input
      if (iti && !iti.isValidNumber()) {
        setFormStatus('error');
        setFormMessage('❌ Por favor, ingresa un número de teléfono válido.');
        return;
      }
      // Si el número es válido, pero el campo está vacío (puede pasar si el usuario borra todo)
      if (!formData.phone.trim()) { // Ahora formData.phone es el número completo
        setFormStatus('error');
        setFormMessage('❌ El campo de teléfono no puede estar vacío.');
        return;
      }

      // Armar el payload exactamente como se especificó
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(), // formData.phone ya es el número completo
        email: formData.email.trim(),
        country: formData.country,
        countryCode: formData.countryCode
      };

      // Realizar el fetch a la función Netlify con Content-Type: application/json
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Aquí ya puedes JSON normal
        body: JSON.stringify(payload)
      });

      let data = {};
      try { data = await res.json(); } catch (_) {} // La función Netlify devuelve JSON

      if (data?.result === 'success') {
        setFormStatus('success');
        setFormMessage('✅ ¡Registro exitoso! Pronto nos pondremos en contacto.');
        setFormData({ // Limpiar campos, manteniendo los valores por defecto de país
          name: '',
          phone: '', // Limpiar el campo de teléfono local
          countryCode: '+52',
          country: 'Mexico',
          hp: ''
        });
        iti?.setNumber(''); // limpia input tel
        iti?.setCountry("mx"); // Volver al país inicial
      } else {
        setFormStatus('error');
        setFormMessage(data?.message || '⚠️ Hubo un error al guardar los datos. Inténtalo de nuevo.');
      }
    } catch (err) {
      console.error("Error en el envío:", err); // error de red o de la función
      setFormStatus('error');
      setFormMessage('❌ No pudimos enviar tus datos, inténtalo de nuevo.');
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
        {/* Honeypot (opcional) */}
        <input 
          type="text" 
          name="hp" 
          id="hp" 
          autoComplete="off" 
          tabIndex="-1" 
          value={formData.hp}
          onChange={handleChange}
          className="hidden"
          aria-hidden="true"
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

        {/* Campo de teléfono con intl-tel-input */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel" // Importante que sea type="tel"
            name="phone"
            id="phone"
            ref={phoneInputRef} // Asignamos la ref
            value={formData.phone} // Ahora el input se controla con formData.phone (número completo)
            onChange={handleChange} // Manejador de cambio normal
            placeholder="Tu Teléfono"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-900"
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
}