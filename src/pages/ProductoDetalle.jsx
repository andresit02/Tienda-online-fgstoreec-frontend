import React from "react";
import { ArrowLeft } from "lucide-react";

function ProductoDetalle({ producto, onVolver, agregarAlCarrito }) {
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      <button
        onClick={onVolver}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold mb-6"
      >
        <ArrowLeft size={18} /> Volver
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl border border-slate-100 shadow-xl p-6">
        <div className="rounded-2xl overflow-hidden bg-slate-100">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">{producto.nombre}</h1>
          <p className="text-2xl font-bold text-slate-900 mt-3">
            ${Number(producto.precio).toFixed(2)}
          </p>

          <button
            onClick={() => agregarAlCarrito(producto)}
            className="mt-5 w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-slate-900/20"
          >
            Agregar al carrito
          </button>

          <h2 className="text-red-600 font-extrabold text-xl mt-10 mb-4">
            CARACTERÍSTICAS
          </h2>

          <div className="space-y-2 text-slate-700">
            <p><span className="font-bold">Marca:</span> {producto.marca}</p>
            <p><span className="font-bold">Escala:</span> {producto.escala}</p>
            {producto.descripcion && <p>{producto.descripcion}</p>}

            {Array.isArray(producto.caracteristicas) && producto.caracteristicas.length > 0 && (
              <ul className="list-disc pl-5 mt-3 space-y-1">
                {producto.caracteristicas.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            )}

            {producto.materiales && (
              <p className="mt-4">
                <span className="font-bold">Materiales:</span> {producto.materiales}
              </p>
            )}

            {producto.medidasCaja && (
              <p>
                <span className="font-bold">Medidas de la caja:</span>{" "}
                Largo ({producto.medidasCaja.largo} cm), Ancho ({producto.medidasCaja.ancho} cm), Alto ({producto.medidasCaja.alto} cm)
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
