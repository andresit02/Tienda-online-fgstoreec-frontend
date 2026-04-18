import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavoritos } from '../hooks/useFavoritos'; // NUEVO HOOK

export default function ListaDeseos({ agregarAlCarrito }) {
  const { user } = useAuth();
  
  // CONECTADO A LA BD (No más localStorage, no más cruces de datos)
  const { favoritos, toggleFavorito } = useFavoritos();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-fade-in min-h-screen flex flex-col items-center justify-center">
        <Heart className="text-slate-200 mb-6" size={80} />
        <h2 className="text-3xl font-black text-slate-900 mb-4">Inicia sesión para ver tus Favoritos</h2>
        <p className="text-slate-500 mb-8 max-w-md">Guarda tus motos, autos y accesorios favoritos para acceder a ellos rápidamente en cualquier momento.</p>
        <Link to="/login" className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="text-red-600" size={32} fill="currentColor" />
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Mis Favoritos</h1>
      </div>

      {favoritos.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
          <Store className="text-slate-200 mb-6" size={64} />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Tu lista está vacía</h3>
          <p className="text-slate-500 font-medium mb-8 max-w-md">
            Descubre nuestra colección de motos, autos a escala, Hot Wheels y más. ¡Encuentra tu próximo modelo favorito!
          </p>
          <Link to="/motos" className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition shadow-md">
            Explorar Tienda
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {favoritos.map((prod) => {
            const tieneStock = prod.stock > 0;

            return (
              <div key={prod.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 items-center sm:items-stretch transition-hover hover:shadow-md">
                <div className="w-full sm:w-32 h-32 bg-slate-50 rounded-xl border flex items-center justify-center p-2 flex-shrink-0 relative overflow-hidden">
                  <img src={prod.imagenes?.principal} alt={prod.nombre} className="w-full h-full object-contain" />
                  
                  {!tieneStock && (
                     <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                       <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-wider shadow-sm rotate-[-10deg]">Agotado</span>
                     </div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-between w-full">
                  <div>
                    <h3 className="font-bold text-slate-900 line-clamp-2 text-sm md:text-base leading-tight mb-1">{prod.nombre}</h3>
                    <p className="text-lg font-black text-slate-900">${prod.precio.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <button 
                      onClick={() => agregarAlCarrito(prod)} 
                      disabled={!tieneStock}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition ${
                        tieneStock ? 'bg-slate-900 text-white hover:bg-red-600' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={16} />
                      {tieneStock ? 'Agregar' : 'Agotado'}
                    </button>
                    <button 
                      onClick={() => toggleFavorito(prod)} 
                      className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
                      title="Eliminar de favoritos"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}