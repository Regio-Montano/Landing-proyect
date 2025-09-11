import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300">support@marketcorp.org</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300">marketcorp.org</span>
          </div>
        </motion.div>

        <motion.p
          className="text-gray-400 text-sm mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          © 2024 marketcorp.org. Todos los derechos reservados.
        </motion.p>

        <motion.p
          className="text-gray-500 text-xs leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Aviso de Privacidad: Tus datos serán utilizados únicamente para fines de contacto y envío de información relevante sobre nuestros cursos y promociones, de acuerdo con nuestra política de privacidad.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;