import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star, Clock, Users } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Básico',
      price: '$197',
      originalPrice: '$497',
      description: 'Perfecto para principiantes',
      features: [
        'Curso completo de fundamentos',
        '20+ horas de video contenido',
        'Estrategias básicas de trading',
        'Soporte por email',
        'Acceso por 1 año',
        'Certificado de finalización'
      ],
      popular: false,
      color: 'from-gray-600 to-gray-700'
    },
    {
      name: 'Profesional',
      price: '$297',
      originalPrice: '$997',
      description: 'El más popular entre nuestros estudiantes',
      features: [
        'Todo lo del plan Básico',
        '50+ horas de contenido avanzado',
        'Estrategias profesionales',
        'Mentorías grupales semanales',
        'Acceso de por vida',
        'Comunidad privada VIP',
        'Análisis de mercado diario',
        'Plantillas y herramientas'
      ],
      popular: true,
      color: 'from-blue-600 to-purple-600'
    },
    {
      name: 'Elite',
      price: '$497',
      originalPrice: '$1,997',
      description: 'Para traders serios que buscan resultados máximos',
      features: [
        'Todo lo del plan Profesional',
        'Mentorías 1 a 1 personalizadas',
        'Estrategias institucionales',
        'Acceso a señales premium',
        'Revisión de portafolio mensual',
        'Soporte prioritario 24/7',
        'Masterclasses exclusivas',
        'Garantía de resultados extendida'
      ],
      popular: false,
      color: 'from-purple-600 to-pink-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Elige Tu{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Plan Perfecto
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Todos nuestros planes incluyen garantía de devolución de 60 días. 
            Si no ves resultados, te devolvemos el 100% de tu dinero.
          </p>
          
          <motion.div 
            className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-6 py-3 rounded-full text-lg font-bold"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Clock className="w-5 h-5" />
            ¡Oferta termina en 24 horas!
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative bg-white border-2 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'border-blue-500 scale-105' : 'border-gray-200'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Más Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-lg text-gray-500 line-through ml-2">{plan.originalPrice}</span>
                </div>
                
                <div className="text-sm text-gray-600">Pago único - Sin suscripciones</div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + featureIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button 
                className={`w-full px-8 py-4 font-bold text-lg rounded-xl transition-all duration-300 ${
                  plan.popular
                    ? `bg-gradient-to-r ${plan.color} text-white shadow-xl hover:shadow-2xl`
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Comenzar Ahora
              </motion.button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Garantía de devolución de 60 días
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200/50">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-4">
                <Users className="w-12 h-12 text-blue-600" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">15,000+</div>
                  <div className="text-gray-600">Estudiantes satisfechos</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Star className="w-12 h-12 text-yellow-500 fill-current" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-gray-600">Calificación promedio</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-gray-600">Tasa de éxito</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;