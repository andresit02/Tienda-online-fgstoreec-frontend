import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Plus } from 'lucide-react';

const BASE_API_URL = `${import.meta.env.VITE_API_URL}/api`;

export default function Lotes({ lotes, cargarLotes, config }) {
  const [nuevoLoteNombre, setNuevoLoteNombre] = useState('');

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
              <h3 className="font-black text-lg text-slate-900">{lote.nombre}</h3>
              <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">{new Date(lote.fecha).toLocaleDateString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
              <div><p className="text-sm text-slate-500 font-medium">Costo Total Inicial</p><p className="text-xl font-black text-red-600">${(lote.costoTotalLote || 0).toFixed(2)}</p></div>
              <div><p className="text-sm text-slate-500 font-medium">Unidades Importadas</p><p className="text-xl font-black text-slate-900">{lote.cantidadUnidades || 0}</p></div>
            </div>
          </div>
        ))}
        {lotes.length === 0 && <p className="col-span-2 text-center text-slate-500 py-10">No has creado ningún lote de importación aún.</p>}
      </div>
    </div>
  );
}