import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+55");
  
  const [errors, setErrors] = useState({});

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validatePhone = (value) => {
    const clean = value.replace("+55", "");
    return /^\d{10,11}$/.test(clean);
  };

  const handleChange = (field, value) => {
    let newErrors = { ...errors };

    if (field === "email") {
      if (!validateEmail(value)) newErrors.email = "Email inválido";
      else delete newErrors.email;
      setEmail(value);
    }

    if (field === "phone") {
      if (!value.startsWith("+55")) value = "+55";
      if (!validatePhone(value)) newErrors.phone = "Número incorrecto";
      else delete newErrors.phone;
      setPhone(value);
    }

    if (field === "name") {
      if (!value) newErrors.name = "Nombre requerido";
      else delete newErrors.name;
      setName(value);
    }

    setErrors(newErrors);
  };

  const isValid =
    name &&
    validateEmail(email) &&
    validatePhone(phone);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { name, email, phone };

    console.log("ENVIANDO:", data);

    // Aquí luego conectas backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4">Registro</h2>

        {/* Nombre */}
        <input
          type="text"
          placeholder="Tu nombre"
          className="w-full mb-2 p-2 border rounded"
          value={name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          className="w-full mt-3 mb-2 p-2 border rounded"
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}

        {/* Teléfono */}
        <input
          type="text"
          className="w-full mt-3 mb-2 p-2 border rounded"
          value={phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone}</p>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full mt-4 p-2 rounded text-white ${
            isValid ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          Continuar
        </button>
      </form>
    </div>
  );
}
