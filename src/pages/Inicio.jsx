import React, { useState, useEffect } from "react";
import { 
  ArrowRight, ShoppingBag, Truck, CheckCircle, 
  Package, CreditCard, ExternalLink, MapPin, Clock, Navigation, MessageCircle
} from "lucide-react";
// 1. IMPORTAR HOOK DE NAVEGACIÓN
import { useNavigate } from "react-router-dom";
import {TikTokIcon, InstagramIcon, FacebookIcon} from "../components/SocialMediaIcons";
import { crearSlug } from '../helpers/slug';
import { Bike, CarFront, Flame, Settings } from "lucide-react";

// ===== UBICACIÓN Y HORARIO =====
const FOTO_LOCAL = "https://imagenes.fgstoreec.com/OTROS/local_f%C3%ADsico.jpg";
const LINK_MAPA = "https://maps.app.goo.gl/9dk6tMF17Qkc4ydg8";

// dias: 0 = domingo ... 6 = sábado
const HORARIOS = [
  { etiqueta: "Lunes a Viernes", horas: "9:00 am - 6:00 pm", dias: [1, 2, 3, 4, 5] },
  { etiqueta: "Sábados", horas: "10:00 am - 5:00 pm", dias: [6] },
  { etiqueta: "Domingos", horas: "Sin atención", dias: [0], cerrado: true },
];

// Calcula día y si está abierto, usando la hora de Ecuador sin importar dónde esté el visitante
const calcularEstadoLocal = () => {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Guayaquil",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const get = (tipo) => partes.find((p) => p.type === tipo)?.value;
  const mapaDias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const dia = mapaDias[get("weekday")];
  const minutos = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);

  let abierto = false;
  if (dia >= 1 && dia <= 5) abierto = minutos >= 9 * 60 && minutos < 18 * 60;
  else if (dia === 6) abierto = minutos >= 10 * 60 && minutos < 17 * 60;

  return { dia, abierto };
};

