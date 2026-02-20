import React from "react";

const BenefitsSection = ({ lang = "es" }) => {

  const text = {
    es: {
      title: "¿Qué Obtendrás con TradingPro?",
      benefits: [
        "Estrategias probadas que funcionan",
        "Acceso a material exclusivo en línea",
        "Comunidad de traders en LATAM",
        "Mentorías personalizadas"
      ]
    },

    pt: {
      title: "O que você terá com TradingPro?",
      benefits: [
        "Estratégias comprovadas que funcionam",
        "Acesso a material exclusivo online",
        "Comunidade de traders na América Latina",
        "Mentorias personalizadas"
      ]
    }
  };

  const t = text[lang];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-4xl font-bold mb-10">
          {t.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {t.benefits.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-lg shadow border"
            >
              {item}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BenefitsSection;
