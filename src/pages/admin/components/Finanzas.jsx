import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Wallet, CalendarDays, CheckCircle2, RotateCcw, Lock } from 'lucide-react';

const BASE_API_URL = `${import.meta.env.VITE_API_URL}/api`;

export default function Finanzas({ user, lotes, ventas, arriendos, cargarLotes, cargarFinanzas, config }) {
  const [inversionesTemp, setInversionesTemp] = useState({});
  const [nombresTemp, setNombresTemp] = useState({});
  const [fechaInicioArriendo, setFechaInicioArriendo] = useState('');
  
  // SEGURIDAD MÁXIMA: Identificamos si el que inició sesión es exclusivamente Andrés por su correo
  const esAndres = user?.email === 'andres.fer0279@gmail.com';

  useEffect(() => {
    const invs = {};
    const noms = {};
    lotes.forEach(l => {
      invs[l.id] = l.inversionSocio || 0;
      noms[l.id] = l.nombreSocio || 'Socio';
    });
    setInversionesTemp(invs);
    setNombresTemp(noms);
  }, [lotes]);

  const handleActualizarDatosSocio = async (idLote) => {
    if (!esAndres) return toast.error('No tienes permisos para editar finanzas');
    try {
      const inv = inversionesTemp[idLote] || 0;
      const nom = nombresTemp[idLote] || 'Socio';
      await axios.put(`${BASE_API_URL}/importaciones/${idLote}/inversion`, { inversionSocio: inv, nombreSocio: nom }, config);
      toast.success('Datos del socio guardados exitosamente');
      cargarLotes();
    } catch(e) { toast.error('Error al guardar datos'); }
  };

  const handleGenerarReportePago = async () => {
    if (!esAndres) return toast.error('No tienes permisos');
    if (!fechaInicioArriendo) return toast.error("Selecciona la fecha de pago inicial");
    try {
      await axios.post(`${BASE_API_URL}/finanzas/arriendo/iniciar`, { fechaInicio: fechaInicioArriendo, monto: 25 }, config);
      toast.success('Reporte de pago anual generado');
      cargarFinanzas();
    } catch(e) { toast.error('Error al generar arriendo'); }
  };

  const handlePagarArriendo = async (id) => {
    if (!esAndres) return toast.error('No tienes permisos');
    if (!window.confirm('¿Confirmas que este mes ha sido pagado?')) return;
    try {
      await axios.put(`${BASE_API_URL}/finanzas/arriendo/${id}/pagar`, {}, config);
      toast.success('Mensualidad registrada como pagada');
      cargarFinanzas();
    } catch(e) { toast.error('Error al registrar pago'); }
  };

  const handleReiniciarContrato = async () => {
    if (!esAndres) return toast.error('No tienes permisos');
    if (!window.confirm('¿Estás seguro de eliminar el reporte actual de pagos para generar uno nuevo?')) return;
    try {
      await axios.delete(`${BASE_API_URL}/finanzas/arriendo/reiniciar`, config);
      toast.success('Reporte de pagos reiniciado');
      cargarFinanzas();
    } catch(e) { toast.error('Error al reiniciar'); }
  };

  let miGananciaGlobalAcumulada = 0;

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* Banner de Advertencia si entra un Socio */}
      {!esAndres && (
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex items-center gap-3 text-yellow-800 font-bold mb-4">
          <Lock size={20} /> Estás en modo Lectura, no tienes permisos para modificar.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* COLUMNA 1: REPARTICIÓN */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-100 pb-3"><Wallet className="text-blue-600"/> Repartición por Lotes</h2>
          
          {lotes.map(lote => {
            const totalLote = lote.costoTotalLote || 0;
            const invSocio = lote.inversionSocio || 0;
            const invMia = totalLote - invSocio;
            const pctSocio = totalLote > 0 ? (invSocio / totalLote) * 100 : 0;
            const pctMio = totalLote > 0 ? 100 - pctSocio : 0;

            const ventasLote = ventas.filter(v => v.product?.importationId === lote.id);
            const gananciaLote = ventasLote.reduce((acc, v) => acc + v.gananciaNeta, 0);

            const gananciaSocio = gananciaLote * (pctSocio / 100);
            const gananciaMia = gananciaLote * (pctMio / 100);
            miGananciaGlobalAcumulada += gananciaMia;

            // TEXTOS DINÁMICOS
            const nombreSocioRegistrado = lote.nombreSocio || 'Socio';
            const nombreMioBarra = esAndres ? "TÚ" : "ANDRÉS";
            const nombreSocioBarra = esAndres ? nombreSocioRegistrado.toUpperCase() : "TÚ";
            const labelCajaAndres = esAndres ? "Tus Ganancias" : "Parte de Andrés";
            const labelCajaSocio = esAndres ? `Pagar a ${nombreSocioRegistrado}` : "Tus Ganancias";

            return (
              <div key={lote.id} className="mb-8 border-b border-slate-200 pb-8 last:border-0 last:mb-0 last:pb-0">
                <h3 className="font-black text-lg text-slate-900 mb-3">{lote.nombre}</h3>
                
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                  <div className="flex flex-col sm:flex-row gap-4 mb-3">
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 font-bold uppercase mb-1">Costo Importación</p>
                      <p className="text-lg font-black text-slate-900">${totalLote.toFixed(2)}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 font-bold uppercase mb-1">Nombre del Socio</p>
                      <input 
                         type="text" placeholder="Ej: Juan Perez"
                         className="border border-slate-300 rounded-lg p-2 w-full text-sm font-bold disabled:bg-slate-200 focus:border-blue-500 outline-none" 
                         value={nombresTemp[lote.id] !== undefined ? nombresTemp[lote.id] : ''} 
                         onChange={e => setNombresTemp({...nombresTemp, [lote.id]: e.target.value})}
                         disabled={!esAndres}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Inversión de {nombreSocioRegistrado} ($)</p>
                    <div className="flex gap-2">
                       <input 
                         type="number" className="border border-slate-300 rounded-lg p-2 w-full text-sm font-bold disabled:bg-slate-200 focus:border-blue-500 outline-none" 
                         value={inversionesTemp[lote.id] !== undefined ? inversionesTemp[lote.id] : ''} 
                         onChange={e => setInversionesTemp({...inversionesTemp, [lote.id]: e.target.value})}
                         disabled={!esAndres}
                       />
                       {esAndres && (
                         <button onClick={() => handleActualizarDatosSocio(lote.id)} className="bg-blue-600 text-white px-4 rounded-lg font-bold hover:bg-blue-700 transition">Guardar</button>
                       )}
                    </div>
                  </div>
                </div>
                
                <div className="flex h-3 rounded-full overflow-hidden mb-2 bg-slate-200">
                  <div style={{width: `${pctMio}%`}} className="bg-blue-500"></div>
                  <div style={{width: `${pctSocio}%`}} className="bg-purple-500"></div>
                </div>
                <div className="flex justify-between text-xs font-black uppercase mb-5 tracking-wide">
                  <span className="text-blue-600">{nombreMioBarra}: {pctMio.toFixed(1)}% (${invMia.toFixed(2)})</span>
                  <span className="text-purple-600">{nombreSocioBarra}: {pctSocio.toFixed(1)}% (${invSocio.toFixed(2)})</span>
                </div>

                <div className="bg-white border-2 border-green-100 rounded-xl p-4 shadow-sm">
                   <p className="text-xs text-slate-500 font-bold uppercase mb-1">Utilidad Neta (Generada por Ventas)</p>
                   <p className="text-2xl font-black text-green-600 mb-3">${gananciaLote.toFixed(2)}</p>
                   <div className="flex flex-col sm:flex-row justify-between items-center border-t border-green-50 pt-3 gap-2">
                     <div className="bg-blue-50 px-3 py-2 rounded-lg border border-blue-100 w-full text-center sm:text-left">
                       <p className="text-[10px] uppercase font-bold text-blue-600">{labelCajaAndres}</p>
                       <p className="text-lg font-black text-blue-900">${gananciaMia.toFixed(2)}</p>
                     </div>
                     <div className="bg-purple-50 px-3 py-2 rounded-lg border border-purple-100 w-full text-center sm:text-right">
                       <p className="text-[10px] uppercase font-bold text-purple-600">{labelCajaSocio}</p>
                       <p className="text-lg font-black text-purple-900">${gananciaSocio.toFixed(2)}</p>
                     </div>
                   </div>
                </div>
              </div>
            )
          })}
          {lotes.length === 0 && <p className="text-slate-500 font-medium">Aún no hay importaciones registradas.</p>}
        </div>

        {/* COLUMNA 2: ARRIENDO */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-fit">
           <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold flex items-center gap-2"><CalendarDays className="text-red-600"/> Arriendo Local</h2>
              {(arriendos.length > 0 && esAndres) && (
                <button onClick={handleReiniciarContrato} className="text-xs flex items-center gap-1 font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded transition"><RotateCcw size={14}/> Reiniciar</button>
              )}
           </div>
           
           {arriendos.length === 0 ? (
             <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center">
               <p className="text-red-800 font-bold mb-4">Aún no hay reporte de pagos de local ($25/mes).</p>
               {esAndres ? (
                 <>
                   <label className="block text-left text-sm font-bold text-red-900 mb-1">Fecha de inicio del pago mensual:</label>
                   <input type="date" className="border border-red-200 p-3 rounded-xl mb-4 w-full outline-none focus:border-red-500 bg-white" value={fechaInicioArriendo} onChange={e => setFechaInicioArriendo(e.target.value)} />
                   <button onClick={handleGenerarReportePago} className="bg-red-600 text-white font-bold w-full py-3 rounded-xl hover:bg-red-700 transition shadow-sm">Generar reporte de pago</button>
                 </>
               ) : (
                 <p className="text-sm text-slate-600 font-medium">Andrés es el único que puede configurar el arriendo inicial del local.</p>
               )}
             </div>
           ) : (
             <div className="flex-1 flex flex-col">
               
               {/* SOLO ANDRÉS PUEDE VER ESTOS TOTALES */}
               {esAndres && (
                 <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-wide">Tus Ganancias Acumuladas</p>
                      <p className="text-xl sm:text-2xl font-black text-blue-900">${miGananciaGlobalAcumulada.toFixed(2)}</p>
                   </div>
                   <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                      <p className="text-[10px] font-black text-red-600 uppercase tracking-wide">Arriendo Pagado</p>
                      <p className="text-xl sm:text-2xl font-black text-red-900">
                        ${arriendos.filter(a => a.estado === 'Pagado').reduce((sum, a) => sum + a.monto, 0).toFixed(2)}
                      </p>
                   </div>
                 </div>
               )}
               
               <p className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">Desglose Mensual:</p>
               <div className="flex-1 overflow-y-auto max-h-[400px] pr-2 space-y-2 hide-scroll">
                 {arriendos.map((pago, index) => (
                   <div key={pago.id} className={`flex justify-between items-center p-4 rounded-xl border transition-colors ${pago.estado === 'Pagado' ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
                     <div>
                       <p className="font-black text-slate-900">Mes {index + 1} <span className="text-slate-400 font-medium">|</span> ${pago.monto.toFixed(2)}</p>
                       <p className="text-xs font-bold text-slate-500 mt-0.5">{new Date(pago.fechaProgramada).toLocaleDateString()}</p>
                     </div>
                     {pago.estado === 'Pagado' ? (
                       <span className="flex items-center gap-1 text-xs font-black text-green-700 bg-green-200 px-3 py-1.5 rounded-lg"><CheckCircle2 size={16}/> PAGADO</span>
                     ) : (
                       esAndres ? (
                         <button onClick={() => handlePagarArriendo(pago.id)} className="text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition shadow-sm">Pagar</button>
                       ) : (
                         <span className="text-xs font-bold text-slate-400 px-2 py-1 bg-slate-100 rounded">PENDIENTE</span>
                       )
                     )}
                   </div>
                 ))}
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}