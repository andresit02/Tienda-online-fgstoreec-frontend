import React, { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

function ProductoDetalle({ producto, onVolver, agregarAlCarrito }) {
  const [imagenActiva, setImagenActiva] = useState(
    producto?.imagenes?.principal
  );

  if (!producto) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <p className="text-slate-600">Producto no encontrado.</p>
        <button
          onClick={onVolver}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white"
        >
          <ArrowLeft size={18} /> Volver
        </button>
      </div>
    );
  }

  // AJUSTE: Lógica de Stock
  const tieneStock = producto.stock > 0;

  const listaImagenes = producto.imagenes?.galeria 
    ? [producto.imagenes.principal, ...producto.imagenes.galeria] 
    : [producto.imagenes.principal];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fade-in font-sans">
      
      <button
        onClick={onVolver}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold mb-8 transition-colors"
      >
        <ArrowLeft size={18} /> Volver
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl border border-slate-100 shadow-xl p-6 lg:p-8">
        
        {/* GALERÍA */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative group w-full aspect-[4/3] bg-white rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center cursor-crosshair">
            <img
              src={imagenActiva}
              alt={producto.nombre}
              className={`w-[90%] h-[90%] object-contain transition-transform duration-500 group-hover:scale-125 ${!tieneStock && 'grayscale'}`}
            />
             {/* Badge en Detalle si está agotado */}
             {!tieneStock && (
                <div className="absolute top-4 left-4 bg-red-100 text-red-600 px-3 py-1 rounded-lg font-bold text-sm border border-red-200">
                    AGOTADO
                </div>
            )}
          </div>

          {listaImagenes.length > 0 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
              {listaImagenes.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setImagenActiva(img)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl border-2 p-1 transition-all duration-300 snap-start overflow-hidden
                      ${
                        imagenActiva === img
                          ? "border-red-600 shadow-md ring-2 ring-red-100"
                          : "border-slate-100 hover:border-slate-300 opacity-70 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Vista ${index + 1}`}
                      className="w-full h-full object-contain rounded-lg bg-white"
                    />
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="lg:col-span-5 flex flex-col">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            {producto.nombre}
          </h1>

          <p className="text-2xl font-bold text-slate-900 mt-3 border-b border-slate-100 pb-4">
            ${producto.precio.toFixed(2)}
          </p>

          <p className="text-slate-600 mt-6 leading-relaxed">
            {producto.descripcion}
          </p>

          <h2 className="text-xl font-extrabold text-slate-900 mt-10 mb-4">
            Características
          </h2>

          <div className="space-y-3 text-slate-700 text-sm md:text-base">
            {/* AJUSTE: Cambiado 'marca' por 'fabricante' */}
            <p><strong>Fabricante:</strong> {producto.fabricante}</p>
            <p><strong>Marca Vehículo:</strong> {producto.marcaVehiculo}</p>
            <p><strong>Escala:</strong> {producto.escala}</p>

            {producto.caracteristicas.map((c, idx) => (
              <p key={idx} className="flex items-center gap-2">
                <Check className="text-green-600 flex-shrink-0" size={18} />
                {c}
              </p>
            ))}

            <p className="mt-4">
              <strong>Materiales:</strong> {producto.materiales}
            </p>

            <p>
              <strong>Medidas de la caja (cm):</strong>{" "}
              {producto.medidasCaja?.texto || "No especificado"}
            </p>
          </div>

          {/* AJUSTE: Botón condicional según Stock */}
          <button
            onClick={() => tieneStock && agregarAlCarrito(producto)}
            disabled={!tieneStock}
            className={`mt-10 w-full py-4 rounded-xl font-bold transition shadow-lg 
                ${tieneStock 
                    ? 'bg-slate-900 text-white hover:bg-red-600 hover:shadow-red-600/30 active:scale-95' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }
            `}
          >
            {tieneStock ? "Agregar al carrito" : "Agotado"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductoDetalle;