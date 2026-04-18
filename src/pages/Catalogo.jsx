import React, { useState, useMemo, useEffect } from 'react';
import { Search, ShoppingCart, CheckCircle, Filter, X, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { crearSlug } from '../helpers/slug';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useFavoritos } from '../hooks/useFavoritos'; // NUEVO HOOK

const Catalogo = ({
  productosIniciales = [],
  titulo,
  subtitulo,
  agregarAlCarrito,
  esAccesorios = false
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { favoritosIds, toggleFavorito } = useFavoritos(); // CONECTADO A LA BD
  
  const esHotWheels = useMemo(() => productosIniciales.some(p => p.categoria === 'Hot Wheels'), [productosIniciales]);
  
  const [busqueda, setBusqueda] = useState("");
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);      
  const [fabricantesSeleccionados, setFabricantesSeleccionados] = useState([]); 
  const [seriesSeleccionadas, setSeriesSeleccionadas] = useState([]);      
  const [tiposAccesoriosSeleccionados, setTiposAccesoriosSeleccionados] = useState([]); 
  const [escalasSeleccionadas, setEscalasSeleccionadas] = useState([]);
  
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState({
    disponibles: false,
    agotados: false
  });
  
  const [mostrarFiltrosMovil, setMostrarFiltrosMovil] = useState(false);

  const handleFavoritoClick = (e, prod) => {
    e.stopPropagation();
    if (!user) {
      toast.error('Inicia sesión para guardar favoritos');
      navigate('/login');
      return;
    }
    toggleFavorito(prod);
  };

  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 36;

  useEffect(() => {
    setMarcasSeleccionadas([]);
    setFabricantesSeleccionados([]);
    setSeriesSeleccionadas([]);
    setTiposAccesoriosSeleccionados([]);
    setEscalasSeleccionadas([]);
    setFiltroDisponibilidad({ disponibles: false, agotados: false });
    setBusqueda("");
    setPaginaActual(1); 
  }, [productosIniciales]);

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, marcasSeleccionadas, fabricantesSeleccionados, seriesSeleccionadas, tiposAccesoriosSeleccionados, escalasSeleccionadas, filtroDisponibilidad]);

  const marcasDisponibles = useMemo(() => esAccesorios ? [] : [...new Set(productosIniciales.map(p => p.marca || "Otras"))].sort(), [productosIniciales, esAccesorios]);
  const fabricantesDisponibles = useMemo(() => (esHotWheels || esAccesorios) ? [] : [...new Set(productosIniciales.map(p => p.fabricante))].sort(), [productosIniciales, esHotWheels, esAccesorios]);
  const seriesDisponibles = useMemo(() => esHotWheels ? ["Basicos", "Silver Series", "Premium"] : [], [esHotWheels]);
  const escalasDisponibles = useMemo(() => esAccesorios ? [] : [...new Set(productosIniciales.map(p => p.escala))].sort(), [productosIniciales, esAccesorios]);
  const tiposAccesoriosDisponibles = useMemo(() => esAccesorios ? [...new Set(productosIniciales.map(p => p.categoria))].sort() : [], [productosIniciales, esAccesorios]);

  const toggleFiltro = (item, listaActual, setLista) => {
    if (listaActual.includes(item)) setLista(listaActual.filter(i => i !== item));
    else setLista([...listaActual, item]);
  };

  const toggleDisponibilidad = (tipo) => {
    setFiltroDisponibilidad(prev => ({ ...prev, [tipo]: !prev[tipo] }));
  };

  const productosProcesados = productosIniciales
    .filter(p => {
      const coincideTexto = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      let coincideStock = true;
      if (filtroDisponibilidad.disponibles && !filtroDisponibilidad.agotados) coincideStock = p.stock > 0;
      else if (!filtroDisponibilidad.disponibles && filtroDisponibilidad.agotados) coincideStock = p.stock === 0;

      if (esAccesorios) {
          const coincideTipo = tiposAccesoriosSeleccionados.length === 0 || tiposAccesoriosSeleccionados.includes(p.categoria);
          return coincideTexto && coincideStock && coincideTipo;
      } else {
          const marcaProd = p.marca || "Otras";
          const coincideMarca = marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(marcaProd);
          const coincideFabricante = esHotWheels ? true : (fabricantesSeleccionados.length === 0 || fabricantesSeleccionados.includes(p.fabricante));
          const coincideSerie = !esHotWheels ? true : (seriesSeleccionadas.length === 0 || (p.serie && seriesSeleccionadas.includes(p.serie)));
          const coincideEscala = escalasSeleccionadas.length === 0 || escalasSeleccionadas.includes(p.escala);

          return coincideTexto && coincideStock && coincideMarca && coincideFabricante && coincideSerie && coincideEscala;
      }
    })
    .sort((a, b) => {
      const stockA = a.stock > 0;
      const stockB = b.stock > 0;
      if (stockA && !stockB) return -1; 
      if (!stockA && stockB) return 1;  
      return 0; 
    });

  const totalPaginas = Math.ceil(productosProcesados.length / itemsPorPagina);
  const indexUltimo = paginaActual * itemsPorPagina;
  const indexPrimero = indexUltimo - itemsPorPagina;
  const productosPaginados = productosProcesados.slice(indexPrimero, indexUltimo);

  const NAV_CATEGORIAS = [
    { label: 'Motos', path: '/motos', match: 'Motos a Escala' },
    { label: 'Autos', path: '/autos', match: 'Autos a Escala' },
    { label: 'Hot Wheels', path: '/hotwheels', match: 'Hot Wheels' },
    { label: 'Accesorios', path: '/accesorios', match: 'Accesorios' },
  ];
  const categoriasAmostrar = NAV_CATEGORIAS.filter(cat => cat.match !== titulo);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 animate-fade-in font-sans">
      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
      
      <div className="mb-4 lg:mb-8">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{titulo}</h1>
        {subtitulo && <p className="text-slate-500 mt-2">{subtitulo}</p>}
      </div>

      <div 
        className="flex lg:hidden overflow-x-auto gap-3 mb-6 pb-1 hide-scroll" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {categoriasAmostrar.map(cat => (
          <button
            key={cat.path}
            onClick={() => navigate(cat.path)}
            className="whitespace-nowrap px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-sm flex-shrink-0"
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        <aside className={`lg:w-1/4 lg:block ${mostrarFiltrosMovil ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'}`}>
            <div className="flex justify-between items-center lg:hidden mb-6">
                <span className="font-bold text-xl">Filtros</span>
                <button onClick={() => setMostrarFiltrosMovil(false)}><X /></button>
            </div>

            <div className="space-y-8 pr-4">
                <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Disponibilidad</h3>
                    <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filtroDisponibilidad.disponibles ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                {filtroDisponibilidad.disponibles && <CheckCircle size={14} className="text-white" />}
                            </div>
                            <input type="checkbox" className="hidden" checked={filtroDisponibilidad.disponibles} onChange={() => toggleDisponibilidad('disponibles')} />
                            <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">Disponibles</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filtroDisponibilidad.agotados ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                {filtroDisponibilidad.agotados && <CheckCircle size={14} className="text-white" />}
                            </div>
                            <input type="checkbox" className="hidden" checked={filtroDisponibilidad.agotados} onChange={() => toggleDisponibilidad('agotados')} />
                            <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">Agotados</span>
                        </label>
                    </div>
                </div>
                <div className="w-full h-px bg-slate-100"></div>

                {esAccesorios && (
                     <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Tipo</h3>
                        <div className="space-y-2">
                            {tiposAccesoriosDisponibles.map(tipo => (
                                <label key={tipo} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${tiposAccesoriosSeleccionados.includes(tipo) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                        {tiposAccesoriosSeleccionados.includes(tipo) && <CheckCircle size={14} className="text-white" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={tiposAccesoriosSeleccionados.includes(tipo)} onChange={() => toggleFiltro(tipo, tiposAccesoriosSeleccionados, setTiposAccesoriosSeleccionados)} />
                                    <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">{tipo}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {!esAccesorios && (
                    <>
                        <div>
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Escala</h3>
                            <div className="space-y-2">
                                {escalasDisponibles.map(escala => (
                                    <label key={escala} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${escalasSeleccionadas.includes(escala) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                            {escalasSeleccionadas.includes(escala) && <CheckCircle size={14} className="text-white" />}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={escalasSeleccionadas.includes(escala)} onChange={() => toggleFiltro(escala, escalasSeleccionadas, setEscalasSeleccionadas)} />
                                        <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">{escala}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="w-full h-px bg-slate-100"></div>

                        <div>
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Marca</h3>
                            <div className="space-y-2">
                                {marcasDisponibles.map(marca => (
                                    <label key={marca} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${marcasSeleccionadas.includes(marca) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                            {marcasSeleccionadas.includes(marca) && <CheckCircle size={14} className="text-white" />}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={marcasSeleccionadas.includes(marca)} onChange={() => toggleFiltro(marca, marcasSeleccionadas, setMarcasSeleccionadas)} />
                                        <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">{marca}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="w-full h-px bg-slate-100"></div>

                        {esHotWheels ? (
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Tipo</h3>
                                <div className="space-y-2">
                                    {seriesDisponibles.map(serie => (
                                        <label key={serie} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${seriesSeleccionadas.includes(serie) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                                {seriesSeleccionadas.includes(serie) && <CheckCircle size={14} className="text-white" />}
                                            </div>
                                            <input type="checkbox" className="hidden" checked={seriesSeleccionadas.includes(serie)} onChange={() => toggleFiltro(serie, seriesSeleccionadas, setSeriesSeleccionadas)} />
                                            <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">{serie}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Fabricante</h3>
                                <div className="space-y-2">
                                    {fabricantesDisponibles.map(fabricante => (
                                        <label key={fabricante} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${fabricantesSeleccionados.includes(fabricante) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                                {fabricantesSeleccionados.includes(fabricante) && <CheckCircle size={14} className="text-white" />}
                                            </div>
                                            <input type="checkbox" className="hidden" checked={fabricantesSeleccionados.includes(fabricante)} onChange={() => toggleFiltro(fabricante, fabricantesSeleccionados, setFabricantesSeleccionados)} />
                                            <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">{fabricante}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </aside>

        <div className="lg:w-3/4 flex flex-col w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                
                <div className="relative w-full sm:max-w-md order-1 sm:order-2">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="text" placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-300 focus:border-slate-900 outline-none" />
                </div>

                <button onClick={() => setMostrarFiltrosMovil(true)} className="lg:hidden w-full flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl font-bold order-2 sm:order-1">
                    <Filter size={18} /> Filtrar
                </button>

                <p className="text-slate-500 font-medium text-sm whitespace-nowrap order-3 sm:order-3">
                    {productosProcesados.length} productos encontrados
                </p>
            </div>

            {productosPaginados.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
                    {productosPaginados.map((producto, index) => {
                        const tieneStock = producto.stock > 0;
                        const isFav = favoritosIds.includes(producto.id);
                        const categoriaKey = producto.categoria || 'acc';
                        const uniqueKey = `${categoriaKey}-${producto.id}-${index}`;
                        
                        let etiquetaSecundaria = "";
                        if (esHotWheels) etiquetaSecundaria = producto.serie;
                        else if (esAccesorios) etiquetaSecundaria = producto.categoria; 
                        else etiquetaSecundaria = producto.fabricante;

                        return (
                            <div 
                                key={uniqueKey} 
                                onClick={() => {
                                  let rutaCategoria = 'otros';
                                  if (producto.categoria === 'Motos') rutaCategoria = 'motos';
                                  else if (producto.categoria === 'Autos') rutaCategoria = 'autos';
                                  else if (producto.categoria === 'Hot Wheels') rutaCategoria = 'hotwheels';
                                  else rutaCategoria = 'accesorios'; 
                                  const slugUnico = `${crearSlug(producto.nombre)}-${producto.id}`;
                                  navigate(`/producto/${rutaCategoria}/${slugUnico}`, { state: { fromInternal: true } });
                                }} 
                                className="group bg-white rounded-xl border border-slate-100 hover:shadow-xl flex flex-col overflow-hidden cursor-pointer relative"
                            >
                                <button 
                                  onClick={(e) => handleFavoritoClick(e, producto)} 
                                  className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 shadow-sm z-10 transition-colors border border-slate-100/50"
                                >
                                  <Heart size={18} fill={isFav ? "currentColor" : "none"} className={isFav ? "text-red-500" : ""} />
                                </button>

                                <div className="relative h-36 sm:h-48 md:h-60 bg-slate-50 flex items-center justify-center p-4 overflow-hidden">
                                    <img 
                                        src={producto.imagenes?.principal} 
                                        alt={producto.nombre} 
                                        className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-110`} 
                                        onError={(e) => e.currentTarget.src = "/img/placeholder.png"} 
                                    />
                                    {!tieneStock && (
                                      <div className="absolute bottom-0 left-0 right-0 bg-red-600/90 text-white text-center text-[10px] md:text-xs font-bold py-1">
                                        AGOTADO
                                      </div>
                                    )}
                                </div>

                                <div className="p-3 md:p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-center mb-2 gap-2">
                                        <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate max-w-[80px] md:max-w-none text-right">
                                            {etiquetaSecundaria}
                                        </span>
                                    </div>

                                    <h3 className="text-sm md:text-base font-bold text-slate-900 leading-tight mb-2 md:mb-4 group-hover:text-red-600 transition-colors line-clamp-2 min-h-[2.5em]">
                                        {producto.nombre}
                                    </h3>

                                    <div className="mt-auto flex items-center justify-between gap-2">
                                        <span className="text-lg md:text-xl font-black text-slate-900">
                                            ${producto.precio.toFixed(2)}
                                        </span>
                                        
                                        <button 
                                            disabled={!tieneStock} 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                if (tieneStock) agregarAlCarrito(producto); 
                                            }} 
                                            className={`p-2 md:p-2.5 rounded-lg transition-all shadow-sm flex-shrink-0 
                                                ${tieneStock ? 'bg-slate-900 text-white hover:bg-red-600' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}
                                            `}
                                        >
                                            <ShoppingCart size={18} className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-500 font-medium">No hay productos que coincidan con los filtros.</p>
                </div>
            )}

            {totalPaginas > 1 && (
                <div className="flex justify-center items-center gap-4 mt-10">
                    <button 
                        onClick={() => { setPaginaActual(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        disabled={paginaActual === 1}
                        className="px-5 py-2 bg-white border-2 border-slate-200 text-slate-700 rounded-xl disabled:opacity-50 hover:border-slate-900 hover:text-slate-900 font-bold transition-all"
                    >
                        Anterior
                    </button>
                    <span className="font-bold text-slate-500">Página {paginaActual} de {totalPaginas}</span>
                    <button 
                        onClick={() => { setPaginaActual(p => Math.min(totalPaginas, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        disabled={paginaActual === totalPaginas}
                        className="px-5 py-2 bg-slate-900 text-white rounded-xl disabled:bg-slate-300 font-bold transition-colors"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Catalogo;