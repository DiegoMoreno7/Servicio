import React, { useState } from "react";
import { FaSearch, FaCheck } from "react-icons/fa";
import Navbar from "../components/Navbar";

// Simulación de registros de personas localizadas con datos completos
const registrosSimulados = [
  {
    id: "A001",
    nombre: "Juan Pérez",
    estado: "CDMX",
    edadDesaparicion: 25,
    edadActual: 26,
    lugarNacimiento: "Puebla",
    sexo: "Masculino",
    nacionalidad: "Mexicana",
    hablaEspanol: "Sí",
    lenguaIndigena: "No aplica",
    discapacidad: "Ninguna",
    fechaHechos: "2024-04-15",
    fechaPercato: "2024-04-16",
    lugarHechos: "Colonia Roma, CDMX",
    caracteristicasFisicas: "Cabello castaño, ojos cafés, 1.75m de altura.",
    senasParticulares: "Tatuaje de un ancla en el brazo izquierdo.",
    prendasVestir: "Pantalón de mezclilla azul, playera negra y tenis blancos.",
    imagenUrl: "https://img.freepik.com/foto-gratis/hombre-tiro-medio-peinado-afro_23-2150677136.jpg",
  },
  {
    id: "A002",
    nombre: "María López",
    estado: "Jalisco",
    edadDesaparicion: 19,
    edadActual: 19,
    lugarNacimiento: "Guadalajara",
    sexo: "Femenino",
    nacionalidad: "Mexicana",
    hablaEspanol: "Sí",
    lenguaIndigena: "No aplica",
    discapacidad: "Ninguna",
    fechaHechos: "2024-05-20",
    fechaPercato: "2024-05-21",
    lugarHechos: "Zapopan, Jalisco",
    caracteristicasFisicas: "Cabello negro largo, ojos verdes, 1.60m de altura.",
    senasParticulares: "Cicatriz en la ceja derecha.",
    prendasVestir: "Vestido floreado, sandalias.",
    imagenUrl: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uYXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "A003",
    nombre: "Carlos Ruiz",
    estado: "Edo. Mex.",
    edadDesaparicion: 35,
    edadActual: 35,
    lugarNacimiento: "Toluca",
    sexo: "Masculino",
    nacionalidad: "Mexicana",
    hablaEspanol: "Sí",
    lenguaIndigena: "No aplica",
    discapacidad: "Auditiva",
    fechaHechos: "2024-06-25",
    fechaPercato: "2024-06-26",
    lugarHechos: "Naucalpan, Estado de México",
    caracteristicasFisicas: "Calvo, barba de candado, 1.80m de altura.",
    senasParticulares: "Lunar en la mejilla izquierda.",
    prendasVestir: "Traje sastre gris, zapatos negros.",
    imagenUrl: "https://portalerp.com/images/2022/07/26/ruben-belluomo-gerente-comercial-de-infor-cono-surjpeg.jpeg",
  },
];

