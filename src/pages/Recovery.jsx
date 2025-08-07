import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Recovery = () => {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el correo de recuperación
    setEnviado(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-2 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">
          Recuperar contraseña
        </h2>
        {enviado ? (
          <div className="text-blue-400 text-center">
            Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 outline-none"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            >
              Enviar enlace de recuperación
            </button>
          </form>
        )}
        <button
            type="button"
            className="mt-6 w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded transition"
            onClick={() => navigate(-1)}
            >
            Volver
        </button>
      </div>
    </div>
  );
};

export default Recovery;