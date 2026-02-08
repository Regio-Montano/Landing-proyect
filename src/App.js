import React from 'react';
import { motion } from 'framer-motion';
import ModernLeadForm from './components/ModernLeadForm';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

const App = () => {
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')" 
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative z-10 text-white text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Domina el Trading en 30 Días <span role="img" aria-label="rocket">🚀</span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl font-medium mb-12 drop-shadow-md"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Aprende las estrategias exactas que usan los traders profesionales para generar ingresos en los mercados financieros.
          </motion.p>

          {/* ✅ FORMULARIO CORRECTO */}
          <ModernLeadForm />
        </div>
      </div>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Central Form Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Reserva tu lugar hoy. Cupos limitados <span role="img" aria-label="hourglass">⏳</span>
          </motion.h2>

          {/* ✅ MISMO FORMULARIO */}
          <ModernLeadForm />
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Final Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Empieza tu camino en el trading ahora mismo.
          </motion.h2>

          <motion.p
            className="text-xl text-gray-700 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            El curso es 100% en línea y el registro es gratis.
          </motion.p>

          {/* ✅ MISMO FORMULARIO */}
          <ModernLeadForm />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default App;
