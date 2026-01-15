import React, { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Inicio = ({ setVistaActual }) => {
  // Poner imagenes para el slider del hero
  const imagenes = [
    "https://images.unsplash.com/photo-1614165936126-2ed18e471b10?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1600986606216-2db67f0bafe2?auto=format&fit=crop&q=80&w=1600",
  ];

  const [index, setIndex] = useState(0);

  const siguiente = () =>
    setIndex((i) => (i + 1) % imagenes.length);

  const anterior = () =>
    setIndex((i) => (i - 1 + imagenes.length) % imagenes.length);

  // Auto slider
  useEffect(() => {
    const interval = setInterval(siguiente, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        {/* Fondo con slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 opacity-40"
          >
            <img
              src={imagenes[index]}
              className="w-full h-full object-cover"
              alt="FG Store background"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>

        {/* Flecha izquierda */}
        <button
          onClick={anterior}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur border border-white/10 transition"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Flecha derecha */}
        <button
          onClick={siguiente}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur border border-white/10 transition"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Contenido */}
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 lg:flex lg:items-center z-10">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider mb-6">
              Nuevos modelos 2024
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Coleccionismo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Sin Límites.
              </span>
            </h1>

            <p className="text-slate-300 text-lg mb-8 max-w-lg">
              Especialistas en modelos a escala 1:12 y 1:18. La mejor calidad de
              Maisto, Bburago y Tamiya directamente a tu vitrina.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setVistaActual("catalogo")}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/20 cursor-pointer"
              >
                Ver Catálogo <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setVistaActual("contacto")}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all border border-white/10 cursor-pointer"
              >
                Contáctanos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BENEFICIOS */}
      <div className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-bold text-xl text-slate-900">
              Envíos a todo el Ecuador
            </h3>
            <p className="text-slate-500 text-sm">
              Por Servientrega o Cooperativas de transporte
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xl text-slate-900">Pagos Seguros</h3>
            <p className="text-slate-500 text-sm">
              Depósitos, transferencias o pagos en efectivo (contraentrega)
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xl text-slate-900">
              Calidad Garantizada
            </h3>
            <p className="text-slate-500 text-sm">
              Productos originales y réplicas con acabados de alta calidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

  export default Inicio;
