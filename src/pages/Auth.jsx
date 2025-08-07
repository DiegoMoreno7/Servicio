import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialRegister = {
  asociacion: "",
  rfc: "",
  ciudad: "",
  representante: "",
  domicilio: "",
  telefono: "",
  email: "",
  integrantes: "",
  docAsociacion: null,
  ine: null,
};

const Auth = () => {
  const [tab, setTab] = useState("login");
  const [login, setLogin] = useState({ email: "", password: "" });
  const [register, setRegister] = useState(initialRegister);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const navigate = useNavigate();

  // Validación básica
  const validateRegister = () => {
    for (const key of Object.keys(initialRegister)) {
      if (!register[key] || (typeof register[key] === "string" && !register[key].trim())) {
        return false;
      }
    }
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateRegister()) {
      setRegisterError("Por favor, completa todos los campos requeridos.");
      setRegisterSuccess(false);
      return;
    }
    setRegisterError("");
    setRegisterSuccess(true);
  };

  const Modal = ({ show, onClose, children }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-gray-50 rounded-lg shadow-lg p-8 max-w-sm w-full text-center border border-blue-600">
          <div className="text-blue-400 font-semibold mb-4">
            {children}
          </div>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-2 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
        {/* Tabs */}
        <div className="flex mb-8">
          <button
            className={`flex-1 py-2 rounded-t-lg font-semibold transition ${
              tab === "login"
                ? "bg-blue-600 text-white"
                : "bg-gray-500 text-gray-100 hover:bg-gray-600"
            }`}
            onClick={() => setTab("login")}
          >
            Iniciar sesión
          </button>
          <button
            className={`flex-1 py-2 rounded-t-lg font-semibold transition ${
              tab === "register"
                ? "bg-blue-600 text-white"
                : "bg-gray-500 text-gray-100 hover:bg-gray-600"
            }`}
            onClick={() => setTab("register")}
          >
            Registro de asociación
          </button>
        </div>

        {/* Login */}
        {tab === "login" && (
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 outline-none"
                value={login.email}
                onChange={e => setLogin({ ...login, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 outline-none"
                value={login.password}
                onChange={e => setLogin({ ...login, password: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
                onClick={() => navigate("/dashboard")}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                className="text-blue-400 hover:underline text-sm"
                onClick={() => navigate("/recovery")}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        )}

        {/* Registro */}
        {tab === "register" && (
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1">Nombre de la asociación</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 outline-none"
                  value={register.asociacion}
                  onChange={e => setRegister({ ...register, asociacion: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">RFC</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 outline-none"
                  value={register.rfc}
                  onChange={e => setRegister({ ...register, rfc: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Ciudad de origen</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 outline-none"
                  value={register.ciudad}
                  onChange={e => setRegister({ ...register, ciudad: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Representante legal</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 outline-none"
                  value={register.representante}
                  onChange={e => setRegister({ ...register, representante: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Domicilio</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 outline-none"
                  value={register.domicilio}
                  onChange={e => setRegister({ ...register, domicilio: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 outline-none"
                  value={register.telefono}
                  onChange={e => setRegister({ ...register, telefono: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 outline-none"
                  value={register.email}
                  onChange={e => setRegister({ ...register, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Número de integrantes</label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 outline-none"
                  value={register.integrantes}
                  onChange={e => setRegister({ ...register, integrantes: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Documento de asociación */}
              <div>
                <label className="block text-gray-700 mb-1">Documento de asociación (PDF o imagen)</label>
                <label className="flex items-center gap-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded border border-blue-200 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  <span>
                    {register.docAsociacion ? (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg>
                        {register.docAsociacion.name}
                      </span>
                    ) : "Seleccionar archivo"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={e => setRegister({ ...register, docAsociacion: e.target.files[0] })}
                    required
                  />
                </label>
                <span className="text-xs text-gray-600 block mt-1">Formatos permitidos: PDF, imagen</span>
              </div>
              {/* INE del representante legal */}
              <div>
                <label className="block text-gray-700 mb-1">INE del representante legal (PDF o imagen)</label>
                <label className="flex items-center gap-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded border border-blue-200 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  <span>
                    {register.ine ? (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg>
                        {register.ine.name}
                      </span>
                    ) : "Seleccionar archivo"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={e => setRegister({ ...register, ine: e.target.files[0] })}
                    required
                  />
                </label>
                <span className="text-xs text-gray-600 block mt-1">Formatos permitidos: PDF, imagen</span>
              </div>
            </div>
            {registerError && (
              <div className="text-red-500 font-semibold">{registerError}</div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition mt-2 text-lg"
            >
              Enviar registro
            </button>
            <Modal
                show={registerSuccess}
                onClose={() =>{
                    setRegisterSuccess(false);
                    navigate("/");
                }}
                >
                ¡Registro exitoso!<br />
                Tu solicitud ha sido enviada y está en revisión por las autoridades competentes. 
                Recibirás un correo electrónico de confirmación una vez que tu registro sea aprobado.<br />
                Si tienes alguna pregunta, por favor contáctanos a través de nuestro correo 
                electrónico de soporte.<br />
                <br />
                Tiempo estimado: 1 mes.
            </Modal>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;