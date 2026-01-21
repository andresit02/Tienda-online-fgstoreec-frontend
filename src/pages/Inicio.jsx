import React, { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle, ShoppingBag, Truck, CheckCircle, Package, Users, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Inicio = ({ setVistaActual }) => {
  // Imágenes del slider (Hero)
  const imagenes = [
    "https://images.unsplash.com/photo-1614165936126-2ed18e471b10?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1600986606216-2db67f0bafe2?auto=format&fit=crop&q=80&w=1600",
  ];

  const [index, setIndex] = useState(0);

  const siguiente = () => setIndex((i) => (i + 1) % imagenes.length);
  const anterior = () => setIndex((i) => (i - 1 + imagenes.length) % imagenes.length);

  // Auto slider
  useEffect(() => {
    const interval = setInterval(siguiente, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in">
      
      {/* ===================== 1. HERO SECTION (Estilo V1) ===================== */}
      <div className="relative bg-slate-900 text-white overflow-hidden h-[85vh] md:h-[600px]">
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

        {/* Flechas de control */}
        <button onClick={anterior} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur border border-white/10 transition text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={siguiente} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur border border-white/10 transition text-white">
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Contenido Principal */}
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center z-10">
          <div className="lg:w-1/2 pt-16 md:pt-0">
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

      {/* ===================== 2. BENEFICIOS ===================== */}
      <div className="bg-white py-12 border-b border-slate-100 shadow-sm relative z-20 -mt-8 mx-4 md:mx-auto max-w-7xl rounded-xl">
        <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="py-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <Truck size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Envíos a todo el Ecuador</h3>
            <p className="text-slate-500 text-sm mt-2">Servientrega o Cooperativas</p>
          </div>
          <div className="py-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <CheckCircle size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Pagos Seguros</h3>
            <p className="text-slate-500 text-sm mt-2">Depósitos, transferencias o efectivo</p>
          </div>
          <div className="py-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <Package size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Calidad Garantizada</h3>
            <p className="text-slate-500 text-sm mt-2">Productos 100% originales</p>
          </div>
        </div>
      </div>

      {/* ===================== 3. CÓMO HACER UNA COMPRA (Contenido V2 mejorado) ===================== */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            ¿Cómo hacer una compra?
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
            Adquirir tu modelo favorito es muy sencillo. Sigue estos 4 pasos:
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Placeholder para cuando tengas la imagen real */}
          <div className="bg-slate-100 rounded-3xl h-80 flex items-center justify-center border-2 border-dashed border-slate-200">
             <div className="text-center text-slate-400">
                <ShoppingBag size={48} className="mx-auto mb-2 opacity-50"/>
                <span className="text-sm font-medium">Aquí irá tu imagen de "Pasos de Compra"</span>
             </div>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                    <h4 className="font-bold text-lg text-slate-900">Elige tus productos</h4>
                    <p className="text-slate-500">Navega por nuestro catálogo y selecciona los modelos que te interesan.</p>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                    <h4 className="font-bold text-lg text-slate-900">Toma una captura</h4>
                    <p className="text-slate-500">Haz una captura de pantalla del modelo o anota su nombre.</p>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                    <h4 className="font-bold text-lg text-slate-900">Escríbenos</h4>
                    <p className="text-slate-500">Contáctanos por WhatsApp para confirmar stock y detalles de pago.</p>
                </div>
            </div>

            <div className="mt-6 bg-green-50 p-6 rounded-2xl border border-green-100 flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-green-900 mb-1">
                  Chat Directo WhatsApp
                </h3>
                <p className="text-sm text-green-700 mb-3">
                  Te responderemos enseguida para coordinar tu envío.
                </p>
                <a 
                   href="https://wa.me/593958866618" 
                   target="_blank" 
                   rel="noreferrer"
                   className="inline-flex items-center gap-2 text-green-700 font-bold hover:underline cursor-pointer"
                >
                    0958 866 618 <ArrowRight size={16}/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 4. REFERENCIAS (Conexión con Pruebas.jsx) ===================== */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Referencias de envíos
          </h2>
          <p className="text-slate-500 mb-12 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra prioridad. Mira las pruebas de nuestros envíos seguros a nivel nacional.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((item) => (
                <div key={item} className="aspect-square bg-white rounded-2xl border border-slate-200 flex items-center justify-center shadow-sm hover:shadow-md transition">
                    <div className="text-center text-slate-300">
                        <Truck size={40} className="mx-auto mb-2"/>
                        <span className="text-xs font-bold uppercase">Foto Ref {item}</span>
                    </div>
                </div>
            ))}
          </div>
          
          <button 
            onClick={() => setVistaActual('pruebas')}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg cursor-pointer"
          >
            Ver Galería Completa <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ===================== 5. SOBRE NOSOTROS (Contenido V2) ===================== */}
      <section className="max-w-7xl mx-auto px-4 py-24 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6">
              Nuestra Historia
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
              Sobre <span className="text-red-600">FG Store</span>
            </h2>
            <div className="prose prose-slate text-slate-500">
                <p className="mb-4 text-lg">
                Desde 2023, nuestra pasión por los motores y el coleccionismo nos llevó a crear
                <strong> FG Store</strong>, un espacio dedicado a los amantes del detalle.
                </p>
                <p className="mb-6">
                Nos especializamos en conectar a coleccionistas con piezas únicas. Sabemos que no es solo un juguete, 
                es una pieza de ingeniería a escala.
                </p>
            </div>

            <div className="flex items-center gap-8 mt-8">
              <div>
                <p className="text-4xl font-black text-slate-900">450+</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Ventas Exitosas</p>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div>
                <p className="text-4xl font-black text-slate-900">100%</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Clientes Felices</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-100 rounded-2xl h-64 w-full flex items-center justify-center">
                <Users className="text-slate-300" size={48} />
             </div>
             <div className="space-y-4">
                <div className="bg-slate-100 rounded-2xl h-28 w-full flex items-center justify-center">
                    <Star className="text-slate-300" size={32} />
                </div>
                <div className="bg-slate-900 rounded-2xl h-32 w-full flex items-center justify-center p-6">
                    <p className="text-white text-center font-bold text-sm">"Pasión por el detalle a escala"</p>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;