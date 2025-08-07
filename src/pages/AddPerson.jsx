import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddPerson = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    imagen: null,
    edadDesaparicion: "",
    edadActual: "",
    lugarNacimiento: "",
    sexo: "",
    nacionalidad: "",
    hablaEspanol: "",
    lenguaIndigena: "",
    discapacidad: "",
    fechaHechos: "",
    fechaPercato: "",
    lugarHechos: "",
    caracteristicasFisicas: "",
    senasParticulares: "",
    prendasVestir: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      const file = files[0];
      setForm({ ...form, imagen: file });
      if (file) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview(null);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDialog(true);
  };

  const handleDialogClose = () => {
  setShowDialog(false);
  navigate("/dashboard");
};

  const [paises, setPaises] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then(res => res.json())
      .then(data => {
        // Ordena alfabéticamente por nombre común
        const lista = data
          .map(p => p.name.common)
          .sort((a, b) => a.localeCompare(b));
        setPaises(lista);
      });
  }, []);

  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-white">
      <div className="flex justify-center py-8 px-2">
        <div className="w-full max-w-2xl bg-gray-50 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
            Subir persona desaparecida o no localizada
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-2">Fotografía de la persona</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  name="imagen"
                  accept="image/*"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                  required
                />
                {preview && (
                  <img src={preview} alt="Vista previa" className="w-20 h-20 rounded-full object-cover" />
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Edad al momento de la desaparición</label>
                <input
                  type="number"
                  name="edadDesaparicion"
                  min={0}
                  className="w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900"
                  value={form.edadDesaparicion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Edad actual</label>
                <input
                  type="number"
                  name="edadActual"
                  min={0}
                  className="w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900"
                  value={form.edadActual}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Lugar de nacimiento</label>
                <input
                  type="text"
                  name="lugarNacimiento"
                  className="w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900"
                  value={form.lugarNacimiento}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Sexo</label>
                <select
                  name="sexo"
                  className="w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900"
                  value={form.sexo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Nacionalidad</label>
                <select
                    name="nacionalidad"
                    className="w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900"
                    value={form.nacionalidad}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona</option>
                    {paises.map(pais => (
                    <option key={pais} value={pais}>{pais}</option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">¿Habla español?</label>
                <select
                  name="hablaEspanol"
                  className="w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900"
                  value={form.hablaEspanol}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Idioma o lengua indígena</label>
                <input
                  type="text"
                  name="lenguaIndigena"
                  className="w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900"
                  value={form.lenguaIndigena}
                  onChange={handleChange}
                  placeholder="Ejemplo: Náhuatl, Maya, etc."
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Discapacidad</label>
                <input
                  type="text"
                  name="discapacidad"
                  className="w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900"
                  value={form.discapacidad}
                  onChange={handleChange}
                  placeholder="Ejemplo: Visual, auditiva, motriz, etc."
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Fecha de hechos</label>
                <input
                  type="date"
                  name="fechaHechos"
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-700 focus:border-pink-500 outline-none"
                  value={form.fechaHechos}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Fecha de percato</label>
                <input
                  type="date"
                  name="fechaPercato"
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-700 focus:border-pink-500 outline-none"
                  value={form.fechaPercato}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Lugar de los hechos</label>
                <input
                  type="text"
                  name="lugarHechos"
                  className="w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900"
                  value={form.lugarHechos}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Características físicas</label>
                <textarea
                  name="caracteristicasFisicas"
                  className="w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900 resize-none"
                  value={form.caracteristicasFisicas}
                  onChange={handleChange}
                  rows={2}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Señas particulares</label>
                <textarea
                  name="senasParticulares"
                  className="w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900 resize-none"
                  value={form.senasParticulares}
                  onChange={handleChange}
                  rows={2}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Prendas de vestir</label>
                <textarea
                  name="prendasVestir"
                  className="w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900 resize-none"
                  value={form.prendasVestir}
                  onChange={handleChange}
                  rows={2}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded transition"
              >
                Guardar ficha
              </button>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded transition"
                onClick={() => navigate("/dashboard")}
              >
                Cancelar
              </button>
            </div>
          </form>
          {showDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full text-center">
                <h3 className="text-xl font-bold text-pink-600 mb-4">¡Ficha registrada!</h3>
                <p className="text-gray-700 mb-6">
                    La ficha de persona desaparecida ha sido registrada correctamente.
                </p>
                <button
                    className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded transition"
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
    </div>
  );
};

export default AddPerson;
