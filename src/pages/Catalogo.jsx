import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, CheckCircle, Filter, X } from 'lucide-react';

const Catalogo = ({
  productosIniciales = [],
  agregarAlCarrito,
  onSelectProducto
}) => {
  // ESTADOS DE FILTROS
  const [busqueda, setBusqueda] = useState("");
  const [marcasVehiculoSeleccionadas, setMarcasVehiculoSeleccionadas] = useState([]);
  const [fabricantesSeleccionados, setFabricantesSeleccionados] = useState([]); // Nuevo Filtro
  const [escalasSeleccionadas, setEscalasSeleccionadas] = useState([]);
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  
  // Estado para mostrar filtros en móvil
  const [mostrarFiltrosMovil, setMostrarFiltrosMovil] = useState(false);

  // 1. EXTRAER OPCIONES ÚNICAS
  // Marcas de Vehículo (ej: Yamaha, Ford)
  const marcasVehiculoDisponibles = useMemo(() => 
    [...new Set(productosIniciales.map(p => p.marcaVehiculo || "Otras"))].sort(), 
  [productosIniciales]);

  // Fabricantes (ej: Maisto, HotWheels) - Nuevo Campo
  const fabricantesDisponibles = useMemo(() => 
    [...new Set(productosIniciales.map(p => p.fabricante))].sort(), 
  [productosIniciales]);

  const escalasDisponibles = useMemo(() => 
    [...new Set(productosIniciales.map(p => p.escala))].sort(), 
  [productosIniciales]);

  // 2. FUNCIÓN CHECKBOX TOGGLE
  const toggleFiltro = (item, listaActual, setLista) => {
    if (listaActual.includes(item)) {
      setLista(listaActual.filter(i => i !== item));
    } else {
      setLista([...listaActual, item]);
    }
  };

  // 3. LÓGICA DE FILTRADO
  const productosProcesados = productosIniciales.filter(p => {
    // Texto
    const coincideTexto = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    
    // Filtro 1: Marca Vehículo
    const marcaProd = p.marcaVehiculo || "Otras";
    const coincideMarcaVehiculo = marcasVehiculoSeleccionadas.length === 0 || marcasVehiculoSeleccionadas.includes(marcaProd);

    // Filtro 2: Fabricante (Nuevo)
    const coincideFabricante = fabricantesSeleccionados.length === 0 || fabricantesSeleccionados.includes(p.fabricante);

    // Filtro 3: Escala
    const coincideEscala = escalasSeleccionadas.length === 0 || escalasSeleccionadas.includes(p.escala);

    // Filtro 4: Disponibilidad
    const coincideStock = soloDisponibles ? p.stock > 0 : true;

    return coincideTexto && coincideMarcaVehiculo && coincideFabricante && coincideEscala && coincideStock;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 animate-fade-in font-sans">
      
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* ===================== SIDEBAR IZQUIERDO (FILTROS) ===================== */}
        <aside className={`
            lg:w-1/4 lg:block 
            ${mostrarFiltrosMovil ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'}
        `}>
            
            <div className="flex justify-between items-center lg:hidden mb-6">
                <span className="font-bold text-xl">Filtros</span>
                <button onClick={() => setMostrarFiltrosMovil(false)}><X /></button>
            </div>

            <div className="space-y-8 pr-4">
                
                {/* 1. DISPONIBILIDAD */}
                <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Disponibilidad</h3>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${soloDisponibles ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                            {soloDisponibles && <CheckCircle size={14} className="text-white" />}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden"
                            checked={soloDisponibles}
                            onChange={() => setSoloDisponibles(!soloDisponibles)}
                        />
                        <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">Solo Disponibles</span>
                    </label>
                </div>

                <div className="w-full h-px bg-slate-100"></div>

                {/* 2. ESCALAS */}
                <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Escala</h3>
                    <div className="space-y-2">
                        {escalasDisponibles.map(escala => (
                            <label key={escala} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${escalasSeleccionadas.includes(escala) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                    {escalasSeleccionadas.includes(escala) && <CheckCircle size={14} className="text-white" />}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden"
                                    checked={escalasSeleccionadas.includes(escala)}
                                    onChange={() => toggleFiltro(escala, escalasSeleccionadas, setEscalasSeleccionadas)}
                                />
                                <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">{escala}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="w-full h-px bg-slate-100"></div>

                {/* 3. MARCA DEL VEHÍCULO */}
                <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Marca Vehículo</h3>
                    <div className="space-y-2">
                        {marcasVehiculoDisponibles.map(marca => (
                            <label key={marca} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${marcasVehiculoSeleccionadas.includes(marca) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                    {marcasVehiculoSeleccionadas.includes(marca) && <CheckCircle size={14} className="text-white" />}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden"
                                    checked={marcasVehiculoSeleccionadas.includes(marca)}
                                    onChange={() => toggleFiltro(marca, marcasVehiculoSeleccionadas, setMarcasVehiculoSeleccionadas)}
                                />
                                <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">{marca}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="w-full h-px bg-slate-100"></div>

                {/* 4. FABRICANTE (Nuevo Filtro) */}
                <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Fabricante</h3>
                    <div className="space-y-2">
                        {fabricantesDisponibles.map(fabricante => (
                            <label key={fabricante} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${fabricantesSeleccionados.includes(fabricante) ? 'bg-slate-900 border-slate-900' : 'border-slate-300 bg-white'}`}>
                                    {fabricantesSeleccionados.includes(fabricante) && <CheckCircle size={14} className="text-white" />}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden"
                                    checked={fabricantesSeleccionados.includes(fabricante)}
                                    onChange={() => toggleFiltro(fabricante, fabricantesSeleccionados, setFabricantesSeleccionados)}
                                />
                                <span className="text-slate-600 group-hover:text-slate-900 transition-colors text-sm font-medium">{fabricante}</span>
                            </label>
                        ))}
                    </div>
                </div>

            </div>
        </aside>

        {/* ===================== CONTENIDO DERECHO ===================== */}
        <div className="lg:w-3/4 flex flex-col w-full">
            
            {/* BARRA SUPERIOR */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <button 
                    onClick={() => setMostrarFiltrosMovil(true)}
                    className="lg:hidden w-full flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl font-bold"
                >
                    <Filter size={18} /> Filtrar
                </button>

                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar modelo..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-0 outline-none transition-colors"
                    />
                </div>

                <p className="text-slate-500 font-medium text-sm whitespace-nowrap">
                    {productosProcesados.length} productos
                </p>
            </div>

            {/* GRID DE PRODUCTOS */}
            {productosProcesados.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {productosProcesados.map((producto) => {
                        const tieneStock = producto.stock > 0;
                        return (
                            <div
                                key={producto.id}
                                onClick={() => onSelectProducto?.(producto.id)}
                                className="group bg-white rounded-xl border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
                            >
                                {/* IMAGEN */}
                                <div className="relative h-60 bg-slate-50 flex items-center justify-center overflow-hidden p-6">
                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded border border-slate-200 z-10 text-slate-600">
                                    {producto.escala}
                                </span>

                                <img
                                    src={producto.imagenes?.principal || "/img/placeholder.png"}
                                    alt={producto.nombre}
                                    className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 ${!tieneStock && 'grayscale opacity-70'}`}
                                    onError={(e) => {
                                    e.currentTarget.src = "/img/placeholder.png";
                                    }}
                                />
                                </div>

                                {/* INFO */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-center mb-2">
                                        {tieneStock ? (
                                            <span className="text-[10px] font-extrabold text-green-600 uppercase bg-green-50 px-2 py-0.5 rounded">Disponible</span>
                                        ) : (
                                            <span className="text-[10px] font-extrabold text-red-600 uppercase bg-red-50 px-2 py-0.5 rounded">Agotado</span>
                                        )}
                                        {/* Mostramos el Fabricante (Maisto/HotWheels) */}
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{producto.fabricante}</span>
                                    </div>

                                    <h3 className="text-base font-bold text-slate-900 leading-tight mb-4 group-hover:text-red-600 transition-colors line-clamp-2">
                                        {producto.nombre}
                                    </h3>

                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-xl font-black text-slate-900">${producto.precio.toFixed(2)}</span>
                                        <button
                                            disabled={!tieneStock}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (tieneStock) agregarAlCarrito(producto);
                                            }}
                                            className={`p-2.5 rounded-lg transition-all shadow-sm
                                                ${tieneStock 
                                                    ? 'bg-slate-900 text-white hover:bg-red-600' 
                                                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'}
                                            `}
                                        >
                                            <ShoppingCart size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <Search className="text-slate-300 w-12 h-12 mb-4" />
                    <p className="text-slate-500 font-medium">No hay productos que coincidan con los filtros.</p>
                    <button 
                        onClick={() => {
                            setBusqueda(""); 
                            setMarcasVehiculoSeleccionadas([]); 
                            setFabricantesSeleccionados([]);
                            setEscalasSeleccionadas([]); 
                            setSoloDisponibles(false);
                        }}
                        className="mt-4 text-red-600 font-bold text-sm hover:underline"
                    >
                        Borrar filtros
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Catalogo;