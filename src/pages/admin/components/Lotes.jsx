import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Plus, Package, Edit2, Save, X, ChevronDown, ChevronUp } from 'lucide-react'; 

const BASE_API_URL = `${import.meta.env.VITE_API_URL}/api`;

export default function Lotes({ lotes, cargarLotes, config }) {
  const [nuevoLoteNombre, setNuevoLoteNombre] = useState('');
  
  const [editandoFechaId, setEditandoFechaId] = useState(null);
  const [nuevaFecha, setNuevaFecha] = useState('');

  // NUEVO ESTADO: Para saber qué lote está desplegado
  const [loteExpandido, setLoteExpandido] = useState(null);

  const handleCrearLote = async (e) => {
    e.preventDefault();
    if (!nuevoLoteNombre) return toast.error('Ingresa un nombre para el lote');
    try {
      await axios.post(`${BASE_API_URL}/importaciones`, { nombre: nuevoLoteNombre }, config);
      toast.success('Lote creado');
      setNuevoLoteNombre('');
      cargarLotes();
    } catch (error) { toast.error('Error al crear lote'); }
  };

  const handleActualizarFecha = async (id) => {
    if (!nuevaFecha) return toast.error('Selecciona una fecha válida');
    try {
      await axios.put(`${BASE_API_URL}/importaciones/${id}/fecha`, { fecha: nuevaFecha }, config);
      toast.success('Fecha actualizada correctamente');
      setEditandoFechaId(null);
      cargarLotes();
    } catch (error) { toast.error('Error al actualizar fecha'); }
  };

  // Función para abrir/cerrar el acordeón de productos
  const toggleLote = (id) => {
    setLoteExpandido(prev => prev === id ? null : id);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold mb-4">Crear Nuevo Lote</h2>
        <form onSubmit={handleCrearLote} className="flex flex-col sm:flex-row gap-3">
          <input type="text" placeholder="Ej: Importación Abril 2026" className="flex-1 border p-3 rounded-xl outline-none focus:border-slate-900" value={nuevoLoteNombre} onChange={(e) => setNuevoLoteNombre(e.target.value)} />
          <button type="submit" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800"><Plus size={18} /> Crear Lote</button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lotes.map(lote => (
          <div key={lote.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
            
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-black text-lg text-slate-900 pr-2">{lote.nombre}</h3>
              
              <div className="flex-shrink-0">
                {editandoFechaId === lote.id ? (
                  <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200 shadow-inner">
                    <input 
                      type="date" 
                      className="border border-slate-300 rounded-md p-1 text-xs outline-none focus:border-blue-500 font-bold text-slate-700 bg-white"
                      value={nuevaFecha}
                      onChange={(e) => setNuevaFecha(e.target.value)}
                    />
                    <button onClick={() => handleActualizarFecha(lote.id)} className="p-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition" title="Guardar">
                      <Save size={14} />
                    </button>
                    <button onClick={() => setEditandoFechaId(null)} className="p-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition" title="Cancelar">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setEditandoFechaId(lote.id);
                      setNuevaFecha(new Date(lote.fecha).toISOString().split('T')[0]);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition group"
                    title="Clic para cambiar la fecha"
                  >
                    {new Date(lote.fecha).toLocaleDateString()}
                    <Edit2 size={12} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 border-t border-slate-100 pt-4">
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Costo Total</p>
                <p className="text-lg font-black text-red-600">${(lote.costoTotalLote || 0).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Importadas</p>
                <p className="text-lg font-black text-slate-900">{lote.cantidadUnidades || 0} <span className="text-xs font-bold text-slate-500">unidades</span></p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg border border-green-100">
                <p className="text-[10px] text-green-700 font-bold uppercase tracking-wider mb-1">Stock Actual</p>
                <p className="text-xl font-black text-green-700 flex items-center gap-1">
                  <Package size={16}/> {lote.unidadesDisponibles || 0} <span className="text-xs font-bold ml-0.5">unidades</span>
                </p>
              </div>
            </div>

            {/* ==================== NUEVO: BOTÓN Y LISTA DESPLEGABLE DE PRODUCTOS ==================== */}
            <button
              onClick={() => toggleLote(lote.id)}
              className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 transition active:scale-95"
            >
              {loteExpandido === lote.id ? (
                <><ChevronUp size={18} /> Ocultar Productos</>
              ) : (
                <><ChevronDown size={18} /> Ver Productos del Lote</>
              )}
            </button>

            {loteExpandido === lote.id && (
              <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Modelos en este lote</h4>
                
                {lote.productos && lote.productos.length > 0 ? (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 hide-scroll">
                    {lote.productos.map(prod => (
                      <div key={prod.id} className="flex justify-between items-center bg-white border border-slate-100 p-2.5 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3 min-w-0">
                          <img 
                            src={prod.imagenes?.principal || '/img/placeholder.png'} 
                            alt={prod.nombre} 
                            className="w-10 h-10 object-contain bg-slate-50 rounded-lg border border-slate-100 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">{prod.nombre}</p>
                            <p className="text-[10px] font-medium text-slate-500 mt-0.5">
                              Costo: <span className="font-bold text-slate-700">${prod.costoUnitario}</span> <span className="mx-1">•</span> Venta: <span className="font-bold text-slate-700">${prod.precio}</span>
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0 text-right ml-2">
                          <span className={`text-xs font-black px-2.5 py-1.5 rounded-lg flex items-center gap-1 ${prod.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            <Package size={14} /> {prod.stock}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-xs font-medium text-slate-500">No hay productos asignados a este lote aún.</p>
                  </div>
                )}
              </div>
            )}
            {/* ======================================================================================= */}
            
          </div>
        ))}
        {lotes.length === 0 && <p className="col-span-2 text-center text-slate-500 py-10">No has creado ningún lote de importación aún.</p>}
      </div>
    </div>
  );
}