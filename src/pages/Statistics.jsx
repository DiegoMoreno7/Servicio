import React from "react";
import { FaUserAlt, FaCheckCircle, FaMapMarkerAlt, FaPercent, FaMedal, FaGlobeAmericas, FaChartPie, FaArrowUp, FaArrowDown, FaVenusMars, FaBirthdayCake } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import Navbar from "../components/Navbar";

const estadisticas = {
  personasDesaparecidas: 112345,
  personasLocalizadas: 54321,
  lugaresBusqueda: 1200,
  porEstado: [
    { estado: "CDMX", desaparecidas: 12000, localizadas: 6000 },
    { estado: "Jalisco", desaparecidas: 15000, localizadas: 7000 },
    { estado: "Edo. Mex.", desaparecidas: 18000, localizadas: 9000 },
    { estado: "Nuevo León", desaparecidas: 9000, localizadas: 4000 },
    { estado: "Veracruz", desaparecidas: 8000, localizadas: 3500 },
  ],
};

// Datos de ejemplo para edad y sexo
const estadisticasEdad = [
  { rango: "0-17", cantidad: 8000 },
  { rango: "18-30", cantidad: 25000 },
  { rango: "31-50", cantidad: 40000 },
  { rango: "51-70", cantidad: 30000 },
  { rango: "71+", cantidad: 9345 },
];

const estadisticasSexo = [
  { name: "Mujeres", value: 65000 },
  { name: "Hombres", value: 47400 },
];

const SEXO_COLORS = ["#a78bfa", "#fbbf24"];

const PieChartSexo = () => (
  <ResponsiveContainer width="100%" height={200}>
    <PieChart>
      <Pie
        data={estadisticasSexo}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={70}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
      >
        {estadisticasSexo.map((entry, index) => (
          <Cell key={`cell-sexo-${index}`} fill={SEXO_COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

const BarChartEdad = () => (
  <ResponsiveContainer width="100%" height={220}>
    <BarChart data={estadisticasEdad} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="rango" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="cantidad" fill="#6366f1" name="Personas desaparecidas" />
    </BarChart>
  </ResponsiveContainer>
);

const porcentajeLocalizadas = ((estadisticas.personasLocalizadas / estadisticas.personasDesaparecidas) * 100).toFixed(2);

const estadoMasDesaparecidos = estadisticas.porEstado.reduce((max, curr) =>
  curr.desaparecidas > max.desaparecidas ? curr : max
);

const estadoMasLocalizados = estadisticas.porEstado.reduce((max, curr) =>
  curr.localizadas > max.localizadas ? curr : max
);

const estadoMenosDesaparecidos = estadisticas.porEstado.reduce((min, curr) =>
  curr.desaparecidas < min.desaparecidas ? curr : min
);

const estadoMenosLocalizados = estadisticas.porEstado.reduce((min, curr) =>
  curr.localizadas < min.localizadas ? curr : min
);

const estadosReportando = estadisticas.porEstado.length;

const promedioDesaparecidos = Math.round(
  estadisticas.porEstado.reduce((acc, curr) => acc + curr.desaparecidas, 0) / estadosReportando
);

const promedioLocalizados = Math.round(
  estadisticas.porEstado.reduce((acc, curr) => acc + curr.localizadas, 0) / estadosReportando
);

const estadoMayorPorcentajeLocalizacion = estadisticas.porEstado
  .map(e => ({
    ...e,
    porcentaje: e.localizadas / e.desaparecidas
  }))
  .reduce((max, curr) => curr.porcentaje > max.porcentaje ? curr : max);

const estadoMenorPorcentajeLocalizacion = estadisticas.porEstado
  .map(e => ({
    ...e,
    porcentaje: e.localizadas / e.desaparecidas
  }))
  .reduce((min, curr) => curr.porcentaje < min.porcentaje ? curr : min);

const pieData = [
  { name: "Desaparecidas", value: estadisticas.personasDesaparecidas, color: "#ec4899" },
  { name: "Localizadas", value: estadisticas.personasLocalizadas, color: "#22c55e" },
];

const COLORS = ["#ec4899", "#22c55e"];

const PieChartCustom = () => (
  <ResponsiveContainer width="100%" height={200}>
    <PieChart>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={70}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

const Statistics = () => (
<div>
  <Navbar />
  <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white px-2 py-8">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">Estadísticas Generales</h2>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaUserAlt className="text-4xl text-pink-500 mb-2" />
          <span className="text-2xl font-bold text-pink-700">{estadisticas.personasDesaparecidas.toLocaleString()}</span>
          <span className="text-gray-600 text-sm mt-1 text-center">Personas desaparecidas</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaCheckCircle className="text-4xl text-green-500 mb-2" />
          <span className="text-2xl font-bold text-green-700">{estadisticas.personasLocalizadas.toLocaleString()}</span>
          <span className="text-gray-600 text-sm mt-1 text-center">Personas localizadas</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaMapMarkerAlt className="text-4xl text-blue-500 mb-2" />
          <span className="text-2xl font-bold text-blue-700">{estadisticas.lugaresBusqueda.toLocaleString()}</span>
          <span className="text-gray-600 text-sm mt-1 text-center">Lugares de búsqueda</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaGlobeAmericas className="text-4xl text-purple-500 mb-2" />
          <span className="text-2xl font-bold text-purple-700">{estadosReportando}</span>
          <span className="text-gray-600 text-sm mt-1 text-center">Estados reportando</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaChartPie className="text-4xl text-pink-500 mb-2" />
          <span className="text-2xl font-bold text-pink-700">{promedioDesaparecidos.toLocaleString()}</span>
          <span className="text-gray-600 text-sm mt-1 text-center">Promedio desaparecidos/estado</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaChartPie className="text-4xl text-green-500 mb-2" />
          <span className="text-2xl font-bold text-green-700">{promedioLocalizados.toLocaleString()}</span>
          <span className="text-gray-600 text-sm mt-1 text-center">Promedio localizados/estado</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaPercent className="text-4xl text-purple-500 mb-2" />
          <span className="text-2xl font-bold text-purple-700">{porcentajeLocalizadas}%</span>
          <span className="text-gray-600 text-sm mt-1 text-center">Porcentaje de localización nacional</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaArrowUp className="text-3xl text-green-500 mb-2" />
          <span className="text-lg font-bold text-green-700">{estadoMayorPorcentajeLocalizacion.estado}</span>
          <span className="text-gray-600 text-sm mt-1 text-center">Mayor % localización</span>
          <span className="text-green-700 font-bold text-xl">{(estadoMayorPorcentajeLocalizacion.porcentaje * 100).toFixed(2)}%</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaArrowDown className="text-3xl text-pink-500 mb-2" />
          <span className="text-lg font-bold text-pink-700">{estadoMenorPorcentajeLocalizacion.estado}</span>
          <span className="text-gray-600 text-sm mt-1 text-center">Menor % localización</span>
          <span className="text-pink-700 font-bold text-xl">{(estadoMenorPorcentajeLocalizacion.porcentaje * 100).toFixed(2)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaMedal className="text-3xl text-pink-500 mb-2" />
          <span className="text-lg font-bold text-pink-700">{estadoMasDesaparecidos.estado}</span>
          <span className="text-gray-600 text-sm mt-1 text-center">Estado con más desaparecidos</span>
          <span className="text-pink-700 font-bold text-xl">{estadoMasDesaparecidos.desaparecidas.toLocaleString()}</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaMedal className="text-3xl text-green-500 mb-2" />
          <span className="text-lg font-bold text-green-700">{estadoMasLocalizados.estado}</span>
          <span className="text-gray-600 text-sm mt-1 text-center">Estado con más localizados</span>
          <span className="text-green-700 font-bold text-xl">{estadoMasLocalizados.localizadas.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaArrowDown className="text-3xl text-pink-500 mb-2" />
          <span className="text-lg font-bold text-pink-700">{estadoMenosDesaparecidos.estado}</span>
          <span className="text-gray-600 text-sm mt-1 text-center">Estado con menos desaparecidos</span>
          <span className="text-pink-700 font-bold text-xl">{estadoMenosDesaparecidos.desaparecidas.toLocaleString()}</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaArrowDown className="text-3xl text-green-500 mb-2" />
          <span className="text-lg font-bold text-green-700">{estadoMenosLocalizados.estado}</span>
          <span className="text-gray-600 text-sm mt-1 text-center">Estado con menos localizados</span>
          <span className="text-green-700 font-bold text-xl">{estadoMenosLocalizados.localizadas.toLocaleString()}</span>
        </div>
      </div>

      {/* Gráficas de edad y sexo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center mb-4">
            <FaBirthdayCake className="text-3xl text-indigo-500 mr-2" />
            <h4 className="text-lg font-semibold text-gray-700">Distribución por Edad</h4>
          </div>
          <BarChartEdad />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center mb-4">
            <FaVenusMars className="text-3xl text-yellow-500 mr-2" />
            <h4 className="text-lg font-semibold text-gray-700">Distribución por Sexo</h4>
          </div>
          <PieChartSexo />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">Proporción Desaparecidas vs Localizadas</h4>
        <PieChartCustom />
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">Desaparecidas y Localizadas por Estado</h4>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={estadisticas.porEstado} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="estado" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="desaparecidas" fill="#ec4899" name="Desaparecidas" />
            <Bar dataKey="localizadas" fill="#22c55e" name="Localizadas" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">Resumen por Estado</h4>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Estado</th>
              <th className="py-2 px-4 border-b text-pink-700">Desaparecidas</th>
              <th className="py-2 px-4 border-b text-green-700">Localizadas</th>
              <th className="py-2 px-4 border-b text-purple-700">% Localización</th>
            </tr>
          </thead>
          <tbody>
            {estadisticas.porEstado.map((row, idx) => (
              <tr key={idx} className="hover:bg-purple-50">
                <td className="py-2 px-4 border-b">{row.estado}</td>
                <td className="py-2 px-4 border-b text-pink-700 font-bold">{row.desaparecidas.toLocaleString()}</td>
                <td className="py-2 px-4 border-b text-green-700 font-bold">{row.localizadas.toLocaleString()}</td>
                <td className="py-2 px-4 border-b text-purple-700 font-bold">
                  {((row.localizadas / row.desaparecidas) * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
);

export default Statistics;