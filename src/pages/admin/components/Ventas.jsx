import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Search, Filter, DollarSign, TrendingUp, X, Edit, RotateCcw, PackageCheck, Plus } from 'lucide-react';

const BASE_API_URL = `${import.meta.env.VITE_API_URL}/api`;

export default function Ventas({ ventas, productos, lotes, cargarVentas, cargarProductos, cargarLotes, config }) {
  const [mostrarFormVenta, setMostrarFormVenta] = useState(false);
  const [ventaEditando, setVentaEditando] = useState(null); 
  
  const [busquedaLista, setBusquedaLista] = useState(""); 
  const [filtroLoteVentas, setFiltroLoteVentas] = useState("Todos"); 
  
  // Filtros internos para el nuevo panel de selección en el Modal
  const [busquedaModal, setBusquedaModal] = useState(""); 
  const [filtroCategoriaModal, setFiltroCategoriaModal] = useState("Todas");

  const [formVenta, setFormVenta] = useState({
    productId: '', cantidad: 1, precioVentaTotal: '', tipoEntrega: 'Local',
    gastos: { envio: '', transporte: '', alimentacion: '' }
  });

  const totalHistoricoVentas = ventas.reduce((acc, v) => acc + v.precioVentaTotal, 0);
  const totalHistoricoGanancia = ventas.reduce((acc, v) => acc + v.gananciaNeta, 0);

  const abrirNuevaVenta = () => {
    setVentaEditando(null);
    setFormVenta({ productId: '', cantidad: 1, precioVentaTotal: '', tipoEntrega: 'Local', gastos: { envio: '', transporte: '', alimentacion: '' } });
    setBusquedaModal("");
    setFiltroCategoriaModal("Todas");
    setMostrarFormVenta(true);
  };

  const abrirEditarVenta = (venta) => {
    setVentaEditando(venta);
    setFormVenta({
      productId: venta.productId, cantidad: venta.cantidad, precioVentaTotal: venta.precioVentaTotal,
      tipoEntrega: venta.tipoEntrega, gastos: venta.gastosDetalle || { envio: '', transporte: '', alimentacion: '' }
    });
    setMostrarFormVenta(true);
  };

  const handleGuardarVenta = async (e) => {
    e.preventDefault();
    if (!formVenta.productId) return toast.error('Debes seleccionar un producto de la lista dando clic sobre él');

    const totalGastos = Number(formVenta.gastos.envio || 0) + Number(formVenta.gastos.transporte || 0) + Number(formVenta.gastos.alimentacion || 0);
    const datosVenta = {
      productId: parseInt(formVenta.productId), cantidad: parseInt(formVenta.cantidad),
      precioVentaTotal: parseFloat(formVenta.precioVentaTotal), tipoEntrega: formVenta.tipoEntrega,
      gastosDetalle: formVenta.gastos, totalGastos
    };

    try {
      if (ventaEditando) {
        await axios.put(`${BASE_API_URL}/ventas/${ventaEditando.id}`, datosVenta, config);
        toast.success('Venta actualizada');
      } else {
        await axios.post(`${BASE_API_URL}/ventas`, datosVenta, config);
        toast.success('Venta registrada');
      }
      setMostrarFormVenta(false); cargarVentas(); cargarProductos(); cargarLotes();
    } catch (error) { toast.error(error.response?.data?.error || 'Error al guardar venta'); }
  };

  const handleDeshacerVenta = async (idVenta) => {
    if (!window.confirm('¿Estás seguro de deshacer esta venta? El registro se eliminará y el stock se devolverá.')) return;
    try {
      await axios.delete(`${BASE_API_URL}/ventas/${idVenta}`, config);
      toast.success('Venta anulada. Stock devuelto.'); cargarVentas(); cargarProductos(); cargarLotes(); 
    } catch (e) { toast.error('Error al deshacer'); }
  };

  const ventasFiltradas = ventas.filter(v => {
    const matchLote = filtroLoteVentas === "Todos" || (filtroLoteVentas === "SinLote" ? !v.product?.importationId : v.product?.importationId === parseInt(filtroLoteVentas));
    const term = busquedaLista.toLowerCase();
    const matchTexto = v.product?.nombre?.toLowerCase().includes(term) || v.tipoEntrega.toLowerCase().includes(term);
    return matchLote && matchTexto;
  });

  // Filtro inteligente para la lista interactiva del Modal
  const productosParaVender = productos.filter(p => {
    if (p.stock <= 0 && p.id !== formVenta.productId) return false; // Oculta sin stock (salvo el que ya estaba seleccionado al editar)
    if (filtroCategoriaModal !== "Todas" && p.categoria !== filtroCategoriaModal) return false;
    if (busquedaModal && !p.nombre.toLowerCase().includes(busquedaModal.toLowerCase())) return false;
    return true;
  });

  const getLoteName = (id) => {
    if (!id) return 'Sin asignar';
    const lote = lotes.find(l => l.id === id);
    return lote ? lote.nombre : 'Sin asignar';
  };

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* TARJETAS DE TOTALES GLOBALES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md flex items-center justify-between">
           <div>
             <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Ingresos Históricos</p>
             <p className="text-3xl font-black">${totalHistoricoVentas.toFixed(2)}</p>
           </div>
           <DollarSign size={40} className="text-slate-700" />
        </div>
        <div className="bg-green-600 text-white p-5 rounded-2xl shadow-md flex items-center justify-between md:col-span-2">
           <div>
             <p className="text-green-200 text-sm font-bold uppercase tracking-wider mb-1">Ganancia Neta Acumulada</p>
             <p className="text-3xl font-black">${totalHistoricoGanancia.toFixed(2)}</p>
           </div>
           <TrendingUp size={40} className="text-green-800" />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Historial de Ventas</h2>
        <button onClick={abrirNuevaVenta} className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 shadow-sm transition">
          <Plus size={18} /> <span className="hidden sm:inline">Registrar Venta</span>
        </button>
      </div>

      {/* BARRA DE BÚSQUEDA Y FILTRO PRINCIPAL */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex-1 flex items-center gap-2 w-full border bg-slate-50 p-2.5 rounded-xl focus-within:border-slate-300 transition-colors">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Buscar venta por producto o entrega..." className="w-full outline-none bg-transparent font-medium" value={busquedaLista} onChange={e => setBusquedaLista(e.target.value)} />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 md:border-l md:pl-4 pt-3 md:pt-0">
          <Filter size={18} className="text-slate-400 shrink-0" />
          {/* Se usa max-w-full y text-ellipsis para que no se desborde en móviles */}
          <select className="p-2 outline-none font-bold text-slate-700 w-full md:w-64 cursor-pointer bg-transparent truncate" value={filtroLoteVentas} onChange={e => setFiltroLoteVentas(e.target.value)}>
            <option value="Todos">Todas las Ventas</option>
            <option value="SinLote">Sin Lote asignado</option>
            {lotes.map(l => <option key={l.id} value={l.id}>{l.nombre}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[850px]">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b border-slate-100">
              <tr><th className="px-4 py-4">Fecha</th><th className="px-4 py-4">Producto</th><th className="px-4 py-4 text-center">Cant.</th><th className="px-4 py-4">Entrega</th><th className="px-4 py-4">Ingreso</th><th className="px-4 py-4 text-red-500">Gastos</th><th className="px-4 py-4 text-green-600">Ganancia</th><th className="px-4 py-4 text-center">Acciones</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {ventasFiltradas.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4">{new Date(v.fecha).toLocaleDateString()}</td>
                  <td className="px-4 py-4 font-bold text-slate-900">{v.product?.nombre || 'Producto Eliminado'}</td>
                  <td className="px-4 py-4 text-center">{v.cantidad}</td>
                  <td className="px-4 py-4"><span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold">{v.tipoEntrega}</span></td>
                  <td className="px-4 py-4 font-bold">${v.precioVentaTotal.toFixed(2)}</td>
                  <td className="px-4 py-4 font-bold text-red-500">-${v.totalGastos.toFixed(2)}</td>
                  <td className="px-4 py-4 font-black text-green-600">${v.gananciaNeta.toFixed(2)}</td>
                  <td className="px-4 py-4 text-center flex justify-center gap-1">
                    <button onClick={() => abrirEditarVenta(v)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Editar venta"><Edit size={16} /></button>
                    <button onClick={() => handleDeshacerVenta(v.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Anular venta y restaurar stock"><RotateCcw size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {ventasFiltradas.length === 0 && <p className="text-center text-slate-500 py-10">No hay ventas registradas en este filtro.</p>}
        </div>
      </div>

      {/* MODAL: FORMULARIO DE VENTA */}
      {mostrarFormVenta && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
           <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl overflow-y-auto max-h-[95vh]">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-black flex items-center gap-2"><TrendingUp size={24} className="text-green-600"/> {ventaEditando ? 'Editar Venta' : 'Registrar Venta Manual'}</h2>
               <button onClick={() => setMostrarFormVenta(false)} className="p-2 hover:bg-slate-100 rounded-full"><X /></button>
             </div>
             
             <form onSubmit={handleGuardarVenta} className="space-y-6">
               
               {/* PANEL INTERACTIVO DE PRODUCTOS (REEMPLAZA AL SELECT NATIVO) */}
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                 <label className="block text-sm font-bold text-slate-900 mb-3">1. Busca y da clic sobre el producto vendido</label>
                 
                 <div className="flex flex-col sm:flex-row gap-2 mb-3">
                   <div className="flex items-center gap-2 border bg-white p-2.5 rounded-xl flex-1 focus-within:border-blue-500 transition-colors">
                     <Search size={18} className="text-slate-400" />
                     <input type="text" placeholder="Buscar por nombre o modelo..." className="w-full outline-none text-sm bg-transparent" value={busquedaModal} onChange={e => setBusquedaModal(e.target.value)} disabled={!!ventaEditando} />
                   </div>
                   <select className="border bg-white p-2.5 rounded-xl text-sm font-bold disabled:bg-slate-100 outline-none focus:border-blue-500" value={filtroCategoriaModal} onChange={e => setFiltroCategoriaModal(e.target.value)} disabled={!!ventaEditando}>
                      <option value="Todas">Todas las categorías</option>
                      <option value="Motos">Motos</option><option value="Autos">Autos</option>
                      <option value="Hot Wheels">Hot Wheels</option><option value="Accesorios">Accesorios</option>
                   </select>
                 </div>

                 {/* Lista Scrolleable Personalizada */}
                 <div className={`border rounded-xl bg-white overflow-y-auto shadow-inner ${ventaEditando ? 'h-auto opacity-70' : 'h-48'}`}>
                    {productosParaVender.length > 0 ? productosParaVender.map(p => {
                       const isSelected = formVenta.productId === p.id;
                       return (
                         <div 
                           key={p.id} 
                           onClick={() => !ventaEditando && setFormVenta({...formVenta, productId: p.id})}
                           className={`p-3 border-b last:border-0 flex justify-between items-center transition-all ${ventaEditando ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50'} ${isSelected ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}
                         >
                           <div>
                             <p className={`font-bold text-sm ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>{p.escala ? `${p.nombre} (${p.escala})` : p.nombre}</p>
                             <p className="text-xs text-slate-500 font-medium mt-0.5">Costo Unitario: ${p.costoUnitario} <span className="mx-1">•</span> Lote: {getLoteName(p.importationId)}</p>
                           </div>
                           <div className="text-right flex items-center gap-3">
                             <p className="text-xs font-black bg-slate-100 px-2 py-1 rounded text-slate-600">Stock: {p.stock}</p>
                             {isSelected && <PackageCheck size={20} className="text-blue-600" />}
                           </div>
                         </div>
                       )
                    }) : <p className="p-6 text-center text-slate-400 text-sm font-medium">No se encontraron productos disponibles.</p>}
                 </div>
                 {!formVenta.productId && !ventaEditando && <p className="text-xs text-red-500 mt-2 font-bold flex items-center gap-1">* Es obligatorio seleccionar un producto de la lista de arriba.</p>}
               </div>

               {/* DATOS DE LA VENTA */}
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <div><label className="block text-sm font-bold mb-1">Cantidad Vendida</label><input type="number" min="1" required className="w-full border p-3 rounded-xl focus:border-blue-500 outline-none" value={formVenta.cantidad} onChange={e => setFormVenta({...formVenta, cantidad: e.target.value})} /></div>
                 <div><label className="block text-sm font-bold mb-1 text-green-700">Cobrado al Cliente ($)</label><input type="number" step="0.01" required className="w-full border-2 p-3 rounded-xl border-green-300 bg-green-50 font-black text-green-800 outline-none focus:border-green-600" value={formVenta.precioVentaTotal} onChange={e => setFormVenta({...formVenta, precioVentaTotal: e.target.value})} /></div>
                 <div>
                   <label className="block text-sm font-bold mb-1">Tipo de Entrega</label>
                   <select className="w-full border p-3 rounded-xl focus:border-blue-500 outline-none bg-white" value={formVenta.tipoEntrega} onChange={e => setFormVenta({...formVenta, tipoEntrega: e.target.value})}>
                     <option value="Local">Local (Sin gastos)</option><option value="Servientrega">Servientrega</option><option value="Cooperativa">Cooperativa</option><option value="Personal">Personal (Quito)</option>
                   </select>
                 </div>
               </div>

               {/* GASTOS DE OPERACIÓN */}
               {formVenta.tipoEntrega !== 'Local' && (
                 <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                   <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">Gastos de Operación (costo para enviar/entregar el paquete)</p>
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                     {(formVenta.tipoEntrega === 'Servientrega' || formVenta.tipoEntrega === 'Cooperativa') && (<div><label className="block text-xs font-bold mb-1">Costo Envío ($)</label><input type="number" step="0.01" className="w-full border p-2 rounded-lg outline-none focus:border-red-400" value={formVenta.gastos.envio} onChange={e => setFormVenta({...formVenta, gastos: {...formVenta.gastos, envio: e.target.value}})} /></div>)}
                     {(formVenta.tipoEntrega === 'Cooperativa' || formVenta.tipoEntrega === 'Personal') && (<div><label className="block text-xs font-bold mb-1">Transporte/Taxi ($)</label><input type="number" step="0.01" className="w-full border p-2 rounded-lg outline-none focus:border-red-400" value={formVenta.gastos.transporte} onChange={e => setFormVenta({...formVenta, gastos: {...formVenta.gastos, transporte: e.target.value}})} /></div>)}
                     {formVenta.tipoEntrega === 'Personal' && (<div><label className="block text-xs font-bold mb-1">Alimentación ($)</label><input type="number" step="0.01" className="w-full border p-2 rounded-lg outline-none focus:border-red-400" value={formVenta.gastos.alimentacion} onChange={e => setFormVenta({...formVenta, gastos: {...formVenta.gastos, alimentacion: e.target.value}})} /></div>)}
                   </div>
                 </div>
               )}

               <div className="pt-4 border-t border-slate-100">
                 <button type="submit" disabled={!formVenta.productId} className="w-full py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition shadow-lg text-lg">
                    {ventaEditando ? 'Guardar Cambios' : 'Confirmar Venta y Descontar Stock'}
                 </button>
               </div>
             </form>
           </div>
         </div>
       )}
    </div>
  );
}