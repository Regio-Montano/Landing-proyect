import React from "react";
import { motion } from "framer-motion";

const ICONS = ["⚡", "📚", "🌐", "🎯"];
const BLUE = "#0066FF";
const GOLD = "#D4AF37";

const BenefitsSection = ({ lang = "es" }) => {

  const text = {
    es: {
      eyebrow: "Por qué elegirnos",
      title: "¿Qué Obtendrás con",
      titleAccent: "TradingPro?",
      benefits: [
        { icon: "⚡", title: "Estrategias Probadas", desc: "Técnicas validadas por traders profesionales con años de experiencia en los mercados." },
        { icon: "📚", title: "Material Exclusivo",   desc: "Acceso a contenido de alta calidad: videos, guías y herramientas de análisis." },
        { icon: "🌐", title: "Comunidad LATAM",      desc: "Únete a miles de traders activos que operan y crecen juntos en toda Latinoamérica." },
        { icon: "🎯", title: "Mentorías 1 a 1",      desc: "Sesiones personalizadas con expertos que te guían en cada paso del proceso." },
      ],
    },
    pt: {
      eyebrow: "Por que nos escolher",
      title: "O que você terá com",
      titleAccent: "TradingPro?",
      benefits: [
        { icon: "⚡", title: "Estratégias Comprovadas", desc: "Técnicas validadas por traders profissionais com anos de experiência nos mercados." },
        { icon: "📚", title: "Material Exclusivo",      desc: "Acesso a conteúdo de alta qualidade: vídeos, guias e ferramentas de análise." },
        { icon: "🌐", title: "Comunidade LATAM",        desc: "Junte-se a milhares de traders ativos que operam e crescem juntos na América Latina." },
        { icon: "🎯", title: "Mentorias 1 a 1",         desc: "Sessões personalizadas com especialistas que te guiam em cada etapa do processo." },
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
      {/* Decorative top-right glow */}
      <div
        style={{
          position: "absolute", top: "-100px", right: "-100px",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom-left blue glow */}
      <div
        style={{
          position: "absolute", bottom: "-100px", left: "-100px",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(0,102,255,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto max-w-5xl" style={{ position: "relative", zIndex: 1 }}>

        {/* Eyebrow */}
        <motion.p
          className="text-center uppercase tracking-widest mb-3"
          style={{ color: BLUE, fontSize: "0.8rem", fontWeight: 600 }}
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
              background: `linear-gradient(135deg, ${GOLD}, #FFD700, ${GOLD})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.titleAccent}
          </span>
        </motion.h2>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {t.benefits.map((item, i) => (
            <motion.div
              key={i}
              className="card-3d glass-card"
              style={{ padding: "32px 28px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 56, height: 56,
                  borderRadius: 14,
                  background: `linear-gradient(135deg, rgba(0,102,255,0.2), rgba(0,102,255,0.05))`,
                  border: `1px solid rgba(0,102,255,0.3)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.6rem", marginBottom: 20,
                  boxShadow: "0 0 20px rgba(0,102,255,0.15)",
                }}
              >
                {item.icon}
              </div>

              {/* Gold accent line */}
              <div
                style={{
                  width: 36, height: 2,
                  background: `linear-gradient(90deg, ${GOLD}, transparent)`,
                  marginBottom: 16,
                }}
              />

              <h3
                style={{
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  marginBottom: 10,
                }}
              >
                {item.title}
              </h3>

              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.65, fontSize: "0.9rem" }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BenefitsSection;