const Localizada = () => {
  const [busqueda, setBusqueda] = useState("");
  const [registros, setRegistros] = useState(registrosSimulados);
  const [modalVisible, setModalVisible] = useState(false);
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
  const [filaExpandida, setFilaExpandida] = useState(null);

  const handleBuscar = () => {
    if (!busqueda) {
      setRegistros(registrosSimulados);
      return;
    }
    setRegistros(
      registrosSimulados.filter(
        r =>
          r.id.toLowerCase().includes(busqueda.toLowerCase()) ||
          r.nombre.toLowerCase().includes(busqueda.toLowerCase())
      )
    );
  };

  const handleFilaClick = (id) => {
    setFilaExpandida(filaExpandida === id ? null : id);
  };

  const handleLocalizadaClick = (persona) => {
    setPersonaSeleccionada(persona);
    setModalVisible(true);
  };

  const confirmarLocalizada = () => {
    if (personaSeleccionada) {
      setRegistros(registros.filter(r => r.id !== personaSeleccionada.id));
      setModalVisible(false);
      setPersonaSeleccionada(null);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white px-2 py-8">
        {modalVisible && personaSeleccionada && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-bold mb-4">Confirmar Localización</h3>
              <p className="mb-4">¿Estás seguro de que deseas marcar a la siguiente persona como localizada? Esta acción la eliminará de la lista.</p>
              <div className="my-4 p-4 bg-gray-100 rounded-lg text-left inline-block">
                <p><strong>ID:</strong> {personaSeleccionada.id}</p>
                <p><strong>Nombre:</strong> {personaSeleccionada.nombre}</p>
                <p><strong>Fecha de desaparición:</strong> {personaSeleccionada.fechaHechos}</p>
                <p><strong>Lugar de desaparición:</strong> {personaSeleccionada.lugarHechos}</p>
                <p><strong>Características físicas:</strong> {personaSeleccionada.caracteristicasFisicas}</p>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                  onClick={confirmarLocalizada}
                >
                  Localizada
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                  onClick={() => setModalVisible(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-yellow-700 mb-8 text-center">Personas no Localizadas</h2>
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
              <input
                type="text"
                placeholder="Buscar por ID o nombre"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="w-full md:w-2/3 px-4 py-2 rounded border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition"
                onClick={handleBuscar}
              >
                <FaSearch /> Buscar
              </button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Foto</th>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Nombre</th>
                  <th className="py-2 px-4 border-b">Fecha de Desaparición</th>
                  <th className="py-2 px-4 border-b">Lugar de Desaparición</th>
                  <th className="py-2 px-4 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {registros.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">
                      No se encontraron registros.
                    </td>
                  </tr>
                ) : (
                  registros.map(r => (
                    <React.Fragment key={r.id}>
                      <tr
                        className="hover:bg-yellow-100 cursor-pointer"
                        onClick={() => handleFilaClick(r.id)}
                      >
                        <td className="py-2 px-4 border-b">
                          <img src={`${r.imagenUrl}?${r.id}`} alt={r.nombre} className="w-12 h-12 rounded-full object-cover" />
                        </td>
                        <td className="py-2 px-4 border-b">{r.id}</td>
                        <td className="py-2 px-4 border-b">{r.nombre}</td>
                        <td className="py-2 px-4 border-b">{r.fechaHechos}</td>
                        <td className="py-2 px-4 border-b">{r.lugarHechos}</td>
                        <td className="py-2 px-4 border-b">
                          <button
                            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
                            onClick={(e) => {
                              e.stopPropagation(); // Evita que el click se propague a la fila
                              handleLocalizadaClick(r);
                            }}
                          >
                            <FaCheck /> Localizada
                          </button>
                        </td>
                      </tr>
                      {filaExpandida === r.id && (
                        <tr className="bg-yellow-50">
                          <td colSpan="6" className="p-4">
                            <div className="bg-white p-6 rounded-lg shadow-md flex gap-6">
                              <img src={`${r.imagenUrl}?${r.id}`} alt={r.nombre} className="w-40 h-40 rounded-lg object-cover" />
                              <div className="flex-grow">
                                <h4 className="text-xl font-bold text-yellow-800 mb-4">
                                  Ficha de Localización - {r.nombre}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                  <p><strong>Edad desaparición:</strong> {r.edadDesaparicion}</p>
                                <p><strong>Edad actual:</strong> {r.edadActual}</p>
                                <p><strong>Lugar de nacimiento:</strong> {r.lugarNacimiento}</p>
                                <p><strong>Sexo:</strong> {r.sexo}</p>
                                <p><strong>Nacionalidad:</strong> {r.nacionalidad}</p>
                                <p><strong>Habla español:</strong> {r.hablaEspanol}</p>
                                <p><strong>Lengua indígena:</strong> {r.lenguaIndigena}</p>
                                <p><strong>Discapacidad:</strong> {r.discapacidad}</p>
                                <p><strong>Fecha de hechos:</strong> {r.fechaHechos}</p>
                                <p><strong>Fecha de percato:</strong> {r.fechaPercato}</p>
                                <p className="md:col-span-2"><strong>Lugar de hechos:</strong> {r.lugarHechos}</p>
                                <div className="md:col-span-3">
                                  <p><strong>Características físicas:</strong></p>
                                  <p className="pl-2">{r.caracteristicasFisicas}</p>
                                </div>
                                <div className="md:col-span-3">
                                  <p><strong>Señas particulares:</strong></p>
                                  <p className="pl-2">{r.senasParticulares}</p>
                                </div>
                                <div className="md:col-span-3">
                                  <p><strong>Prendas de vestir:</strong></p>
                                  <p className="pl-2">{r.prendasVestir}</p>
                                </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Localizada;
