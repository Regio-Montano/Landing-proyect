import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Clock, CheckCircle2 } from 'lucide-react';

const HeroSection = () => {
  const stats = [
    { number: '15,000+', label: 'Estudiantes Activos' },
    { number: '98%', label: 'Tasa de Éxito' },
    { number: '24/7', label: 'Soporte Disponible' }
  ];

  const benefits = [
    'Estrategias probadas que funcionan',
    'Mentorías personalizadas 1 a 1',
    'Acceso de por vida al contenido',
    'Comunidad exclusiva de traders'
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Star className="w-4 h-4 fill-current" />
              ¡Oferta Limitada - 70% de Descuento!
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Domina el{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trading
              </span>{' '}
              en 30 Días
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Aprende las estrategias exactas que usan los traders profesionales para generar 
              ingresos consistentes en los mercados financieros. Sin experiencia previa necesaria.
            </p>

            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Comenzar Mi Entrenamiento
              </motion.button>
              <motion.button 
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold text-lg rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Demo Gratuita
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <div className="text-2xl font-bold text-blue-600">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200/50">
              <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                ¡Solo quedan 12 cupos!
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Curso Completo de Trading
                </h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-600 font-medium ml-2">(4.9/5 - 2,847 reseñas)</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Más de 50 horas de contenido</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Acceso inmediato y de por vida</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Certificado de finalización</span>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  <span className="line-through text-gray-400 text-xl">$997</span>
                  <span className="text-green-600 ml-2">$297</span>
                </div>
                <p className="text-sm text-gray-600">Oferta válida por tiempo limitado</p>
              </div>

              <motion.button 
                className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ¡Inscribirme Ahora!
              </motion.button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Garantía de devolución de 30 días
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;