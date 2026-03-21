import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ModernLeadForm from "./components/ModernLeadForm";
import BenefitsSection from "./components/BenefitsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";

const App = () => {

  const [lang, setLang] = useState("es");

  // Detectar país automáticamente
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("/api/geo");
        const data = await res.json();

        console.log("País detectado:", data.country);

        // Brasil → portugués, resto → español
        setLang(data.country === "BR" ? "pt" : "es");

      } catch (error) {
        console.log("Error detectando país → default ES");
        setLang("es");
      }
    };

    detectCountry();
  }, []);

  // Textos por idioma
  const text = {
    es: {
      title: "Domina el Trading en 30 Días 🚀",
      subtitle:
        "Aprende las estrategias exactas que usan los traders profesionales para generar ingresos en los mercados financieros.",
      reserve: "Reserva tu lugar hoy. Cupos limitados ⏳",
      start: "Empieza tu camino en el trading ahora mismo.",
      online: "El curso es 100% en línea y el registro es gratis."
    },

    pt: {
      title: "Domine o Trading em 30 Dias 🚀",
      subtitle:
        "Aprenda as estratégias exatas que traders profissionais usam para gerar renda nos mercados financeiros.",
      reserve: "Reserve sua vaga hoje. Vagas limitadas ⏳",
      start: "Comece sua jornada no trading agora mesmo.",
      online: "O curso é 100% online e o registro é gratuito."
    }
  };

  const t = text[lang] ?? text.es;

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >

      {/* HERO */}
      <div
        className="relative min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=2070&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative z-10 text-white text-center max-w-4xl mx-auto">

          <motion.h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            {t.title}
          </motion.h1>

          <motion.p className="text-xl md:text-2xl mb-12">
            {t.subtitle}
          </motion.p>

          {/* FORM con idioma */}
          <ModernLeadForm lang={lang} />

        </div>
      </div>

      {/* BENEFITS */}
      <BenefitsSection lang={lang} />

      {/* SECCIÓN CENTRAL */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">

          <h2 className="text-4xl font-bold mb-6">
            {t.reserve}
          </h2>

          <ModernLeadForm lang={lang} />

        </div>
      </section>

      {/* TESTIMONIOS */}
      <TestimonialsSection lang={lang} />

      {/* SECCIÓN FINAL */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">

          <h2 className="text-4xl font-bold mb-6">
            {t.start}
          </h2>

          <p className="text-xl mb-12">
            {t.online}
          </p>

          <ModernLeadForm lang={lang} />

        </div>
      </section>

      {/* FOOTER */}
      <Footer lang={lang} />

    </motion.div>
  );
};

export default App;
