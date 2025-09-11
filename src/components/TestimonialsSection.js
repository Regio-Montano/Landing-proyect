import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: 'Gracias a este curso entendí cómo operar con confianza. ¡Mi mejor inversión!',
      author: 'Juan Pérez',
      role: 'Estudiante TradingPro'
    },
    {
      quote: 'Las mentorías personalizadas hicieron toda la diferencia. ¡Resultados desde la primera semana!',
      author: 'Ana García',
      role: 'Trader Independiente'
    },
    {
      quote: 'La comunidad es increíble, siempre hay apoyo y nuevas ideas. ¡Totalmente recomendado!',
      author: 'Carlos Ruiz',
      role: 'Inversor'
    }
  ];

  const logos = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/2560px-Binance_logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/TradingView_Logo.svg/2560px-TradingView_Logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/MetaTrader_4_logo.svg/2560px-MetaTrader_4_logo.svg.png'
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          className="text-4xl font-bold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Nuestros Estudiantes{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hablan por Nosotros
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Quote className="w-8 h-8 text-blue-500 mb-4" />
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="font-semibold text-gray-900 mt-2">{testimonial.author}</p>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Confían en nosotros y operan con:
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {logos.map((logo, index) => (
              <motion.img
                key={index}
                src={logo}
                alt={`Logo ${index + 1}`}
                className="h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;