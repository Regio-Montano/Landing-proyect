import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ModernLeadForm from "./components/ModernLeadForm";
import BenefitsSection from "./components/BenefitsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";
import ParticleField from "./components/ParticleField";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const App = () => {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("/api/geo");
        const data = await res.json();
        setLang(data.country === "BR" ? "pt" : "es");
      } catch {
        setLang("es");
      }
    };
    detectCountry();
  }, []);

  const text = {
    es: {
      badge: "⚡ Cupos Limitados — Cierra en 48h",
      title1: "Domina el",
      titleAccent: "Trading",
      title2: "en 30 Días",
      subtitle: "Aprende las estrategias exactas que usan los traders profesionales para generar ingresos consistentes en los mercados financieros.",
      stat1n: "15,000+", stat1l: "Estudiantes",
      stat2n: "98%",    stat2l: "Tasa de Éxito",
      stat3n: "24/7",   stat3l: "Soporte",
      reserve: "Reserva tu lugar — cupos limitados",
      start:   "Empieza tu camino en el trading ahora.",
      online:  "100% en línea · Registro gratuito · Acceso inmediato",
      ctaSection: "¿Listo para transformar tu vida financiera?",
    },
    pt: {
      badge: "⚡ Vagas Limitadas — Fecha em 48h",
      title1: "Domine o",
      titleAccent: "Trading",
      title2: "em 30 Dias",
      subtitle: "Aprenda as estratégias exatas que traders profissionais usam para gerar renda consistente nos mercados financeiros.",
      stat1n: "15.000+", stat1l: "Alunos",
      stat2n: "98%",     stat2l: "Taxa de Sucesso",
      stat3n: "24/7",    stat3l: "Suporte",
      reserve: "Reserve sua vaga — vagas limitadas",
      start:   "Comece sua jornada no trading agora.",
      online:  "100% online · Registro gratuito · Acesso imediato",
      ctaSection: "Pronto para transformar sua vida financeira?",
    },
  };

  const t = text[lang] ?? text.es;

  return (
    <motion.div
      className="min-h-screen"
      style={{ backgroundColor: "#000000" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >

      {/* ── HERO: VIDEO BACKGROUND ───────────────────── */}
      <div className="hero-video-wrap" style={{ minHeight: "100vh" }}>

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", zIndex: 0,
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark gradient overlay */}
        <div className="hero-overlay" />

        {/* Floating particles */}
        <ParticleField />

        {/* Blue radial glow */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
            background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,102,255,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          className="hero-content flex flex-col items-center justify-center text-center px-4"
          style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "80px" }}
        >

          {/* Urgency badge */}
          <motion.div
            className="badge-urgent mb-8"
            variants={fadeUp} initial="hidden" animate="show" custom={0}
          >
            {t.badge}
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-extrabold text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", letterSpacing: "-0.02em" }}
            variants={fadeUp} initial="hidden" animate="show" custom={1}
          >
            {t.title1}{" "}
            <span className="text-gold-gradient">{t.titleAccent}</span>
            <br />
            {t.title2}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-white/70 mb-10 max-w-2xl"
            style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.7 }}
            variants={fadeUp} initial="hidden" animate="show" custom={2}
          >
            {t.subtitle}
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="flex gap-10 mb-12"
            variants={fadeUp} initial="hidden" animate="show" custom={3}
          >
            {[
              [t.stat1n, t.stat1l],
              [t.stat2n, t.stat2l],
              [t.stat3n, t.stat3l],
            ].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-blue-gradient font-extrabold text-2xl md:text-3xl">{num}</div>
                <div className="text-white/50 text-sm mt-1 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Lead form */}
          <motion.div
            className="w-full max-w-md"
            variants={fadeUp} initial="hidden" animate="show" custom={4}
          >
            <div className="glass-card p-1 animate-pulse-glow">
              <ModernLeadForm lang={lang} />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Divider */}
      <div className="section-line" />

      {/* ── BENEFITS ─────────────────────────────────── */}
      <BenefitsSection lang={lang} />

      <div className="section-line" />

      {/* ── RESERVE CTA ──────────────────────────────── */}
      <section
        style={{
          padding: "100px 16px",
          background: "linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative glow blob */}
        <div
          style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px", height: "600px",
            background: "radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="container mx-auto max-w-3xl text-center" style={{ position: "relative", zIndex: 1 }}>

          <motion.h2
            className="font-extrabold text-white mb-10"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {t.reserve}
          </motion.h2>

          <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="glass-card-gold p-1">
              <ModernLeadForm lang={lang} />
            </div>
          </motion.div>

        </div>
      </section>

      <div className="section-line" />

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <TestimonialsSection lang={lang} />

      <div className="section-line" />

      {/* ── FINAL CTA ────────────────────────────────── */}
      <section
        style={{
          padding: "100px 16px",
          background: "linear-gradient(180deg, #000000 0%, #030310 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", bottom: 0, left: "50%",
            transform: "translateX(-50%)",
            width: "800px", height: "400px",
            background: "radial-gradient(ellipse at bottom, rgba(212,175,55,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="container mx-auto max-w-3xl text-center" style={{ position: "relative", zIndex: 1 }}>

          <motion.h2
            className="font-extrabold mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="text-gold-gradient">{t.ctaSection}</span>
          </motion.h2>

          <motion.p
            className="text-white/50 mb-12"
            style={{ fontSize: "1.1rem" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.online}
          </motion.p>

          <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-1">
              <ModernLeadForm lang={lang} />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <Footer lang={lang} />

    </motion.div>
  );
};

export default App;
