import React, { useState } from 'react';
import { Search, ShoppingCart, Star } from 'lucide-react';
// Importamos los datos (con nombre en español)
import { PRODUCTOS } from '../data/inventario';

const Catalogo = ({
  agregarAlCarrito,
  onSelectProducto,
  modo = "catalogo",          // "catalogo" | "favoritos"
  titulo = "Catálogo Oficial",
  subtitulo = "Explora nuestra colección premium.",
  limite = 4,
  tipoFavoritos = "masVendidos" // "masVendidos" | "nuevos"
}) => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEscala, setFiltroEscala] = useState("todos");

  const productosFiltrados = PRODUCTOS.filter(p => {
    const coincideEscala = filtroEscala === "todos" || p.escala === filtroEscala;
    const coincideBusqueda =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.marca.toLowerCase().includes(busqueda.toLowerCase());
    return coincideEscala && coincideBusqueda;
  });

  // Favoritos: lo más vendido (si no tienes ventas, usa rating) o últimos agregados
  const productosFavoritos = (() => {
    if (tipoFavoritos === "nuevos") {
      return [...PRODUCTOS].slice(-limite).reverse();
    }
    // "masVendidos": usa ventas si existe; si no, usa rating
    return [...PRODUCTOS]
      .sort((a, b) => (b.ventas ?? b.rating ?? 0) - (a.ventas ?? a.rating ?? 0))
      .slice(0, limite);
  })();
  const listaMostrar = modo === "favoritos" ? productosFavoritos : productosFiltrados;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{titulo}</h2>
          <p className="text-slate-500 mt-1">{subtitulo}</p>
        </div>
        
        {modo !== "favoritos" && (
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative group w-full sm:w-64">
            <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar modelo..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-slate-50 transition-all"
            />
          </div>
        

          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['todos', '1:12', '1:18'].map(escala => (
              <button
                key={escala}
                onClick={() => setFiltroEscala(escala)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all cursor-pointer ${filtroEscala === escala ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {escala}
              </button>
            ))}
          </div>
        </div>)}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {listaMostrar.map((producto) => (
        <div
            key={producto.id}
            onClick={() => onSelectProducto?.(producto.id)}
            className="group bg-white rounded-2xl border border-slate-100 hover:shadow-xl hover:border-red-100 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
          >            
          <div className="relative h-56 overflow-hidden bg-slate-100">
                      <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-slate-900 shadow-sm">
                 {producto.escala}
               </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wide">{producto.marca}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold text-slate-600">{producto.rating}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight mb-4 group-hover:text-red-600 transition-colors">{producto.nombre}</h3>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-2xl font-bold text-slate-900">${producto.precio.toFixed(2)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    agregarAlCarrito(producto);
                  }}
                  className="bg-slate-900 text-white p-3 rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-slate-900/20 active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;