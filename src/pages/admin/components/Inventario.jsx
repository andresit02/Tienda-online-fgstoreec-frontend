import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit, Plus, X, Save, Search, Star, Loader, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API_URL = `${import.meta.env.VITE_API_URL}/api/productos`;

export default function Inventario({ productos, lotes, cargarProductos, cargarLotes, config }) {
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  
  const initialFormState = {
    nombre: '', precio: 0, stock: 0, categoria: 'Motos',
    marca: '', fabricante: '', escala: '', serie: '', materiales: '', 
    medidasCaja: '', tipo: '', caracteristicas: '', descripcion: '', 
    imagenPrincipal: '', galeria: ['', '', ''], destacado: false,
    costoUnitario: 0, importationId: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const timeoutId = setTimeout(() => { cargarProductos(busqueda); }, 400); 
    return () => clearTimeout(timeoutId);
  }, [busqueda]);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de ocultar este producto? (El historial se conservará)')) return;
    try {
      await axios.delete(`${API_URL}/${id}`, config); 
      cargarProductos(busqueda); toast.success('Producto ocultado');
    } catch (e) { toast.error('Error al ocultar'); }
  };

  const abrirNuevo = () => { setProductoEditando(null); setFormData(initialFormState); setMostrarFormulario(true); };

  const abrirEditar = (producto) => {
    setProductoEditando(producto);
    let galeriaArray = producto.imagenes?.galeria ? [...producto.imagenes.galeria] : [];
    while (galeriaArray.length < 3) galeriaArray.push('');
    setFormData({
      nombre: producto.nombre, precio: producto.precio, stock: producto.stock,
      categoria: producto.categoria, marca: producto.marca || '', fabricante: producto.fabricante || '',
      escala: producto.escala || '', serie: producto.serie || '', materiales: producto.materiales || '',
      medidasCaja: producto.medidasCaja?.texto || (typeof producto.medidasCaja === 'string' ? producto.medidasCaja : ''),
      tipo: producto.tipo || '', caracteristicas: producto.caracteristicas ? producto.caracteristicas.join('\n') : '',
      descripcion: producto.descripcion || '', imagenPrincipal: producto.imagenes?.principal || '', 
      galeria: galeriaArray, destacado: producto.destacado || false,
      costoUnitario: producto.costoUnitario || 0, importationId: producto.importationId || ''
    });
    setMostrarFormulario(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const arrayGaleria = Array.isArray(formData.galeria) ? formData.galeria.map(url => url.trim()).filter(url => url !== '') : [];
    const arrayCaracteristicas = formData.caracteristicas ? formData.caracteristicas.split('\n').map(c => c.trim()).filter(c => c !== '') : [];

    const datosParaEnviar = {
      nombre: formData.nombre, precio: parseFloat(formData.precio), stock: parseInt(formData.stock), 
      categoria: formData.categoria, descripcion: formData.descripcion, 
      caracteristicas: arrayCaracteristicas, destacado: formData.destacado,
      costoUnitario: formData.importationId ? (parseFloat(formData.costoUnitario) || 0) : 0,
      importationId: formData.importationId ? parseInt(formData.importationId) : null,
      imagenes: { principal: formData.imagenPrincipal, galeria: arrayGaleria }
    };

    if (formData.categoria === 'Hot Wheels') {
      if (formData.marca) datosParaEnviar.marca = formData.marca;
      if (formData.escala) datosParaEnviar.escala = formData.escala;
      if (formData.serie) datosParaEnviar.serie = formData.serie;
    } else if (formData.categoria === 'Autos' || formData.categoria === 'Motos') {
      if (formData.marca) datosParaEnviar.marca = formData.marca;
      if (formData.fabricante) datosParaEnviar.fabricante = formData.fabricante;
      if (formData.escala) datosParaEnviar.escala = formData.escala;
      if (formData.materiales) datosParaEnviar.materiales = formData.materiales;
      if (formData.medidasCaja) datosParaEnviar.medidasCaja = { texto: formData.medidasCaja };
    } else if (formData.categoria === 'Accesorios') {
      if (formData.tipo) datosParaEnviar.tipo = formData.tipo;
    }

    try {
      if (productoEditando) { await axios.put(`${API_URL}/${productoEditando.id}`, datosParaEnviar, config); toast.success('Producto actualizado'); } 
      else { await axios.post(API_URL, datosParaEnviar, config); toast.success('Producto creado'); }
      setMostrarFormulario(false); cargarProductos(busqueda); cargarLotes(); 
    } catch (e) { toast.error('Error al guardar datos'); }
  };

  const productosMostrados = productos.filter(p => filtroCategoria === "Todas" || p.categoria === filtroCategoria);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-end items-center mb-4">
        <button onClick={abrirNuevo} className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-slate-800 transition">
          <Plus size={20} /> <span className="hidden sm:inline">Nuevo Producto</span><span className="sm:hidden">Nuevo</span>
        </button>
      </div>

      <div className="bg-white p-3 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-3 border border-slate-200 items-center">
        <div className="flex-1 flex items-center gap-2 w-full">
          <Search className="text-slate-400" />
          <input type="text" placeholder="Buscar producto en la base de datos..." className="w-full outline-none" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>
        <div className="w-full md:w-auto flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-3">
          <Filter size={18} className="text-slate-400" />
          <select className="p-2 outline-none bg-transparent text-sm font-bold text-slate-700 w-full md:w-48 cursor-pointer" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
            <option value="Todas">Todas las categorías</option>
            <option value="Motos">Motos a Escala</option>
            <option value="Autos">Autos a Escala</option>
            <option value="Hot Wheels">Hot Wheels</option>
            <option value="Accesorios">Accesorios</option>
          </select>
        </div>
      </div>

      {mostrarFormulario && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4 backdrop-blur-sm">
         <div className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-2xl shadow-2xl max-h-[85vh] overflow-y-auto pb-12">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold">{productoEditando ? 'Editar Producto' : 'Nuevo Producto'}</h2>
             <button onClick={() => setMostrarFormulario(false)} className="p-2 hover:bg-slate-100 rounded-full"><X /></button>
           </div>
           
           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="col-span-2"><label className="block text-sm font-bold mb-1">Nombre del Producto</label><input required className="w-full border p-2 rounded-lg" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} /></div>
             <div><label className="block text-sm font-bold mb-1">Precio de Venta ($)</label><input type="number" step="0.01" required className="w-full border p-2 rounded-lg" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} /></div>
             <div><label className="block text-sm font-bold mb-1">Stock Disponible</label><input type="number" required className="w-full border p-2 rounded-lg" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} /></div>

             <div className="col-span-2 bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col sm:flex-row gap-4 mb-2 mt-2">
               <div className="flex-1">
                 <label className="block text-sm font-black text-blue-900 mb-1">Lote de Importación</label>
                 <select className="w-full border border-blue-200 p-2 rounded-lg bg-white" value={formData.importationId} onChange={e => { const newLote = e.target.value; setFormData({...formData, importationId: newLote, costoUnitario: newLote ? formData.costoUnitario : 0 }); }}>
                   <option value="">Independiente / Sin asignar</option>
                   {lotes.map(lote => <option key={lote.id} value={lote.id}>{lote.nombre}</option>)}
                 </select>
               </div>
               <div className="flex-1">
                 <label className={`block text-sm font-black mb-1 ${!formData.importationId ? 'text-slate-400' : 'text-blue-900'}`}>Costo Unitario ($)</label>
                 <input type="number" step="0.01" className="w-full border border-blue-200 p-2 rounded-lg disabled:bg-slate-200 disabled:text-slate-400" value={formData.costoUnitario} onChange={e => setFormData({...formData, costoUnitario: e.target.value})} disabled={!formData.importationId} placeholder={!formData.importationId ? "Requiere lote..." : "Ej: 15.50"} />
                 {!formData.importationId && <p className="text-[10px] text-red-500 mt-1 font-bold">Selecciona un lote para ingresar costo.</p>}
               </div>
             </div>
             
             <div className="col-span-2 bg-slate-50 p-3 rounded-lg border border-slate-200 mb-2 mt-2">
               <label className="block text-sm font-black text-slate-900 mb-1">Categoría del Producto</label>
               <select className="w-full border p-2 rounded-lg bg-white disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed" value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})} disabled={!!productoEditando} >
                 <option value="Motos">Motos</option><option value="Autos">Autos</option><option value="Hot Wheels">Hot Wheels</option><option value="Accesorios">Accesorios</option>
               </select>
               {productoEditando && <p className="text-xs text-red-500 mt-1 font-bold">La categoría no se puede cambiar en modo edición para evitar pérdida de datos.</p>}
             </div>

             {formData.categoria === 'Hot Wheels' && (
               <>
                 <div><label className="block text-sm font-bold mb-1">Serie</label><input className="w-full border p-2 rounded-lg" value={formData.serie} onChange={e => setFormData({...formData, serie: e.target.value})} /></div>
                 <div><label className="block text-sm font-bold mb-1">Marca del vehículo</label><input className="w-full border p-2 rounded-lg" value={formData.marca} onChange={e => setFormData({...formData, marca: e.target.value})} /></div>
                 <div className="col-span-2"><label className="block text-sm font-bold mb-1">Escala</label><input className="w-full border p-2 rounded-lg" value={formData.escala} onChange={e => setFormData({...formData, escala: e.target.value})} /></div>
               </>
             )}

             {(formData.categoria === 'Autos' || formData.categoria === 'Motos') && (
               <>
                 <div><label className="block text-sm font-bold mb-1">Fabricante</label><input className="w-full border p-2 rounded-lg" value={formData.fabricante} onChange={e => setFormData({...formData, fabricante: e.target.value})} /></div>
                 <div><label className="block text-sm font-bold mb-1">Marca del vehículo</label><input className="w-full border p-2 rounded-lg" value={formData.marca} onChange={e => setFormData({...formData, marca: e.target.value})} /></div>
                 <div><label className="block text-sm font-bold mb-1">Escala</label><input className="w-full border p-2 rounded-lg" value={formData.escala} onChange={e => setFormData({...formData, escala: e.target.value})} /></div>
                 <div><label className="block text-sm font-bold mb-1">Materiales</label><input className="w-full border p-2 rounded-lg" value={formData.materiales} onChange={e => setFormData({...formData, materiales: e.target.value})} /></div>
                 <div className="col-span-2"><label className="block text-sm font-bold mb-1">Medidas de la caja</label><input className="w-full border p-2 rounded-lg" value={formData.medidasCaja} onChange={e => setFormData({...formData, medidasCaja: e.target.value})} /></div>
               </>
             )}

             {formData.categoria === 'Accesorios' && (
               <div className="col-span-2"><label className="block text-sm font-bold mb-1">Tipo de Accesorio</label><input className="w-full border p-2 rounded-lg" value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})} /></div>
             )}

             <div className="col-span-2 mt-2"><label className="block text-sm font-bold mb-1">Características (Una por línea)</label><textarea className="w-full border p-2 rounded-lg text-sm" rows="3" value={formData.caracteristicas} onChange={e => setFormData({...formData, caracteristicas: e.target.value})}></textarea></div>
             <div className="col-span-2"><label className="block text-sm font-bold mb-1">Descripción General</label><textarea className="w-full border p-2 rounded-lg text-sm" rows="3" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})}></textarea></div>
             
             <div className="col-span-2 bg-yellow-50 p-3 rounded-lg border border-yellow-200 flex items-center gap-3 mt-2">
                 <input type="checkbox" id="destacadoCheck" className="w-5 h-5 accent-yellow-500" checked={formData.destacado} onChange={e => setFormData({...formData, destacado: e.target.checked})} />
                 <label htmlFor="destacadoCheck" className="text-sm font-bold text-yellow-800 cursor-pointer flex items-center gap-2"><Star size={16} fill="currentColor" /> Mostrar en Carrusel de Destacados (Inicio)</label>
             </div>
             
             <div className="col-span-2"><label className="block text-sm font-bold mb-1">URL Imagen Principal</label><input required className="w-full border p-2 rounded-lg" value={formData.imagenPrincipal} onChange={e => setFormData({...formData, imagenPrincipal: e.target.value})} />{formData.imagenPrincipal && <img src={formData.imagenPrincipal} alt="Vista" className="mt-2 h-20 object-contain border rounded bg-slate-50" />}</div>

             <div className="col-span-2">
               <label className="block text-sm font-bold mb-2">Galería Extra</label>
               <div className="space-y-2">
                 {formData.galeria.map((url, index) => (
                   <div key={index} className="flex items-center gap-2">
                     <input type="url" className="w-full border p-2 rounded-lg text-sm" value={url} onChange={e => { const nuevaGaleria = [...formData.galeria]; nuevaGaleria[index] = e.target.value; setFormData({ ...formData, galeria: nuevaGaleria }); }} />
                     <button type="button" onClick={() => { const nuevaGaleria = [...formData.galeria]; if (nuevaGaleria.length > 3) { nuevaGaleria.splice(index, 1); } else { nuevaGaleria[index] = ''; } setFormData({ ...formData, galeria: nuevaGaleria }); }} className="p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors" title="Limpiar"><X size={18} /></button>
                   </div>
                 ))}
               </div>
               <button type="button" onClick={() => setFormData({ ...formData, galeria: [...formData.galeria, ''] })} className="mt-3 text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"><Plus size={16} /> Añadir otra imagen</button>
             </div>

             <div className="col-span-2 mt-6 mb-2 flex gap-3">
               <button type="button" onClick={() => setMostrarFormulario(false)} className="flex-1 py-3 bg-slate-100 font-bold rounded-xl hover:bg-slate-200 transition">Cancelar</button>
               <button type="submit" className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl flex justify-center items-center gap-2 hover:bg-slate-800 transition"><Save size={18} /> Guardar Producto</button>
             </div>
           </form>
         </div>
       </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="block md:hidden divide-y divide-slate-100">
          {productosMostrados.map((prod) => (
            <div key={prod.id} className="p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors">
              <img src={prod.imagenes?.principal} className="w-16 h-16 object-contain bg-white rounded-xl border border-slate-100 flex-shrink-0" alt="" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-slate-900 line-clamp-2 mb-1">{prod.nombre}</h3>
                <div className="flex items-center gap-3 text-xs font-medium text-slate-500"><span className="text-slate-900 font-black">${prod.precio}</span><span>Stock: {prod.stock}</span></div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button onClick={() => abrirEditar(prod)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"><Edit size={16} /></button>
                <button onClick={() => handleEliminar(prod.id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>

        <table className="hidden md:table w-full text-left min-w-full">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
            <tr><th className="px-4 py-4">Producto</th><th className="px-4 py-4">Precio</th><th className="px-4 py-4">Stock</th><th className="px-4 py-4 text-center">Acciones</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {productosMostrados.map((prod) => (
              <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-4 flex items-center gap-3"><img src={prod.imagenes?.principal} className="w-10 h-10 object-contain bg-white rounded border flex-shrink-0" alt="" /><span className="font-bold line-clamp-1">{prod.nombre}</span></td>
                <td className="px-4 py-4 font-bold">${prod.precio}</td>
                <td className="px-4 py-4">{prod.stock}</td>
                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => abrirEditar(prod)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit size={18} /></button>
                    <button onClick={() => handleEliminar(prod.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {productosMostrados.length === 0 && <div className="p-8 text-center text-slate-500 font-medium">No hay productos en esta categoría o búsqueda.</div>}
      </div>
    </div>
  );
}