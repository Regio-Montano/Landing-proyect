import React from 'react';
import { motion } from 'framer-motion';

const GOLD = "#D4AF37";
const BLUE = "#0066FF";

const StarRow = () => (
  <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={GOLD}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

const TestimonialsSection = ({ lang = "es" }) => {

  const text = {
    es: {
      eyebrow: "Historias reales",
      title: "Nuestros Estudiantes",
      titleAccent: "Hablan por Nosotros",
      testimonials: [
        { quote: "Gracias a este curso entendí cómo operar con confianza. ¡Mi mejor inversión de vida!", author: "Juan Pérez", role: "Estudiante TradingPro", country: "🇲🇽" },
        { quote: "Las mentorías personalizadas hicieron toda la diferencia. ¡Resultados desde la primera semana!", author: "Ana García", role: "Trader Independiente", country: "🇨🇴" },
        { quote: "La comunidad es increíble — apoyo constante, ideas frescas y traders que de verdad ayudan.", author: "Carlos Ruiz", role: "Inversor", country: "🇦🇷" },
      ],
    },
    pt: {
      eyebrow: "Histórias reais",
      title: "Nossos Alunos",
      titleAccent: "Falam por Nós",
      testimonials: [
        { quote: "Graças a este curso entendi como operar com confiança. Meu melhor investimento de vida!", author: "João Silva", role: "Aluno TradingPro", country: "🇧🇷" },
        { quote: "As mentorias personalizadas fizeram toda a diferença. Resultados desde a primeira semana!", author: "Ana García", role: "Trader Independente", country: "🇧🇷" },
        { quote: "A comunidade é incrível — apoio constante, ideias novas e traders que realmente ajudam.", author: "Carlos Ruiz", role: "Investidor", country: "🇧🇷" },
      ],
    },
  };

  const t = text[lang] ?? text.es;

  return (
    <section
      style={{
        padding: "100px 16px",
        background: "#000000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Center gold glow */}
      <div
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px", height: "400px",
          background: "radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto max-w-5xl" style={{ position: "relative", zIndex: 1 }}>

        {/* Eyebrow */}
        <motion.p
          className="text-center uppercase tracking-widest mb-3"
          style={{ color: GOLD, fontSize: "0.8rem", fontWeight: 600 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {t.eyebrow}
        </motion.p>

        {/* Title */}
        <motion.h2
          className="text-center font-extrabold text-white mb-16"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {t.title}{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${BLUE}, #00A3FF)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.titleAccent}
          </span>
        </motion.h2>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {t.testimonials.map((item, i) => (
            <motion.div
              key={i}
              className="card-3d glass-card-gold"
              style={{ padding: "32px 28px" }}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              {/* Gold quote mark */}
              <div
                style={{
                  fontSize: "3.5rem", lineHeight: 1,
                  color: GOLD, opacity: 0.4,
                  fontFamily: "Georgia, serif",
                  marginBottom: 8,
                }}
              >
                "
              </div>

              <StarRow />

              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  marginBottom: 24,
                  fontSize: "0.95rem",
                }}
              >
                {item.quote}
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${BLUE}, #00A3FF)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", flexShrink: 0,
                  }}
                >
                  {item.country}
                </div>
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.9rem" }}>
                    {item.author}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
                    {item.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
