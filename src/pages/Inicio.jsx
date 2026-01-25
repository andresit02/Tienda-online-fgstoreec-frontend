import React from "react";
import { 
  ArrowRight, ShoppingBag, Truck, CheckCircle, 
  Package, CreditCard, ExternalLink
} from "lucide-react"; // Se eliminó 'Flame' ya que no se usa
import {TikTokIcon, InstagramIcon, FacebookIcon} from "../components/SocialMediaIcons";

// AHORA RECIBIMOS 'onSelectProducto' EN LAS PROPS
const Inicio = ({ setVistaActual, productos, agregarAlCarrito, onSelectProducto }) => {
  
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

      {/* HERO SECTION */}
      <div className="relative w-full h-[560px] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img src={imagenFondo} className="w-full h-full object-cover object-center" alt="Fondo" />
        </div>
        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-6 drop-shadow-xl uppercase tracking-tight">FGSTOREEC</h1>
            <p className="text-white text-xl md:text-2xl font-bold mb-3 drop-shadow-md">Descubre nuestra variedad de motos a escala y varios productos más.</p>
            <p className="text-slate-200 text-lg md:text-xl font-medium tracking-wide uppercase drop-shadow-md">QUITO - ECUADOR</p>
          </div>
        </div>
      </div>

      {/* REDES SOCIALES */}
      <div className="relative bg-slate-50 border-b border-slate-200">
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <a href="https://www.tiktok.com/@fgstoreec" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 px-6 py-4 bg-black text-white rounded-2xl shadow-lg shadow-black/10 hover:-translate-y-1 transition-all duration-300 min-w-[200px]">
              <div className="bg-white/20 p-2 rounded-full"><TikTokIcon className="w-5 h-5 text-white" /></div>
              <div className="text-left leading-none"><p className="text-[10px] text-gray-300 font-bold uppercase tracking-wide mb-1">Síguenos</p><p className="font-bold text-base">+11k en TikTok</p></div>
            </a>
            <a href="https://www.instagram.com/fgstoreec" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 px-6 py-4 bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-2xl shadow-lg shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300 min-w-[200px]">
              <div className="bg-white/20 p-2 rounded-full"><InstagramIcon className="w-5 h-5 text-white" /></div>
              <div className="text-left leading-none"><p className="text-[10px] text-white/80 font-bold uppercase tracking-wide mb-1">Novedades</p><p className="font-bold text-base">+1k seguidores</p></div>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100076773455049&locale=es_LA" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 px-6 py-4 bg-[#1877F2] text-white rounded-2xl shadow-lg shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 min-w-[200px]">
              <div className="bg-white/20 p-2 rounded-full"><FacebookIcon className="w-5 h-5 text-white" /></div>
              <div className="text-left leading-none"><p className="text-[10px] text-blue-100 font-bold uppercase tracking-wide mb-1">Comunidad</p><p className="font-bold text-base">Facebook</p></div>
            </a>
          </div>
        </div>
      </div>

      {/* PRODUCTOS DESTACADOS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Productos destacados
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {productos && productos.map((prod) => {
              // Lógica de stock para deshabilitar botón (pero NO la imagen)
              const tieneStock = prod.stock > 0;

              return (
                <div 
                  key={`${prod.categoria}-${prod.id}`} 
                  // 1. AGREGADO: Evento onClick para abrir el producto
                  onClick={() => onSelectProducto && onSelectProducto(prod)}
                  // 2. AGREGADO: cursor-pointer para indicar que es clicable
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group flex flex-col cursor-pointer"
                >
                  
                  {/* Imagen (Sin escala, sin grayscale) */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    
                    {/* 3. ELIMINADO: Se quitó la etiqueta naranja de Hot Wheels */}

                    <img 
                      src={prod.imagenes?.principal}
                      alt={prod.nombre} 
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Etiqueta opcional de Agotado sobre la imagen */}
                    {!tieneStock && (
                      <div className="absolute bottom-0 left-0 right-0 bg-red-600/90 text-white text-center text-xs font-bold py-1">
                        AGOTADO
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      {/* Muestra marca o categoría si es accesorio */}
                      <span className="text-red-600 text-[10px] font-bold uppercase tracking-wider">
                        {prod.marca || prod.categoria}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-slate-900 text-lg leading-tight mb-4 flex-1 line-clamp-2">
                      {prod.nombre}
                    </h3>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <span className="text-xl font-black text-slate-900">${prod.precio.toFixed(2)}</span>
                      
                      {/* Botón: Se deshabilita si no hay stock */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Evita que el clic en el botón active el clic de la tarjeta también
                          if (tieneStock) agregarAlCarrito(prod);
                        }}
                        disabled={!tieneStock}
                        className={`p-2.5 rounded-xl transition shadow-lg active:scale-95 flex items-center justify-center
                          ${tieneStock 
                            ? 'bg-slate-900 text-white hover:bg-red-600 hover:shadow-red-600/30 cursor-pointer' 
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                          }
                        `}
                      >
                        <ShoppingBag size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <div className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Truck size={32} />, title: "Envíos a todo Ecuador", desc: "Mediante Servientrega o Cooperativas de Transporte" },
              { icon: <CheckCircle size={32} />, title: "Pagos Seguros", desc: "Transferencias, Depósitos o contra entrega en Quito" },
              { icon: <Package size={32} />, title: "Calidad Garantizada", desc: "Productos de excelente calidad" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4">
                <div className="mb-6 p-4 bg-slate-50 rounded-full text-slate-900">
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PAGOS Y ENVÍOS */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Columna 1: Bancos */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                  <CreditCard size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Métodos de Pago</h3>
              </div>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                Aceptamos transferencias directas a las siguientes instituciones bancarias:
              </p>
              
              <div className="grid grid-cols-3 gap-8 items-center justify-items-center">
                <img src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769069515/png-transparent-banco-pichincha-hd-logo_ecxzuf.png" alt="Banco Pichincha" className="h-12 object-contain logo-pulse" style={{ animationDelay: '0s' }} />
                <img src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769068298/logo_bg_magenta_f46kbl.png" alt="Banco Guayaquil" className="h-10 object-contain logo-pulse" style={{ animationDelay: '1s' }} />
                <img src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769068298/Logo-Banco-con-ISO-2025-2_ihhbzj.png" alt="Produbanco" className="h-8 object-contain logo-pulse" style={{ animationDelay: '2s' }} />
              </div>
            </div>

            {/* Columna 2: Servientrega */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-0 group-hover:bg-green-100 transition" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-green-600 text-white rounded-lg">
                    <Truck size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Envíos Certificados</h3>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="w-32 flex-shrink-0">
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

      {/* REFERENCIAS */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Referencias de envíos</h2>
          <p className="text-slate-500 mb-12 mx-auto max-w-1xl text-lg">La satisfacción de nuestros clientes es nuestra prioridad. Estos son algunos de nuestros envíos realizados exitosamente.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070390/WhatsApp_Image_2026-01-22_at_3.24.25_AM_xxqxy1.jpg",
              "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070388/WhatsApp_Image_2026-01-22_at_3.24.28_AM_uojvbb.jpg",
              "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070392/WhatsApp_Image_2026-01-22_at_3.24.20_AM_u5dzoz.jpg",
              "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070384/WhatsApp_Image_2026-01-22_at_3.24.32_AM_1_zoelkp.jpg",
              "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769070391/WhatsApp_Image_2026-01-22_at_3.24.20_AM_1_aht16o.jpg",
            ].map((src, index) => (
              <div key={index} className={`bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition aspect-square relative group ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                <img src={src} alt={`Referencia ${index + 1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          <button onClick={() => setVistaActual('pruebas')} className="inline-flex items-center gap-3 bg-slate-900 text-white px-12 py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-xl cursor-pointer">
            Ver mas referencias <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-8">Sobre Nosotros</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>Desde 2023, nuestra pasión por las motos y el coleccionismo nos llevó a crear <strong className="text-slate-900 font-bold"> Fgstore</strong>, una tienda online especializada en motos, vehículos a escala, accesorios y más.</p>
                <p>Estamos comprometidos con ofrecer productos de alta calidad y una experiencia de compra segura.</p>
                <p>Enviamos desde Quito a todo el Ecuador.</p>
                <p className="font-bold text-slate-900 pt-4 text-xl">¡Gracias por ser parte de nuestro crecimiento!</p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-12 border-t border-slate-200 pt-12">
                <div><h4 className="text-4xl font-black text-red-600">450+</h4><span className="text-slate-500 text-sm font-semibold uppercase tracking-wider block mt-2">Ventas Exitosas</span></div>
                <div><h4 className="text-4xl font-black text-red-600">100%</h4><span className="text-slate-500 text-sm font-semibold uppercase tracking-wider block mt-2">Clientes Felices</span></div>
              </div>
            </div>
            <div className="relative">
              <img src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769067380/WhatsApp_Image_2026-01-22_at_2.36.03_AM_oep9eo.jpg" alt="FG Store colección" className="w-full h-[500px] object-cover rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;