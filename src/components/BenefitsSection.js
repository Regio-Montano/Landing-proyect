import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, Rocket, Shield } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    'Estrategias probadas que funcionan',
    'Acceso a material exclusivo en línea',
    'Comunidad de traders en LATAM',
    'Mentorías personalizadas'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          className="text-4xl font-bold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          ¿Qué Obtendrás con{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TradingPro?
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700 font-medium">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;