import React from "react";

const Footer = ({ lang = "es" }) => {

  const text = {
    es: {
      rights: "Todos los derechos reservados.",
      privacy:
        "Aviso de Privacidad: Tus datos serán utilizados únicamente para fines de contacto e información."
    },

    pt: {
      rights: "Todos os direitos reservados.",
      privacy:
        "Aviso de Privacidade: Seus dados serão utilizados apenas para contato e informações."
    }
  };

  const t = text[lang];

  return (
    <footer className="bg-gray-900 text-white text-center py-8">
      <p>© 2024 marketcorp.org — {t.rights}</p>
      <p className="text-sm mt-2">{t.privacy}</p>
    </footer>
  );
};

export default Footer;
