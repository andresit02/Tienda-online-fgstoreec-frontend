import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Plus, X, Save, Search, Star, Loader, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useAuth } from '../context/AuthContext'; 

const API_URL = `${import.meta.env.VITE_API_URL}/api/productos`;

export default function AdminDashboard() {
  const { user, logout, token } = useAuth(); 
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  
  const initialFormState = {
    nombre: '', precio: 0, stock: 0, categoria: 'Motos',
    marca: '', fabricante: '', escala: '', serie: '', materiales: '', 
    medidasCaja: '', tipo: '', caracteristicas: '', descripcion: '', 
    imagenPrincipal: '', 
    galeria: ['', '', ''], 
    destacado: false 
  };

  const [formData, setFormData] = useState(initialFormState);

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    if (token) {
      const timeoutId = setTimeout(() => {
        cargarProductos();
      }, 400); 
      return () => clearTimeout(timeoutId);
    }
  }, [token, busqueda]);

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const res = await axios.get(`${API_URL}?search=${busqueda}`, config);
      setProductos(res.data.productos || res.data);
      setCargando(false);
    } catch (error) {
      setCargando(false);
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout(); 
      }
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`, config); 
      cargarProductos(); 
      toast.success('Producto eliminado');
    } catch (error) {
      toast.error('No se pudo eliminar');
    }
  };

  const abrirNuevo = () => {
    setProductoEditando(null);
    setFormData(initialFormState); 
    setMostrarFormulario(true);
  };

  const abrirEditar = (producto) => {
    setProductoEditando(producto);
    
    let galeriaArray = producto.imagenes?.galeria ? [...producto.imagenes.galeria] : [];
    while (galeriaArray.length < 3) {
      galeriaArray.push('');
    }

    setFormData({
      nombre: producto.nombre, 
      precio: producto.precio, 
      stock: producto.stock,
      categoria: producto.categoria, 
      marca: producto.marca || '',
      fabricante: producto.fabricante || '',
      escala: producto.escala || '',
      serie: producto.serie || '',
      materiales: producto.materiales || '',
      medidasCaja: producto.medidasCaja?.texto || (typeof producto.medidasCaja === 'string' ? producto.medidasCaja : ''),
      tipo: producto.tipo || '',
      caracteristicas: producto.caracteristicas ? producto.caracteristicas.join('\n') : '',
      descripcion: producto.descripcion || '',
      imagenPrincipal: producto.imagenes?.principal || '', 
      galeria: galeriaArray, 
      destacado: producto.destacado || false 
    });
    setMostrarFormulario(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const arrayGaleria = Array.isArray(formData.galeria) 
      ? formData.galeria.map(url => url.trim()).filter(url => url !== '') 
      : [];
      
    const arrayCaracteristicas = formData.caracteristicas ? formData.caracteristicas.split('\n').map(c => c.trim()).filter(c => c !== '') : [];

    const datosParaEnviar = {
      nombre: formData.nombre, 
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock), 
      categoria: formData.categoria, 
      descripcion: formData.descripcion, 
      caracteristicas: arrayCaracteristicas,
      destacado: formData.destacado,
      imagenes: { principal: formData.imagenPrincipal, galeria: arrayGaleria }
    };

    if (formData.categoria === 'Hot Wheels') {
      if (formData.marca) datosParaEnviar.marca = formData.marca;
      if (formData.escala) datosParaEnviar.escala = formData.escala;
      if (formData.serie) datosParaEnviar.serie = formData.serie;
    } else if (formData.categoria === 'Autos') {
      // MEJORA: Añadidos Fabricante, Materiales y MedidasCaja para Autos
      if (formData.marca) datosParaEnviar.marca = formData.marca;
      if (formData.fabricante) datosParaEnviar.fabricante = formData.fabricante;
      if (formData.escala) datosParaEnviar.escala = formData.escala;
      if (formData.materiales) datosParaEnviar.materiales = formData.materiales;
      if (formData.medidasCaja) datosParaEnviar.medidasCaja = { texto: formData.medidasCaja };
    } else if (formData.categoria === 'Motos') {
      if (formData.marca) datosParaEnviar.marca = formData.marca;
      if (formData.fabricante) datosParaEnviar.fabricante = formData.fabricante;
      if (formData.escala) datosParaEnviar.escala = formData.escala;
      if (formData.materiales) datosParaEnviar.materiales = formData.materiales;
      if (formData.medidasCaja) datosParaEnviar.medidasCaja = { texto: formData.medidasCaja };
    } else if (formData.categoria === 'Accesorios') {
      if (formData.tipo) datosParaEnviar.tipo = formData.tipo;
    }

    try {
      if (productoEditando) {
        await axios.put(`${API_URL}/${productoEditando.id}`, datosParaEnviar, config); 
        toast.success('Producto actualizado');
      } else {
        await axios.post(API_URL, datosParaEnviar, config); 
        toast.success('Producto creado');
      }
      setMostrarFormulario(false);
      cargarProductos();
    } catch (error) {
      toast.error('Error al guardar datos');
    }
  };

  const productosMostrados = productos.filter(p => {
    if (filtroCategoria === "Todas") return true;
    return p.categoria === filtroCategoria;
  });

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">Panel Administrador</h1>
            <p className="text-slate-500 text-sm">Hola {user?.nombre}, gestiona tu inventario</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
             <button onClick={abrirNuevo} className="flex-1 md:flex-none bg-slate-900 text-white px-4 py-2 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-slate-800 transition">
                <Plus size={20} /> <span className="hidden sm:inline">Nuevo Producto</span><span className="sm:hidden">Nuevo</span>
             </button>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-3 border border-slate-200 items-center">
          <div className="flex-1 flex items-center gap-2 w-full">
            <Search className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar producto en la base de datos..." 
              className="w-full outline-none" 
              value={busqueda} 
              onChange={(e) => setBusqueda(e.target.value)} 
            />
          </div>
          
          <div className="w-full md:w-auto flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-3">
            <Filter size={18} className="text-slate-400" />
            <select 
              className="p-2 outline-none bg-transparent text-sm font-bold text-slate-700 w-full md:w-48 cursor-pointer"
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              <option value="Todas">Todas las categorías</option>
              <option value="Motos">Motos a Escala</option>
              <option value="Autos">Autos a Escala</option>
              <option value="Hot Wheels">Hot Wheels</option>
              <option value="Accesorios">Accesorios</option>
            </select>
            {cargando && <Loader className="animate-spin text-slate-400 ml-2" size={20} />}
          </div>
        </div>

        {mostrarFormulario && (
           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
           <div className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold">{productoEditando ? 'Editar Producto' : 'Nuevo Producto'}</h2>
               <button onClick={() => setMostrarFormulario(false)} className="p-2 hover:bg-slate-100 rounded-full"><X /></button>
             </div>
             
             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
               
               <div className="col-span-2">
                 <label className="block text-sm font-bold mb-1">Nombre del Producto</label>
                 <input required className="w-full border p-2 rounded-lg" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
               </div>
               <div>
                 <label className="block text-sm font-bold mb-1">Precio ($)</label>
                 <input type="number" step="0.01" required className="w-full border p-2 rounded-lg" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} />
               </div>
               <div>
                 <label className="block text-sm font-bold mb-1">Stock Disponible</label>
                 <input type="number" required className="w-full border p-2 rounded-lg" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
               </div>
               
               <div className="col-span-2 bg-slate-50 p-3 rounded-lg border border-slate-200 mb-2">
                 <label className="block text-sm font-black text-slate-900 mb-1">Categoría del Producto</label>
                 <select 
                   className="w-full border p-2 rounded-lg bg-white disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed" 
                   value={formData.categoria} 
                   onChange={e => setFormData({...formData, categoria: e.target.value})}
                   disabled={!!productoEditando} 
                 >
                   <option value="Motos">Motos</option>
                   <option value="Autos">Autos</option>
                   <option value="Hot Wheels">Hot Wheels</option>
                   <option value="Accesorios">Accesorios</option>
                 </select>
                 {productoEditando && (
                   <p className="text-xs text-red-500 mt-1 font-bold">La categoría no se puede cambiar en modo edición para evitar pérdida de datos.</p>
                 )}
               </div>

               {formData.categoria === 'Hot Wheels' && (
                 <>
                   <div><label className="block text-sm font-bold mb-1">Serie</label>
                   <input className="w-full border p-2 rounded-lg" placeholder="Ej: Basicos, Premium" value={formData.serie} onChange={e => setFormData({...formData, serie: e.target.value})} /></div>
                   
                   <div><label className="block text-sm font-bold mb-1">Marca del vehículo</label>
                   <input className="w-full border p-2 rounded-lg" placeholder="Ej: Nissan, Ford" value={formData.marca} onChange={e => setFormData({...formData, marca: e.target.value})} /></div>
                   
                   <div className="col-span-2"><label className="block text-sm font-bold mb-1">Escala</label>
                   <input className="w-full border p-2 rounded-lg" placeholder="Ej: 1:64" value={formData.escala} onChange={e => setFormData({...formData, escala: e.target.value})} /></div>
                 </>
               )}

               {/* MEJORA: CAMPOS AÑADIDOS PARA AUTOS */}
               {formData.categoria === 'Autos' && (
                 <>
                   <div><label className="block text-sm font-bold mb-1">Fabricante</label>
                   <input className="w-full border p-2 rounded-lg" placeholder="Ej: Maisto, Welly" value={formData.fabricante} onChange={e => setFormData({...formData, fabricante: e.target.value})} /></div>
                   
                   <div><label className="block text-sm font-bold mb-1">Marca del vehículo</label>
                   <input className="w-full border p-2 rounded-lg" placeholder="Ej: Nissan, Ford" value={formData.marca} onChange={e => setFormData({...formData, marca: e.target.value})} /></div>
                   
                   <div><label className="block text-sm font-bold mb-1">Escala</label>
                   <input className="w-full border p-2 rounded-lg" placeholder="Ej: 1:24, 1:32" value={formData.escala} onChange={e => setFormData({...formData, escala: e.target.value})} /></div>

                   <div><label className="block text-sm font-bold mb-1">Materiales</label>
                   <input className="w-full border p-2 rounded-lg" placeholder="Ej: Metal y Plástico" value={formData.materiales} onChange={e => setFormData({...formData, materiales: e.target.value})} /></div>
                   
                   <div className="col-span-2"><label className="block text-sm font-bold mb-1">Medidas de la caja</label>
                   <input className="w-full border p-2 rounded-lg" placeholder="Ej: 20cm x 10cm x 15cm" value={formData.medidasCaja} onChange={e => setFormData({...formData, medidasCaja: e.target.value})} /></div>
                 </>
               )}

               {formData.categoria === 'Motos' && (
                 <>
                   <div><label className="block text-sm font-bold mb-1">Fabricante</label>
                   <input className="w-full border p-2 rounded-lg" placeholder="Ej: Maisto, Welly" value={formData.fabricante} onChange={e => setFormData({...formData, fabricante: e.target.value})} /></div>
                   
                   <div><label className="block text-sm font-bold mb-1">Marca de la Moto</label>
                   <input className="w-full border p-2 rounded-lg" placeholder="Ej: Yamaha, Honda" value={formData.marca} onChange={e => setFormData({...formData, marca: e.target.value})} /></div>
                   
                   <div><label className="block text-sm font-bold mb-1">Escala</label>
                   <input className="w-full border p-2 rounded-lg" placeholder="Ej: 1:12, 1:18" value={formData.escala} onChange={e => setFormData({...formData, escala: e.target.value})} /></div>
                   
                   <div><label className="block text-sm font-bold mb-1">Materiales</label>
                   <input className="w-full border p-2 rounded-lg" placeholder="Ej: Metal y Plástico" value={formData.materiales} onChange={e => setFormData({...formData, materiales: e.target.value})} /></div>
                   
                   <div className="col-span-2"><label className="block text-sm font-bold mb-1">Medidas de la caja</label>
                   <input className="w-full border p-2 rounded-lg" placeholder="Ej: 20cm x 10cm x 15cm" value={formData.medidasCaja} onChange={e => setFormData({...formData, medidasCaja: e.target.value})} /></div>
                 </>
               )}

               {formData.categoria === 'Accesorios' && (
                 <>
                   <div className="col-span-2"><label className="block text-sm font-bold mb-1">Tipo de Accesorio</label>
                   <input className="w-full border p-2 rounded-lg" placeholder="Ej: Gorra, Llavero, Casco" value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})} /></div>
                 </>
               )}

               <div className="col-span-2 mt-2">
                   <label className="block text-sm font-bold mb-1">Características (Una por línea)</label>
                   <textarea placeholder="Ej: Llantas de goma&#10;Apertura de puertas&#10;Suspensión activa" className="w-full border p-2 rounded-lg text-sm" rows="3" value={formData.caracteristicas} onChange={e => setFormData({...formData, caracteristicas: e.target.value})}></textarea>
               </div>

               <div className="col-span-2">
                   <label className="block text-sm font-bold mb-1">Descripción General</label>
                   <textarea className="w-full border p-2 rounded-lg text-sm" rows="3" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})}></textarea>
               </div>

               <div className="col-span-2 bg-yellow-50 p-3 rounded-lg border border-yellow-200 flex items-center gap-3 mt-2">
                   <input type="checkbox" id="destacadoCheck" className="w-5 h-5 accent-yellow-500" checked={formData.destacado} onChange={e => setFormData({...formData, destacado: e.target.checked})} />
                   <label htmlFor="destacadoCheck" className="text-sm font-bold text-yellow-800 cursor-pointer flex items-center gap-2"><Star size={16} fill="currentColor" /> Mostrar en Carrusel de Destacados (Inicio)</label>
               </div>
               
               <div className="col-span-2">
                 <label className="block text-sm font-bold mb-1">URL Imagen Principal</label>
                 <input required placeholder="https://res.cloudinary.com/..." className="w-full border p-2 rounded-lg" value={formData.imagenPrincipal} onChange={e => setFormData({...formData, imagenPrincipal: e.target.value})} />
                 {formData.imagenPrincipal && <img src={formData.imagenPrincipal} alt="Vista" className="mt-2 h-20 object-contain border rounded bg-slate-50" />}
               </div>

               <div className="col-span-2">
                 <label className="block text-sm font-bold mb-2">Galería Extra</label>
                 <div className="space-y-2">
                   {formData.galeria.map((url, index) => (
                     <div key={index} className="flex items-center gap-2">
                       <input
                         type="url"
                         placeholder="https://res.cloudinary.com/..."
                         className="w-full border p-2 rounded-lg text-sm"
                         value={url}
                         onChange={e => {
                           const nuevaGaleria = [...formData.galeria];
                           nuevaGaleria[index] = e.target.value;
                           setFormData({ ...formData, galeria: nuevaGaleria });
                         }}
                       />
                       <button
                         type="button"
                         onClick={() => {
                           const nuevaGaleria = [...formData.galeria];
                           if (nuevaGaleria.length > 3) {
                             nuevaGaleria.splice(index, 1);
                           } else {
                             nuevaGaleria[index] = '';
                           }
                           setFormData({ ...formData, galeria: nuevaGaleria });
                         }}
                         className="p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                         title="Limpiar o eliminar campo"
                       >
                         <X size={18} />
                       </button>
                     </div>
                   ))}
                 </div>
                 <button
                   type="button"
                   onClick={() => setFormData({ ...formData, galeria: [...formData.galeria, ''] })}
                   className="mt-3 text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                 >
                   <Plus size={16} /> Añadir otra imagen
                 </button>
               </div>

               <div className="col-span-2 mt-4 flex gap-3">
                 <button type="button" onClick={() => setMostrarFormulario(false)} className="flex-1 py-3 bg-slate-100 font-bold rounded-xl hover:bg-slate-200 transition">Cancelar</button>
                 <button type="submit" className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl flex justify-center items-center gap-2 hover:bg-slate-800 transition"><Save size={18} /> Guardar Producto</button>
               </div>
             </form>
           </div>
         </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left min-w-full">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
              <tr><th className="px-4 py-4">Producto</th><th className="px-4 py-4">Precio</th><th className="px-4 py-4">Stock</th><th className="px-4 py-4 text-center">Acciones</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {productosMostrados.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 flex items-center gap-3">
                    <img src={prod.imagenes?.principal} className="w-10 h-10 object-contain bg-white rounded border" alt="" />
                    <span className="font-bold line-clamp-1">{prod.nombre}</span>
                  </td>
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
          
          {productosMostrados.length === 0 && !cargando && (
            <div className="p-8 text-center text-slate-500 font-medium">
              No hay productos en esta categoría o búsqueda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}