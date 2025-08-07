import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import Navbar from "../components/Navbar";

// Icono personalizado para el marcador
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Componente para manejar el marcador y actualizar dirección al hacer click
function LocationMarker({ setDireccion, position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDireccion(data.display_name || `${e.latlng.lat}, ${e.latlng.lng}`);
        });
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

// Componente para mover el mapa cuando cambia la posición
function MoveMapTo({ position }) {
  const map = useMap();
  React.useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);
  return null;
}

const SearchPlace = () => {
  const [direccion, setDireccion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [descripciones, setDescripciones] = useState([]);
  const [position, setPosition] = useState([19.4326, -99.1332]); // CDMX por defecto
  const navigate = useNavigate();
  const mapRef = useRef();

  // Cuando el usuario escribe una dirección y presiona Enter o sale del input
  const handleDireccionBlur = async () => {
    if (!direccion) return;
    // Geocodificación directa
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`
    );
    const data = await res.json();
    if (data && data[0]) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setPosition([lat, lon]);
    }
  };

  const handleImagenes = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setImagenes(files);
    setDescripciones(files.map(() => ""));
  };

  const handleDescripcion = (idx, value) => {
    const nuevas = [...descripciones];
    nuevas[idx] = value.slice(0, 300);
    setDescripciones(nuevas);
  };

  const eliminarImagen = (idx) => {
    const nuevasImgs = imagenes.filter((_, i) => i !== idx);
    const nuevasDescs = descripciones.filter((_, i) => i !== idx);
    setImagenes(nuevasImgs);
    setDescripciones(nuevasDescs);
  };

  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    navigate("/dashboard");
  };

  return (
    <div>
      <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-2 py-8">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">
          Subir lugar de búsqueda y datos encontrados
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Dirección y mapa */}
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Dirección exacta</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-gray-50 text-gray-700 border border-gray-300 focus:border-blue-500 outline-none"
              placeholder="Ejemplo: Calle Esperanza 123, CDMX"
              value={direccion}
              onChange={e => setDireccion(e.target.value)}
              onBlur={handleDireccionBlur}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleDireccionBlur();
                }
              }}
              required
            />
            <div style={{ height: 350, width: "100%", borderRadius: "0.75rem", border: "2px solid #2563eb", overflow: "hidden", marginTop: "0.75rem" }}>
              <MapContainer
                center={position}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
                whenCreated={mapInstance => (mapRef.current = mapInstance)}
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker setDireccion={setDireccion} position={position} setPosition={setPosition} />
                <MoveMapTo position={position} />
              </MapContainer>
            </div>
          </div>
          {/* Fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">Fecha de inicio</label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-700 focus:border-blue-500 outline-none"
                value={fechaInicio}
                onChange={e => setFechaInicio(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">Fecha de término</label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-700 focus:border-blue-500 outline-none"
                value={fechaFin}
                onChange={e => setFechaFin(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Imágenes y descripciones */}
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Imágenes encontradas (máx. 10)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="block w-full text-gray-700"
              onChange={handleImagenes}
              disabled={imagenes.length >= 10}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {imagenes.map((img, idx) => (
                <div key={idx} className="bg-gray-100 rounded p-3 flex flex-col gap-2 relative">
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                    onClick={() => eliminarImagen(idx)}
                    title="Eliminar imagen"
                  >
                    <FaTimes />
                  </button>
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Evidencia ${idx + 1}`}
                    className="rounded shadow max-h-32 object-contain mx-auto"
                  />
                  <textarea
                    className="w-full mt-2 px-2 py-1 rounded bg-gray-200 text-gray-700 border border-gray-700 focus:border-blue-500 outline-none"
                    placeholder="Descripción (máx. 100 caracteres)"
                    maxLength={100}
                    value={descripciones[idx]}
                    onChange={e => handleDescripcion(idx, e.target.value)}
                    required
                  />
                  <div className="text-xs text-gray-400 text-right">
                    {descripciones[idx]?.length || 0}/100 caracteres
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
            >
              Guardar búsqueda
            </button>
            <button
              type="button"
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded transition"
              onClick={() => navigate("/dashboard")}
            >
              Volver
            </button>
          </div>
        </form>
        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-50 rounded-lg p-8 shadow-lg max-w-md w-full text-center">
              <h3 className="text-xl font-bold text-blue-600 mb-4">¡Búsqueda registrada!</h3>
              <p className="text-gray-700 mb-6">
                Tu información ha sido enviada correctamente.<br />
                Gracias por tu colaboración humanitaria.
              </p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
                onClick={handleDialogClose}
              >
                Ir al dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default SearchPlace;