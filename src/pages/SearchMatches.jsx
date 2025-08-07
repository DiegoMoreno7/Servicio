import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaSearch, FaTshirt, FaCamera } from "react-icons/fa";

const evidenciasSimuladas = [
  {
    id: 1,
    descripcion: "Camisa azul con rayas blancas encontrada en parque central",
    imagen: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=facearea&w=256&q=80",
    lugar: "Parque Central, CDMX",
    fecha: "2024-06-10",
  },
  {
    id: 2,
    descripcion: "Zapato deportivo rojo hallado en zona industrial",
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lugar: "Zona Industrial, Jalisco",
    fecha: "2024-06-15",
  },
  {
    id: 3,
    descripcion: "Gorra negra con logo blanca encontrada cerca del río",
    imagen: "https://static.caphunters.com/34614-large_default/gorra-curva-negra-ajustable-para-mujer-9forty-essential-de-new-york-yankees-mlb-de-new-era.webp",
    lugar: "Río Santa Catarina, Nuevo León",
    fecha: "2024-07-01",
  },
];

const SearchMatches = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    setFile(archivo);
    if (archivo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(archivo);
    } else {
      setPreview(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de búsqueda: filtra por descripción
    setTimeout(() => {
      let filtered = evidenciasSimuladas;
      if (query) {
        filtered = filtered.filter(e =>
          e.descripcion.toLowerCase().includes(query.toLowerCase())
        );
      }
      setResults(filtered);
      setLoading(false);
    }, 1200);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <div className="flex justify-center py-8 px-2">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center flex items-center justify-center gap-2">
              <FaSearch /> Buscar evidencia en lugares de búsqueda
            </h2>
            <form className="space-y-5" onSubmit={handleSearch}>
              <div>
                <label className="block text-gray-700 mb-1 flex items-center gap-2">
                  <FaCamera /> Sube una imagen de la prenda o evidencia
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900"
                  onChange={handleFileChange}
                />
                {preview && (
                  <div className="mt-3 flex justify-center">
                    <img
                      src={preview}
                      alt="Imagen subida"
                      className="w-32 h-32 object-cover rounded border border-green-300 shadow"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1 flex items-center gap-2">
                  <FaTshirt /> Descripción de la prenda o evidencia
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Ejemplo: camisa azul, zapato rojo, gorra negra..."
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition w-full"
                disabled={loading}
              >
                {loading ? "Buscando..." : "Buscar coincidencias"}
              </button>
            </form>
            {results.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-green-600 mb-4">Evidencias encontradas:</h3>
                <div className="grid gap-4">
                  {results.map((e) => (
                    <div key={e.id} className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center gap-4 shadow">
                      <img src={e.imagen} alt={e.descripcion} className="w-16 h-16 rounded object-cover border border-green-200" />
                      <div>
                        <div className="font-semibold text-gray-800">{e.descripcion}</div>
                        <div className="text-gray-600 text-sm">Lugar: {e.lugar}</div>
                        <div className="text-gray-500 text-xs">Fecha: {e.fecha}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {results.length === 0 && !loading && (
              <div className="mt-8 text-center text-gray-500">
                No se encontraron coincidencias.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMatches;