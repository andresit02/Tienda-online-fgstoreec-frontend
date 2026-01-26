import React from "react";
import { 
  ArrowRight, ShoppingBag, Truck, CheckCircle, 
  Package, CreditCard, ExternalLink
} from "lucide-react";
// 1. IMPORTAR HOOK DE NAVEGACIÓN
import { useNavigate } from "react-router-dom";
import {TikTokIcon, InstagramIcon, FacebookIcon} from "../components/SocialMediaIcons";

const Inicio = ({ productos, agregarAlCarrito, onSelectProducto }) => {
  // 2. INICIALIZAR HOOK
  const navigate = useNavigate();
  
  const imagenFondo = "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769076545/imgi_32_bike_gajser_team-shoot_hondaracing_shotbybavo_2_d74wbu.jpg";

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
      `}</style>

      {/* ===================== HERO SECTION ===================== */}
      <div className="relative w-full h-[500px] md:h-[560px] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img src={imagenFondo} className="w-full h-full object-cover object-center" alt="Fondo" />
        </div>
        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl font-black text-white leading-tight mb-4 md:mb-6 drop-shadow-xl uppercase tracking-tight">
              FGSTOREEC
            </h1>
            <p className="text-white text-lg md:text-2xl font-bold mb-3 drop-shadow-md">
              Descubre nuestra variedad de motos a escala y varios productos más.
            </p>
            <p className="text-slate-200 text-base md:text-xl font-medium tracking-wide uppercase drop-shadow-md">
              QUITO - ECUADOR
            </p>
          </div>
        </div>
      </div>

      {/* ===================== REDES SOCIALES (Profesional & Optimizado) ===================== */}
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
                <p className="font-bold text-sm sm:text-base truncate">+11k en TikTok</p>
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
              const tieneStock = prod.stock > 0;

              return (
                <div 
                  key={`${prod.categoria}-${prod.id}`} 
                  // 3. CAMBIO: Usar navigate para ir a la ruta del producto
                  onClick={() => {
                    // onSelectProducto(prod); <-- Opcional si quieres mantener estado, pero con rutas es mejor navigate
                    let rutaCategoria = 'otros';
                    if (prod.categoria === 'Moto') rutaCategoria = 'motos';
                    else if (prod.categoria === 'Auto') rutaCategoria = 'autos';
                    else if (prod.categoria === 'Hot Wheels') rutaCategoria = 'hotwheels';
                    else rutaCategoria = 'accesorios';
                    
                    navigate(`/producto/${rutaCategoria}/${prod.id}`);
                  }}
                  className="bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group flex flex-col cursor-pointer"
                >
                  
                  <div className="relative h-36 sm:h-48 md:h-56 aspect-[4/3] bg-slate-100 overflow-hidden flex items-center justify-center p-4">
                    <img 
                      src={prod.imagenes?.principal}
                      alt={prod.nombre} 
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    {!tieneStock && (
                      <div className="absolute bottom-0 left-0 right-0 bg-red-600/90 text-white text-center text-[10px] md:text-xs font-bold py-1">
                        AGOTADO
                      </div>
                    )}
                  </div>

                  <div className="p-3 md:p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2 md:mb-3">
                      <span className="text-red-600 text-[9px] md:text-[10px] font-bold uppercase tracking-wider truncate">
                        {prod.marca || prod.categoria}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm md:text-lg leading-tight mb-2 md:mb-4 flex-1 line-clamp-2">
                      {prod.nombre}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-2 md:pt-4 border-t border-slate-100">
                      <span className="text-lg md:text-xl font-black text-slate-900">
                        ${prod.precio.toFixed(2)}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (tieneStock) agregarAlCarrito(prod);
                        }}
                        disabled={!tieneStock}
                        className={`p-2 md:p-2.5 rounded-lg md:rounded-xl transition shadow-lg active:scale-95 flex items-center justify-center
                          ${tieneStock 
                            ? 'bg-slate-900 text-white hover:bg-red-600 hover:shadow-red-600/30 cursor-pointer' 
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                          }
                        `}
                      >
                        <ShoppingBag size={18} className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== BENEFICIOS ===================== */}
      <div className="bg-white py-12 md:py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: <Truck size={32} />, title: "Envíos a todo Ecuador", desc: "Mediante Servientrega o Cooperativas de Transporte" },
              { icon: <CheckCircle size={32} />, title: "Pagos Seguros", desc: "Transferencias, Depósitos o contra entrega en Quito" },
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
                <img src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769069515/png-transparent-banco-pichincha-hd-logo_ecxzuf.png" alt="Banco Pichincha" className="h-8 md:h-12 object-contain logo-pulse" style={{ animationDelay: '0s' }} />
                <img src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769068298/logo_bg_magenta_f46kbl.png" alt="Banco Guayaquil" className="h-6 md:h-10 object-contain logo-pulse" style={{ animationDelay: '1s' }} />
                <img src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769068298/Logo-Banco-con-ISO-2025-2_ihhbzj.png" alt="Produbanco" className="h-6 md:h-8 object-contain logo-pulse" style={{ animationDelay: '2s' }} />
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
                    <img src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769069573/servientrega-logo-png_seeklogo-424932_ynxjo8.png" alt="Logo Servientrega" className="w-full object-contain" />
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
              "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070390/WhatsApp_Image_2026-01-22_at_3.24.25_AM_xxqxy1.jpg",
              "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070388/WhatsApp_Image_2026-01-22_at_3.24.28_AM_uojvbb.jpg",
              "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070392/WhatsApp_Image_2026-01-22_at_3.24.20_AM_u5dzoz.jpg",
              "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070384/WhatsApp_Image_2026-01-22_at_3.24.32_AM_1_zoelkp.jpg",
              "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070391/WhatsApp_Image_2026-01-22_at_3.24.20_AM_1_aht16o.jpg",
            ].map((src, index) => (
              <div key={index} className={`bg-slate-100 rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition aspect-square relative group ${index === 0 ? "col-span-2 row-span-2" : ""}`}>
                <img src={src} alt={`Referencia ${index + 1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          <button 
            // 4. CAMBIO: Usar navigate en vez de setVistaActual
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
              <img src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769067380/WhatsApp_Image_2026-01-22_at_2.36.03_AM_oep9eo.jpg" alt="FG Store colección" className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;