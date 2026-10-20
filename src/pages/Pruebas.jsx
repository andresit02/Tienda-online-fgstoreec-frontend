import React from 'react';
import { Truck, CheckCircle, MapPin, Package, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom'; // <--- IMPORTAR

// Fotos de envíos realizados (guías de remisión)
const ENVIOS_REALIZADOS = [
  { id: 1, img: "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2005.jpg", ciudad: "Azogues", transporte: "Servientrega", guia: "1000548917"},
  { id: 2, img: "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2010.jpg", ciudad: "Guayaquil", transporte: "Servientrega", guia: "1000557627" },
  { id: 3, img: "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2008.jpg", ciudad: "Cumanda", transporte: "Servientrega", guia: "1000557647"},
  { id: 4, img: "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2012.jpg", ciudad: "Piñas", transporte: "Servientrega", guia: "1000550887"},
  { id: 5, img: "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2003.jpg", ciudad: "El Empalme", transporte: "Servientrega", guia: "1000548904"},
  { id: 6, img: "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2006.jpg", ciudad: "Santo Domingo", transporte: "Servientrega", guia: "1000557642"},
  { id: 7, img: "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2011.jpg", ciudad: "Yantzaza", transporte: "Servientrega", guia: "1000548917"},
  { id: 8, img: "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2004.jpg", ciudad: "El Guabo", transporte: "Servientrega", guia: "1000550082"},
  { id: 9, img: "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2002.jpg", ciudad: "Ambato", transporte: "Servientrega", guia: "1000548921"},
  { id: 10, img: "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2001.jpg", ciudad: "Loja", transporte: "Servientrega", guia: "1000548911"},
  { id: 11, img: "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2007.jpg", ciudad: "Santa Rosa", transporte: "Servientrega", guia: "9020829699"},
  { id: 12, img: "https://imagenes.fgstoreec.com/REFERENCIAS%20DE%20ENVIOS/referencias%20de%20envio%2009.png", ciudad: "Zumba", transporte: "Servientrega", guia: "9021468959"},
];

const Pruebas = () => {
  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
      
      {/* BOTÓN VOLVER (NUEVO) */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
      </div>

      {/* HEADER DE LA SECCIÓN */}
      <div className="bg-white border-b border-slate-200 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Referencias de <span className="text-red-600">Envíos</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-lg mx-auto mb-8 md:mb-12 max-w-2xl leading-relaxed">
            La confianza se construye con hechos. Mira las guías de algunos de nuestros envíos a todo el Ecuador.
          </p>

          {/* Estadísticas de confianza */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
            {[
              { label: "Ventas realizadas", val: "+450", icon: Package },
              { label: "Clientes Felices", val: "100%", icon: CheckCircle },
              { label: "Provincias", val: "24", icon: MapPin },
              { label: "Medios de envío", val: "2", icon: Truck },
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-3 md:p-4 rounded-xl flex flex-col items-center hover:shadow-md transition-shadow">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-red-500 mb-1 md:mb-2" />
                <span className="text-lg md:text-2xl font-bold text-slate-900">{stat.val}</span>
                <span className="text-[10px] md:text-xs text-slate-500 font-medium uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GRID DE FOTOS DE GUÍAS */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-8">
          {ENVIOS_REALIZADOS.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl md:rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >

              <div className="relative h-40 md:h-64 overflow-hidden bg-slate-100 cursor-zoom-in">
                <img
                  src={item.img}
                  alt={`Referencia de envío a ${item.ciudad}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center">
                  <p className="text-white font-semibold text-sm tracking-wide">
                    Referencia real de envío
                  </p>
                </div>

                <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/95 backdrop-blur text-[9px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full text-slate-900 shadow-sm flex items-center gap-1 border border-slate-100">
                  <Truck size={10} className="md:w-3 md:h-3" /> {item.transporte}
                </div>
              </div>

              <div className="p-3 md:p-5 text-center md:text-left">
                <h3 className="text-sm md:text-lg font-bold text-slate-900 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-1 md:gap-2">
                  <MapPin size={14} className="text-red-500 md:w-[18px] md:h-[18px]" />
                  {item.ciudad}
                </h3>

                <p className="text-slate-500 text-[10px] md:text-sm font-medium mt-1 md:mt-2 tracking-wide truncate bg-slate-50 py-1 px-2 rounded inline-block md:block">
                  #GUIA: <span className="text-slate-700 font-mono">{item.guia}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pruebas;