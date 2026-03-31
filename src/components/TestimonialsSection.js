import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TestimonialsSection = ({ lang = "es" }) => {

  // TEXTOS POR IDIOMA
  const text = {
    es: {
      title1: "Nuestros Estudiantes",
      title2: "Hablan por Nosotros",
      trust: "Confían en nosotros y operan con:",
      testimonials: [
        {
          quote: "Gracias a este curso entendí cómo operar con confianza. ¡Mi mejor inversión!",
          author: "Juan Pérez",
          role: "Estudiante TradingPro"
        },
        {
          quote: "Las mentorías personalizadas hicieron toda la diferencia. ¡Resultados desde la primera semana!",
          author: "Ana García",
          role: "Trader Independiente"
        },
        {
          quote: "La comunidad es increíble, siempre hay apoyo y nuevas ideas. ¡Totalmente recomendado!",
          author: "Carlos Ruiz",
          role: "Inversor"
        }
      ]
    },

    pt: {
      title1: "Nossos Alunos",
      title2: "Falam por Nós",
      trust: "Confiam em nós e operam com:",
      testimonials: [
        {
          quote: "Graças a este curso entendi como operar com confiança. Meu melhor investimento!",
          author: "Juan Pérez",
          role: "Aluno TradingPro"
        },
        {
          quote: "As mentorias personalizadas fizeram toda a diferença. Resultados desde a primeira semana!",
          author: "Ana García",
          role: "Trader Independente"
        },
        {
          quote: "A comunidade é incrível, sempre há apoio e novas ideias. Totalmente recomendado!",
          author: "Carlos Ruiz",
          role: "Investidor"
        }
      ]
    }
  };

  const t = text[lang];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* TITULO */}
        <motion.h2
          className="text-4xl font-bold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t.title1}{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t.title2}
          </span>
        </motion.h2>

        {/* TESTIMONIOS */}
        <div className="grid md:grid-cols-3 gap-8">
          {t.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Quote className="w-8 h-8 text-blue-500 mb-4" />

              <p className="text-gray-700 italic mb-4">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="font-semibold text-gray-900 mt-2">
                {testimonial.author}
              </p>

              <p className="text-sm text-gray-600">
                {testimonial.role}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
