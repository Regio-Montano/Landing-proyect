export default function BenefitsSection({ lang = "es" }) {

  const text = {
    es: {
      title: "¿Qué Obtendrás con TradingPro?",
      b1: "Estrategias probadas que funcionan",
      b2: "Acceso a material exclusivo en línea",
      b3: "Comunidad de traders en LATAM",
      b4: "Mentorías personalizadas"
    },
    pt: {
      title: "O que você terá com TradingPro?",
      b1: "Estratégias comprovadas que funcionam",
      b2: "Acesso a material exclusivo online",
      b3: "Comunidade de traders na América Latina",
      b4: "Mentorias personalizadas"
    }
  };

  const t = text[lang];

  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-10">{t.title}</h2>

      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div>{t.b1}</div>
        <div>{t.b2}</div>
        <div>{t.b3}</div>
        <div>{t.b4}</div>
      </div>
    </section>
  );
}
