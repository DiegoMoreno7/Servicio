import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="relative min-h-screen flex flex-col justify-between bg-gray-900">
    {/* Imagen de fondo tenue */}
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage:
          "url('https://imagenes.elpais.com/resizer/v2/IMJZ42UCZAFDME77FTMJLBDODA.jpg?auth=62bfbb6a4ece544cfecee6544d339cc71f24687c8986db8bc4f80b40fead7f2c&width=414')", // Cambia la URL por una imagen relevante
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.25,
      }}
      aria-hidden="true"
    />

    {/* Contenido central */}
    <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-6">
        Juntos podemos encontrarlos
      </h1>
      <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-xl mx-auto">
        Plataforma social dedicada a la búsqueda de personas desaparecidas en México. Un espacio seguro, ético y profesional para unir esfuerzos y esperanza.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/auth"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/auth"
          className="px-6 py-3 bg-white hover:bg-gray-100 text-blue-700 rounded-lg font-semibold shadow transition"
        >
          Registrarse
        </Link>
      </div>
    </main>

    {/* Pie de página */}
    <footer className="relative z-10 bg-gray-900 bg-opacity-80 text-gray-300 text-sm py-4 px-4 flex flex-col md:flex-row justify-between items-center">
      <div>&copy; {new Date().getFullYear()}</div>
      <div className="flex gap-4 mt-2 md:mt-0">
        <Link to="/acerca" className="hover:underline">
          Acerca de
        </Link>
        <Link to="/contacto" className="hover:underline">
          Contacto
        </Link>
        <Link to="/privacidad" className="hover:underline">
          Privacidad
        </Link>
      </div>
    </footer>
  </div>
);

export default Home;