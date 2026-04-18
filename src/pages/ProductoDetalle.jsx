import React, { useState, useEffect } from "react";
import { ArrowLeft, Check, Heart } from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { crearSlug } from "../helpers/slug";
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useFavoritos } from '../hooks/useFavoritos'; // NUEVO HOOK

function ProductoDetalle({ agregarAlCarrito, todosLosProductos }) {
  const { categoria, slug } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation(); 
  const { user } = useAuth();
  const { favoritosIds, toggleFavorito } = useFavoritos(); // CONECTADO A LA BD
  
  const [producto, setProducto] = useState(null);
  const [imagenActiva, setImagenActiva] = useState(null);

  const handleFavoritoClick = () => {
    if (!user) {
      toast.error('Inicia sesión para guardar favoritos');
      navigate('/login');
      return;
    }
    toggleFavorito(producto);
  };

  useEffect(() => {
    if (todosLosProductos && todosLosProductos.length > 0) {
      const encontrado = todosLosProductos.find(p => {
        const slugDelProducto = `${crearSlug(p.nombre)}-${p.id}`;
        return slugDelProducto === slug;
      });

      if (encontrado) {
        setProducto(encontrado);
        setImagenActiva(encontrado.imagenes?.principal);
      }
    }
  }, [slug, todosLosProductos]);

  const handleVolver = () => {
    if (location.state?.fromInternal) {
      navigate(-1);
    } else {
      navigate(`/${categoria}`);
    }
  };

  if (!producto) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center font-sans">
        <p className="text-slate-500 mb-4">Buscando producto...</p>
        <button onClick={() => navigate('/')} className="text-blue-600 underline">Ir al inicio</button>
      </div>
    );
  }

  const tieneStock = producto.stock > 0;
  const isFav = favoritosIds.includes(producto.id);
  const listaImagenes = producto.imagenes?.galeria 
    ? [producto.imagenes.principal, ...producto.imagenes.galeria] 
    : [producto.imagenes?.principal];

  const esAccesorio = producto.categoria === 'Accesorios';
  const esHotWheels = producto.categoria === 'Hot Wheels';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fade-in font-sans">
      
      <button 
        onClick={handleVolver} 
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold mb-8 transition-colors"
      >
        <ArrowLeft size={18} /> Volver
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl border border-slate-100 shadow-xl p-6 lg:p-8">
        
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative group w-full aspect-[4/3] bg-white rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center">
            <img src={imagenActiva} alt={producto.nombre} className={`w-[90%] h-[90%] object-contain transition-transform duration-500 group-hover:scale-125`} />
             {!tieneStock && (
                <div className="absolute top-4 left-4 bg-red-100 text-red-600 px-3 py-1 rounded-lg font-bold text-sm border border-red-200">AGOTADO</div>
            )}
          </div>
          {listaImagenes.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
              {listaImagenes.map((img, index) => (
                  <button key={index} onClick={() => setImagenActiva(img)} className={`relative flex-shrink-0 w-20 h-20 rounded-xl border-2 p-1 transition-all snap-start overflow-hidden ${imagenActiva === img ? "border-red-600 shadow-md ring-2 ring-red-100" : "border-slate-100 opacity-70 hover:opacity-100"}`}>
                    <img src={img} alt={`Vista ${index + 1}`} className="w-full h-full object-contain rounded-lg bg-white" />
                  </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight uppercase">{producto.nombre}</h1>
          <p className="text-2xl font-bold text-slate-900 mt-3 border-b border-slate-100 pb-4">${producto.precio.toFixed(2)}</p>
          <p className="text-slate-600 mt-6 leading-relaxed">{producto.descripcion}</p>

          <h2 className="text-xl font-extrabold text-slate-900 mt-10 mb-4">Características</h2>
          <div className="space-y-3 text-slate-700 text-sm md:text-base">
            
            {producto.fabricante && <p><strong>Fabricante:</strong> {producto.fabricante}</p>}
            {producto.serie && <p><strong>Serie:</strong> {producto.serie}</p>}
            {producto.marca && <p><strong>Marca:</strong> {producto.marca}</p>}
            {producto.escala && <p><strong>Escala:</strong> {producto.escala}</p>}
            
            {esAccesorio && <p><strong>Tipo:</strong> {producto.categoria}</p>}

            {producto.caracteristicas && producto.caracteristicas.map((c, idx) => (
              <p key={idx} className="flex items-center gap-2">
                <Check className="text-green-600 flex-shrink-0" size={18} /> {c}
              </p>
            ))}

            {!esHotWheels && !esAccesorio && (
              <>
                <p className="mt-4">
                  <strong>Materiales:</strong> {producto.materiales || "No especificado"}
                </p>
                <p>
                  <strong>Medidas de la caja (cm):</strong> {producto.medidasCaja?.texto || "No especificado"}
                </p>
              </>
            )}
          </div>

          <div className="mt-10 flex gap-3 md:gap-4">
            <button 
              onClick={() => tieneStock && agregarAlCarrito(producto)} 
              disabled={!tieneStock} 
              className={`flex-1 py-3.5 md:py-4 rounded-xl font-bold transition shadow-lg ${tieneStock ? 'bg-slate-900 text-white hover:bg-red-600 hover:shadow-red-600/30' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
            >
              {tieneStock ? "Agregar al carrito" : "Agotado"}
            </button>
            
            <button 
              onClick={handleFavoritoClick} 
              className={`w-14 md:w-16 flex-shrink-0 rounded-xl border-2 transition flex items-center justify-center cursor-pointer
                ${isFav ? 'border-red-100 bg-red-50 text-red-500' : 'border-slate-200 bg-white text-slate-400 hover:border-red-200 hover:text-red-500 hover:bg-red-50'}
              `}
              title="Agregar a favoritos"
            >
              <Heart size={24} fill={isFav ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;