const Inicio = ({ productos, agregarAlCarrito, onSelectProducto }) => {
  // 2. INICIALIZAR HOOK
  const navigate = useNavigate();

  // Estado abierto/cerrado (se actualiza cada minuto)
  const [estadoLocal, setEstadoLocal] = useState(calcularEstadoLocal);
  useEffect(() => {
    const id = setInterval(() => setEstadoLocal(calcularEstadoLocal()), 60000);
    return () => clearInterval(id);
  }, []);
  
  const imagenFondo = "https://imagenes.fgstoreec.com/OTROS/portada_principal.jpg";

  return (
    <div className="font-sans text-slate-900 bg-white">
      
      <style>{`
        @keyframes logo-pulse {
          0%, 100% { filter: grayscale(100%); opacity: 0.6; transform: scale(1); }
          50% { filter: grayscale(0%); opacity: 1; transform: scale(1.1); }
        }
        .logo-pulse {
          animation: logo-pulse 3s infinite ease-in-out;
        }

        @keyframes store-bar-fade-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes store-bar-slide-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes store-bar-slide-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes store-bar-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .store-bar-container {
          animation: store-bar-fade-in 0.6s ease-out both;
        }
        .store-bar-title {
          animation: store-bar-slide-left 0.7s ease-out 0.1s both;
        }
        .store-bar-details {
          animation: store-bar-slide-left 0.7s ease-out 0.2s both;
        }
        .store-bar-btn {
          animation: store-bar-slide-right 0.7s ease-out 0.3s both;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .store-bar-btn:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 8px 24px rgba(220, 38, 38, 0.35);
        }
        .store-bar-btn:active {
          transform: translateY(0) scale(0.98);
        }
        .store-live-dot {
          animation: store-bar-pulse-dot 1.8s ease-in-out infinite;
        }
      `}</style>

{/* ===================== HERO SECTION ===================== */}
      <div className="relative w-full min-h-[650px] md:min-h-[650px] py-16 md:py-20 bg-slate-900 overflow-hidden flex items-center">
        <div className="absolute inset-0">
          {/* Fondo oscuro ligeramente aumentado para que resalte más el texto y las tarjetas */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img src={imagenFondo} className="w-full h-full object-cover object-center" alt="Fondo" />
        </div>
        
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-4 md:mb-4 drop-shadow-xl uppercase tracking-tight">
              FGSTOREEC
            </h1>
            <p className="text-white text-lg md:text-2xl font-bold mb-3 drop-shadow-md">
              Descubre nuestra variedad de motos a escala y varios productos más.
            </p>
            <p className="text-slate-200 text-sm md:text-xl font-medium tracking-wide uppercase drop-shadow-md mb-8">
              QUITO - ECUADOR
            </p>

            {/* ===== NUEVAS TARJETAS DE INFORMACIÓN (Pagos y WhatsApp) ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4">
              
              {/* Tarjeta de Pagos */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <CreditCard className="text-blue-300 w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-white font-bold text-base md:text-lg">¡Aceptamos Tarjetas!</h3>
                  </div>
                  <p className="text-slate-200 text-xs md:text-sm leading-relaxed mb-4">
                    Paga con <strong>Tarjeta de Crédito o Débito</strong> mediante link de cobro seguro desde la App de Banco Guayaquil.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-white/20 border border-white/10 rounded-md text-[10px] md:text-xs text-white font-black tracking-wider shadow-sm">AMERICAN EXPRESS</span>
                  <span className="px-2.5 py-1 bg-white/20 border border-white/10 rounded-md text-[10px] md:text-xs text-white font-black tracking-wider shadow-sm">VISA</span>
                  <span className="px-2.5 py-1 bg-white/20 border border-white/10 rounded-md text-[10px] md:text-xs text-white font-black tracking-wider shadow-sm">MASTERCARD</span>
                </div>
              </div>

              {/* Tarjeta de WhatsApp */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="p-2 bg-[#25D366]/20 rounded-lg">
                      <MessageCircle className="text-[#25D366] w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-white font-bold text-base md:text-lg">Atención al Cliente</h3>
                  </div>
                  <p className="text-slate-200 text-xs md:text-sm leading-relaxed mb-4">
                    Estamos receptando tus pedidos 24/7 en WhatsApp.
                  </p>
                </div>
                <a 
                  href="https://wa.me/593958866618" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd57] text-white px-4 py-3 md:py-3.5 rounded-xl font-extrabold text-sm md:text-base shadow-lg hover:shadow-[#25D366]/30 transition-all active:scale-95"
                >
                  <MessageCircle size={20} className="md:w-6 md:h-6" /> Escríbenos
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

{/* ===================== UBICACIÓN Y HORARIO ===================== */}
      <section className="store-bar-container bg-slate-50 border-y border-slate-200 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Título centrado (Estilo Catálogo / Productos Destacados) */}
          <div className="mb-10 md:mb-14 text-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Ubicación y Horario
            </h2>
            <div className="flex justify-center mb-4">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                  estadoLocal.abierto
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                <span
                  className={`store-live-dot w-2 h-2 rounded-full ${
                    estadoLocal.abierto ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                {estadoLocal.abierto ? "Abierto ahora" : "Cerrado ahora"}
              </span>
            </div>
          </div>

          {/* Contenido (Foto + Info) - Se eliminó max-w-5xl para ocupar todo el ancho */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start w-full">

            {/* Foto del local */}
            <div className="store-bar-title group relative block overflow-hidden rounded-3xl shadow-lg aspect-[4/3] lg:aspect-auto lg:h-[420px] bg-slate-200 border border-slate-200">
              <img
                src={FOTO_LOCAL}
                alt="Local de FGSTOREEC en Quito"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {/* Etiqueta centrada sobre la foto */}
              <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-slate-800 shadow-sm">
                  <MapPin size={16} className="text-red-600" />
                  Quito, Ecuador
                </div>
              </div>
            </div>

            {/* Información y Horarios */}
            <div className="store-bar-details flex flex-col items-center lg:items-start text-center lg:text-left w-full">
              
              {/* Tarjeta de Dirección */}
              <div className="w-full bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 mb-5 lg:mb-6">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                  <div className="p-3 bg-red-50 rounded-xl flex-shrink-0">
                    <MapPin size={24} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-slate-900">Dirección</h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      Venezuela y Galápagos, Quito
                    </p>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed mt-1">
                      A pocos pasos de la Iglesia Basílica del Voto Nacional.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjeta de Horarios */}
              <div className="w-full bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                  <div className="p-3 bg-red-50 rounded-xl flex-shrink-0 mb-2 lg:mb-0">
                    <Clock size={24} className="text-red-600" />
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-lg mb-4 text-slate-900">Horarios de atención</h3>
                    <ul className="space-y-3 w-full">
                      {HORARIOS.map((h) => {
                        const esHoy = h.dias.includes(estadoLocal.dia);
                        return (
                          <li
                            key={h.etiqueta}
                            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm md:text-base transition-colors ${
                              esHoy ? "bg-slate-50 border border-slate-200 shadow-sm" : ""
                            }`}
                          >
                            <span className={`font-semibold flex items-center gap-2 ${esHoy ? "text-slate-900" : "text-slate-600"}`}>
                              {h.etiqueta}
                              {esHoy && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                                  Hoy
                                </span>
                              )}
                            </span>
                            <span className={h.cerrado ? "text-red-500 font-semibold" : "text-slate-700"}>
                              {h.horas}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Botón Único Turquesa */}
              <a
                href={LINK_MAPA}
                target="_blank"
                rel="noopener noreferrer"
                className="store-bar-btn inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-bold text-sm md:text-base shadow-lg hover:shadow-teal-500/30 w-full sm:w-auto transition-all"
              >
                <Navigation size={18} /> Ver ubicación en Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== REDES SOCIALES ===================== */}
      <div className="relative bg-gradient-to-b from-white to-slate-50 border-y border-slate-200">
        <div className="relative max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-12 md:py-16">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-1">
              Síguenos en nuestras redes oficiales
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              No te pierdas nuestras últimas novedades y ofertas exclusivas
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
            {/* TikTok */}
            <a href="https://www.tiktok.com/@fgstoreec" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4 bg-black text-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-98 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className="relative bg-white/15 backdrop-blur-sm p-2 rounded-lg flex-shrink-0 group-hover:bg-white/25 transition-colors">
                <TikTokIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="relative text-left flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Síguenos</p>
                <p className="font-bold text-sm sm:text-base truncate">+12k en TikTok</p>
              </div>
              <svg className="w-4 h-4 text-white/60 group-hover:text-white/90 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/fgstoreec" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-98 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className="relative bg-white/15 backdrop-blur-sm p-2 rounded-lg flex-shrink-0 group-hover:bg-white/25 transition-colors">
                <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="relative text-left flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-white/80 font-semibold uppercase tracking-wider mb-0.5">Novedades</p>
                <p className="font-bold text-sm sm:text-base truncate">+1k seguidores</p>
              </div>
              <svg className="w-4 h-4 text-white/60 group-hover:text-white/90 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/profile.php?id=100076773455049&locale=es_LA" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4 bg-[#1877F2] text-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-98 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className="relative bg-white/15 backdrop-blur-sm p-2 rounded-lg flex-shrink-0 group-hover:bg-white/25 transition-colors">
                <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="relative text-left flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-blue-100 font-semibold uppercase tracking-wider mb-0.5">Comunidad</p>
                <p className="font-bold text-sm sm:text-base truncate">Facebook</p>
              </div>
              <svg className="w-4 h-4 text-white/60 group-hover:text-white/90 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* ===================== PRODUCTOS DESTACADOS ===================== */}
      <section className="py-12 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Productos destacados
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {productos && productos.map((prod) => {
              const stock = prod.stock || 0;
              const isAgotado = stock === 0;
              const isUltimaUnidad = stock === 1;

              return (
                <div 
                  key={`${prod.categoria}-${prod.id}`} 
                  onClick={() => {
                    let rutaCategoria = 'otros';
                    if (prod.categoria === 'Motos') rutaCategoria = 'motos';
                    else if (prod.categoria === 'Autos') rutaCategoria = 'autos';
                    else if (prod.categoria === 'Hot Wheels') rutaCategoria = 'hotwheels';
                    else rutaCategoria = 'accesorios';
                    const slugUnico = `${crearSlug(prod.nombre)}-${prod.id}`;
                    navigate(`/producto/${rutaCategoria}/${slugUnico}`, { state: { fromInternal: true } });
                  }}
                  className="bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden group flex flex-col cursor-pointer"
                >
                  
                  {/* Contenedor de Imagen */}
                  <div className="relative h-40 sm:h-48 md:h-56 bg-slate-50 flex items-center justify-center p-4">
                    <img 
                      src={prod.imagenes?.principal}
                      alt={prod.nombre} 
                      className={`w-full h-full object-contain transition-transform duration-500 ${isAgotado ? '' : 'group-hover:scale-110'}`}
                    />
                  </div>

                  {/* Banners Dinámicos de Stock */}
                  {isUltimaUnidad && (
                    <div className="bg-[#fef08a] text-yellow-900 text-center text-[10px] md:text-xs font-bold py-1.5 border-y border-yellow-200">
                      Última unidad en stock
                    </div>
                  )}
                  {isAgotado && (
                    <div className="bg-[#c25953] text-white text-center text-[10px] md:text-xs font-bold py-1.5">
                      Agotado
                    </div>
                  )}

                  {/* Detalles y Textos */}
                  <div className="p-3 md:p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-1.5 md:mb-2 gap-1">
                      <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest truncate max-w-[60%] ${isAgotado ? 'text-slate-400' : 'text-slate-500'}`}>
                        {prod.marca || prod.categoria}
                      </span>
                      <span className={`text-[9px] md:text-[10px] font-bold whitespace-nowrap ${isAgotado ? 'text-slate-400' : 'text-[#2e7d32]'}`}>
                        {isAgotado ? 'Sin disponibilidad' : 'En stock'}
                      </span>
                    </div>

                    <h3 className={`font-bold text-xs sm:text-sm md:text-base leading-tight mb-3 md:mb-4 flex-1 line-clamp-2 ${isAgotado ? 'text-slate-400' : 'text-slate-900'}`}>
                      {prod.nombre}
                    </h3>

                    <div className="mt-auto">
                      <span className={`block text-lg md:text-2xl font-black mb-2 md:mb-3 ${isAgotado ? 'text-slate-400' : 'text-slate-900'}`}>
                        ${prod.precio.toFixed(2)}
                      </span>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isAgotado) agregarAlCarrito(prod);
                        }}
                        disabled={isAgotado}
                        className={`w-full flex items-center justify-center gap-2 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all
                          ${isAgotado 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                            : 'bg-[#0f172a] text-white hover:bg-slate-800 active:scale-95 shadow-md'
                          }
                        `}
                      >
                        <ShoppingBag size={16} className="md:w-4 md:h-4" /> Agregar al carrito
                      </button>
                    </div>
                  </div>
                </div>
              );
            })} 
          </div>

          {/* ===================== NUEVA SECCIÓN: CATÁLOGO COMPLETO ===================== */}
          <div className="mt-12 md:mt-24 border-t border-slate-200 pt-12 md:pt-16 text-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-3">Catálogo Completo</h2>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto text-sm md:text-base">Elige la categoría que más te apasione y descubre todo nuestro inventario.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto">
              <button onClick={() => navigate('/motos')} className="group flex flex-col items-center justify-center p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 active:scale-95 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -z-0 group-hover:scale-150 transition-transform duration-500"></div>
                {/* REEMPLAZO POR IMAGEN */}
                <img src="https://imagenes.fgstoreec.com/OTROS/logo_moto.png" alt="Motos" className="w-14 h-14 md:w-16 md:h-16 mb-3 relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform object-contain" style={{ imageRendering: 'high-quality' }}/>
                <span className="font-black text-slate-800 text-sm md:text-lg relative z-10 group-hover:text-blue-700">Motos a escala</span>
              </button>

              <button onClick={() => navigate('/autos')} className="group flex flex-col items-center justify-center p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 active:scale-95 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -z-0 group-hover:scale-150 transition-transform duration-500"></div>
                {/* REEMPLAZO POR IMAGEN */}
                <img src="https://imagenes.fgstoreec.com/OTROS/logo_auto.png" alt="Motos" className="w-14 h-14 md:w-16 md:h-16 mb-3 relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform object-contain" style={{ imageRendering: 'high-quality' }}/>
                <span className="font-black text-slate-800 text-sm md:text-lg relative z-10 group-hover:text-blue-700">Autos a escala</span>
              </button>

              <button onClick={() => navigate('/hotwheels')} className="group flex flex-col items-center justify-center p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 active:scale-95 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -z-0 group-hover:scale-150 transition-transform duration-500"></div>
                {/* REEMPLAZO POR IMAGEN */}
                <img src="https://imagenes.fgstoreec.com/OTROS/logo_hotwheels.png" alt="Motos" className="w-14 h-14 md:w-16 md:h-16 mb-3 relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform object-contain" style={{ imageRendering: 'high-quality' }}/>
                <span className="font-black text-slate-800 text-sm md:text-lg relative z-10 group-hover:text-blue-700">Hotwheels</span>
              </button>

              <button onClick={() => navigate('/accesorios')} className="group flex flex-col items-center justify-center p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 active:scale-95 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -z-0 group-hover:scale-150 transition-transform duration-500"></div>
                {/* REEMPLAZO POR IMAGEN */}
                <img src="https://imagenes.fgstoreec.com/OTROS/logo_hotwheels.png" alt="Motos" className="w-14 h-14 md:w-16 md:h-16 mb-3 relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform object-contain" style={{ imageRendering: 'high-quality' }}/>
                <span className="font-black text-slate-800 text-sm md:text-lg relative z-10 group-hover:text-blue-700">Accesorios</span>
              </button>
            </div>
          </div>
          {/* ========================================================================================= */}

        </div>
      </section>

      {/* ===================== BENEFICIOS ===================== */}
      <div className="bg-white py-12 md:py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: <Truck size={32} />, title: "Envíos a todo Ecuador", desc: "Mediante Servientrega o Cooperativas de Transporte" },
              { icon: <CheckCircle size={32} />, title: "Pagos Seguros", desc: "Aceptamos transferencias, depósitos, pagos en efectivo en nuestro local o contraentrega" },
              { icon: <Package size={32} />, title: "Calidad Garantizada", desc: "Productos de excelente calidad" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4">
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-slate-50 rounded-full text-slate-900">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg md:text-xl text-slate-900 mb-2 md:mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== PAGOS Y ENVÍOS ===================== */}
      <section className="py-12 md:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            
            {/* Columna 1: Bancos */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                  <CreditCard size={24} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">Métodos de Pago</h3>
              </div>
              <p className="text-slate-500 mb-6 md:mb-8 text-sm leading-relaxed">
                Aceptamos transferencias directas a las siguientes instituciones bancarias:
              </p>
              <div className="grid grid-cols-3 gap-4 md:gap-8 items-center justify-items-center">
                <img src="https://imagenes.fgstoreec.com/OTROS/logo_bpichincha.png" alt="Banco Pichincha" className="h-8 md:h-12 object-contain logo-pulse" style={{ animationDelay: '0s' }} />
                <img src="https://imagenes.fgstoreec.com/OTROS/logo_bg.png" alt="Banco Guayaquil" className="h-6 md:h-10 object-contain logo-pulse" style={{ animationDelay: '1s' }} />
                <img src="https://imagenes.fgstoreec.com/OTROS/logo_bpac%C3%ADfico.png" alt="Banco del Pacífico" className="h-6 md:h-8 object-contain logo-pulse" style={{ animationDelay: '2s' }} />
              </div>
            </div>

            {/* Columna 2: Servientrega */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-green-50 rounded-bl-full -z-0 group-hover:bg-green-100 transition" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="p-2 bg-green-600 text-white rounded-lg">
                    <Truck size={24} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900">Envíos Certificados</h3>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
                  <div className="w-24 md:w-32 flex-shrink-0">
                    <img src="https://imagenes.fgstoreec.com/OTROS/logo_servientrega.png" alt="Logo Servientrega" className="w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                      Realizamos envíos seguros. Si ya hiciste tu compra, puedes rastrear tu guía aquí:
                    </p>
                    <a href="https://www.servientrega.com.ec/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-green-700 font-bold text-sm hover:text-green-800 hover:underline">
                      Rastrear mi envío <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== REFERENCIAS ===================== */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 md:mb-6">Referencias de envíos</h2>
          <p className="text-slate-500 mb-8 md:mb-12 mx-auto max-w-1xl text-base md:text-lg">La satisfacción de nuestros clientes es nuestra prioridad. Estos son algunos de nuestros envíos realizados exitosamente.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
            {[
              "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2001.jpg",
              "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2002.jpg",
              "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2003.jpg",
              "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2004.jpg",
              "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2005.jpg",
            ].map((src, index) => (
              <div key={index} className={`bg-slate-100 rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition aspect-square relative group ${index === 0 ? "col-span-2 row-span-2" : ""}`}>
                <img src={src} alt={`Referencia ${index + 1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          <button 
            onClick={() => navigate('/envios')} 
            className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 md:px-12 py-3 md:py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-xl cursor-pointer text-sm md:text-base"
          >
            Ver mas referencias <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ===================== SOBRE NOSOTROS ===================== */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 md:mb-8">Sobre Nosotros</h2>
              <div className="space-y-4 md:space-y-6 text-slate-600 text-base md:text-lg leading-relaxed">
                <p>Desde 2023, nuestra pasión por las motos y el coleccionismo nos llevó a crear <strong className="text-slate-900 font-bold"> Fgstore</strong>, una tienda online especializada en motos, vehículos a escala, accesorios y más.</p>
                <p>Estamos comprometidos con ofrecer productos de alta calidad y una experiencia de compra segura.</p>
                <p>Enviamos desde Quito a todo el Ecuador.</p>
                <p className="font-bold text-slate-900 pt-2 md:pt-4 text-lg md:text-xl">¡Gracias por ser parte de nuestro crecimiento!</p>
              </div>
              <div className="mt-8 md:mt-12 grid grid-cols-2 gap-8 md:gap-12 border-t border-slate-200 pt-8 md:pt-12">
                <div><h4 className="text-3xl md:text-4xl font-black text-red-600">450+</h4><span className="text-slate-500 text-xs md:text-sm font-semibold uppercase tracking-wider block mt-2">Ventas Exitosas</span></div>
                <div><h4 className="text-3xl md:text-4xl font-black text-red-600">100%</h4><span className="text-slate-500 text-xs md:text-sm font-semibold uppercase tracking-wider block mt-2">Clientes Felices</span></div>
              </div>
            </div>
            <div className="relative">
              <img src="https://imagenes.fgstoreec.com/OTROS/sobre_nosotros.jpg" alt="FG Store colección" className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;