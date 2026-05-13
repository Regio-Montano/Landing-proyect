import React from "react";

const GOLD = "#D4AF37";
const BLUE = "#0066FF";

const Footer = ({ lang = "es" }) => {

  const text = {
    es: {
      rights: "Todos los derechos reservados.",
      privacy: "Tus datos se usan únicamente para fines de contacto e información.",
      policyLink: "Política de Privacidad",
    },
    pt: {
      rights: "Todos os direitos reservados.",
      privacy: "Seus dados são usados apenas para contato e informações.",
      policyLink: "Política de Privacidade",
    },
  };

  const t = text[lang] ?? text.es;

  return (
    <footer
      style={{
        background: "#000000",
        borderTop: "1px solid rgba(212,175,55,0.15)",
        padding: "48px 16px",
        textAlign: "center",
      }}
    >
      {/* Logo / brand */}
      <div
        style={{
          fontSize: "1.4rem",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          marginBottom: 16,
          background: `linear-gradient(135deg, ${GOLD}, #FFD700, ${GOLD})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        marketcorp.org
      </div>

      {/* Divider line */}
      <div
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0,102,255,0.3), rgba(212,175,55,0.3), transparent)",
          maxWidth: 400,
          margin: "0 auto 24px",
        }}
      />

      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", marginBottom: 8 }}>
        © 2024 marketcorp.org — {t.rights}
      </p>

      <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8rem", maxWidth: 480, margin: "0 auto 16px" }}>
        {t.privacy}
      </p>

      <a
        href="/privacy.html"
        style={{
          color: BLUE,
          fontSize: "0.8rem",
          textDecoration: "none",
          borderBottom: `1px solid rgba(0,102,255,0.3)`,
          paddingBottom: 2,
          transition: "color 0.2s",
        }}
        onMouseEnter={e => { e.target.style.color = GOLD; }}
        onMouseLeave={e => { e.target.style.color = BLUE; }}
      >
        {t.policyLink}
      </a>
    </footer>
  );
};

export default Footer;
