import React, { useState } from "react";
import { FaMapMarkerAlt, FaUserPlus, FaSearch, FaCheckCircle, FaEdit, FaChartBar } from "react-icons/fa";
import { nav } from "framer-motion/client";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Simulación de datos de la asociación
const datosAsociacion = {
  nombre: "Los Pequeñitos",
  rfc: "PEQ123456789",
  ciudad: "Ciudad de México",
  representante: "María Pérez",
  domicilio: "Calle Esperanza 123, CDMX",
  telefono: "555-123-4567",
  email: "contacto@lospequenitos.org",
  integrantes: 12,
};

const Dashboard = () => {
  const [editando, setEditando] = useState(false);
  const [datos, setDatos] = useState(datosAsociacion);

  // Para la navegación entre tarjetas
  const navigate = useNavigate();
  const [seccion, setSeccion] = useState(null);

  // Manejo de cambios en los campos de la asociación
  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  // Tarjeta de datos de la asociación
  const renderDatosAsociacion = () => (
      <div className="bg-gray-100 rounded-xl shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-500">
            {datos.nombre}
          </h2>
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            onClick={() => setEditando(!editando)}
          >
            <FaEdit /> {editando ? "Guardar" : "Modificar"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm">RFC</label>
            <input
              className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-1 mb-2"
              value={datos.rfc}
              name="rfc"
              disabled={true}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm">Ciudad</label>
            <input
              className="w-full bg-gray-900 text-white rounded px-3 py-2 mt-1 mb-2"
              value={datos.ciudad}
              name="ciudad"
              disabled={!editando}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm">Representante legal</label>
            <input
              className="w-full bg-gray-900 text-white rounded px-3 py-2 mt-1 mb-2"
              value={datos.representante}
              name="representante"
              disabled={!editando}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm">Domicilio</label>
            <input
              className="w-full bg-gray-900 text-white rounded px-3 py-2 mt-1 mb-2"
              value={datos.domicilio}
              name="domicilio"
              disabled={!editando}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm">Teléfono</label>
            <input
              className="w-full bg-gray-900 text-white rounded px-3 py-2 mt-1 mb-2"
              value={datos.telefono}
              name="telefono"
              disabled={!editando}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm">Correo electrónico</label>
            <input
              className="w-full bg-gray-900 text-white rounded px-3 py-2 mt-1 mb-2"
              value={datos.email}
              name="email"
              disabled={!editando}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm">Número de integrantes</label>
            <input
              className="w-full bg-gray-900 text-white rounded px-3 py-2 mt-1 mb-2"
              value={datos.integrantes}
              name="integrantes"
              disabled={!editando}
              onChange={handleChange}
              type="number"
              min={1}
            />
          </div>
        </div>
      </div>
  );

  // Tarjetas de menú principal
  const menu = [
  {
    icon: <FaMapMarkerAlt className="text-3xl text-blue-500" />,
    title: "Subir lugar de búsqueda",
    desc: "Registra un nuevo lugar de búsqueda y los datos encontrados.",
    onClick: () => navigate("/search-place"),
    color: "from-blue-100 to-blue-200 border-blue-400 hover:shadow-blue-200",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    icon: <FaUserPlus className="text-3xl text-pink-500" />,
    title: "Subir persona desaparecida",
    desc: "Agrega una nueva ficha de persona desaparecida o no localizada.",
    onClick: () => navigate("/add-person"),
    color: "from-pink-100 to-pink-200 border-pink-400 hover:shadow-pink-200",
    iconBg: "bg-pink-100 text-pink-600",
  },
  {
    icon: <FaSearch className="text-3xl text-green-500" />,
    title: "Buscar coincidencias",
    desc: "Sube una imagen o datos para buscar coincidencias.",
    onClick: () => navigate("/search-matches"),
    color: "from-green-100 to-green-200 border-green-400 hover:shadow-green-200",
    iconBg: "bg-green-100 text-green-600",
  },
  {
    icon: <FaCheckCircle className="text-3xl text-yellow-500" />,
    title: "Persona localizada",
    desc: "Busca por ID y elimina registros de personas localizadas.",
    onClick: () => navigate("/localized"),
    color: "from-yellow-100 to-yellow-200 border-yellow-400 hover:shadow-yellow-200",
    iconBg: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: <FaChartBar className="text-3xl text-purple-500" />,
    title: "Ver estadísticas",
    desc: "Consulta estadísticas y reportes de la asociación.",
    onClick: () => navigate("/statistics"),
    color: "from-purple-100 to-purple-200 border-purple-400 hover:shadow-purple-200",
    iconBg: "bg-purple-100 text-purple-600",
  },
];

  // Renderiza el menú principal
  const renderMenu = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {menu.map((item, idx) => (
      <div
        key={idx}
        className={`
          bg-gradient-to-br ${item.color} 
          border-2 rounded-xl shadow-lg p-6 flex flex-col items-center 
          cursor-pointer transition-all duration-200
          hover:-translate-y-1 hover:scale-105
        `}
        onClick={item.onClick}
        style={{ minHeight: 210 }}
      >
        <div className={`w-14 h-14 flex items-center justify-center rounded-full mb-3 shadow ${item.iconBg}`}>
          {item.icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
        <p className="text-gray-700 text-center">{item.desc}</p>
      </div>
    ))}
  </div>
);

  // Renderiza instrucciones para cada sección (puedes reemplazar por componentes reales)
  const renderSeccion = () => {
    switch (seccion) {
      case "busqueda":
        return (
          <div className="bg-gray-800 rounded-xl shadow p-6 mt-6">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Subir lugar de búsqueda y datos encontrados</h3>
            <p className="text-gray-300 mb-2">Aquí podrás registrar un nuevo lugar de búsqueda, subir imágenes y detallar los hallazgos.</p>
            {/* Aquí iría el formulario real */}
            <button className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setSeccion(null)}>Volver</button>
          </div>
        );
      case "persona":
        return (
          <div className="bg-gray-800 rounded-xl shadow p-6 mt-6">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Subir persona desaparecida o no localizada</h3>
            <p className="text-gray-300 mb-2">Completa los datos de la persona y sube una foto clara.</p>
            {/* Aquí iría el formulario real */}
            <button className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setSeccion(null)}>Volver</button>
          </div>
        );
      case "coincidencias":
        return (
          <div className="bg-gray-800 rounded-xl shadow p-6 mt-6">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Buscar coincidencias</h3>
            <p className="text-gray-300 mb-2">Sube una imagen o datos para buscar coincidencias (simulado).</p>
            {/* Aquí iría el formulario real */}
            <button className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setSeccion(null)}>Volver</button>
          </div>
        );
      case "localizada":
        return (
          <div className="bg-gray-800 rounded-xl shadow p-6 mt-6">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Persona localizada</h3>
            <p className="text-gray-300 mb-2">Busca por ID y elimina registros de personas localizadas.</p>
            {/* Aquí iría el formulario real */}
            <button className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setSeccion(null)}>Volver</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-2 py-8">
        <div className="max-w-5xl mx-auto">
          {renderDatosAsociacion()}
          {seccion ? renderSeccion() : renderMenu()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;