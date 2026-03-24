import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Plus, X, Save, Search, Lock, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Para pruebas locales usamos el puerto 4000. Luego lo cambiaremos a Render.
const API_URL = 'https://tienda-online-fgstoreec-backend.onrender.com/api/productos';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  
  const initialFormState = {
    nombre: '', precio: 0, stock: 0, categoria: 'Motos',
    marca: '', imagenPrincipal: '', descripcion: '', destacado: false 
  };

  const [formData, setFormData] = useState(initialFormState);

  // OBTENER EL TOKEN DEL NAVEGADOR
  const token = localStorage.getItem('fgstore_token');
  
  // CONFIGURACIÓN PARA ENVIAR EL TOKEN AL BACKEND 
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    // Si no hay token, lo mandamos al login de inmediato
    if (!token) {
      toast.error("Debes iniciar sesión primero");
      navigate('/login');
      return;
    }
    cargarProductos();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("fgstore_token");
    toast.success("Sesión cerrada");
    navigate('/login');
  };

  const cargarProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductos(res.data);
      if (cargando) setCargando(false);
    } catch (error) {
      if (cargando) setCargando(false);
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout(); // Si el token expiró, lo sacamos
      }
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`, config); // Se envía el token
      setProductos(productos.filter(p => p.id !== id));
      toast.success('Producto eliminado');
    } catch (error) { toast.error('No se pudo eliminar'); }
  };

  const abrirNuevo = () => {
    setProductoEditando(null);
    setFormData(initialFormState); 
    setMostrarFormulario(true);
  };

  const abrirEditar = (producto) => {
    setProductoEditando(producto);
    setFormData({
      nombre: producto.nombre, precio: producto.precio, stock: producto.stock,
      categoria: producto.categoria, marca: producto.marca || '',
      imagenPrincipal: producto.imagenes?.principal || '', descripcion: producto.descripcion || '',
      destacado: producto.destacado || false 
    });
    setMostrarFormulario(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.destacado) {
      const destacadosActuales = productos.filter(p => p.destacado).length;
      const yaEraDestacado = productoEditando && productoEditando.destacado;

      if (!productoEditando || (productoEditando && !yaEraDestacado)) {
        if (destacadosActuales >= 8) {
          toast.error('¡Límite excedido! Ya tienes 8 productos destacados.');
          return; 
        }
      }
    }

    const datosParaEnviar = {
      nombre: formData.nombre, descripcion: formData.descripcion, precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock), categoria: formData.categoria, marca: formData.marca,
      destacado: formData.destacado,
      imagenes: { principal: formData.imagenPrincipal, galeria: productoEditando?.imagenes?.galeria || [] },
      caracteristicas: productoEditando?.caracteristicas || [] 
    };

    try {
      if (productoEditando) {
        await axios.put(`${API_URL}/${productoEditando.id}`, datosParaEnviar, config); // Se envía token
        toast.success('Producto actualizado');
        cargarProductos();
        setProductoEditando({ ...productoEditando, ...datosParaEnviar, id: productoEditando.id });
      } else {
        await axios.post(API_URL, datosParaEnviar, config); // Se envía token
        toast.success('Producto creado');
        setMostrarFormulario(false);
        abrirNuevo(); 
        cargarProductos();
      }
    } catch (error) {
      toast.error('Error al guardar: ' + (error.response?.data?.error || 'Sin permisos'));
    }
  };

  const productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  if (cargando) return <div className="p-10 text-center font-bold">Cargando Panel...</div>;

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">Panel Administrador</h1>
            <p className="text-slate-500 text-sm">Gestiona tu inventario (Modo Seguro)</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
             <button onClick={handleLogout} className="flex-1 md:flex-none bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-200 transition">Salir</button>
             <button onClick={abrirNuevo} className="flex-1 md:flex-none bg-slate-900 text-white px-4 py-2 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-slate-800 transition">
                <Plus size={20} /> <span className="hidden sm:inline">Nuevo Producto</span><span className="sm:hidden">Nuevo</span>
             </button>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm mb-6 flex gap-2 border border-slate-200">
          <Search className="text-slate-400" />
          <input type="text" placeholder="Buscar producto..." className="w-full outline-none" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
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
                  <label className="block text-sm font-bold mb-1">Nombre</label>
                  <input required className="w-full border p-2 rounded-lg" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Precio ($)</label>
                  <input type="number" step="0.01" required className="w-full border p-2 rounded-lg" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Stock</label>
                  <input type="number" required className="w-full border p-2 rounded-lg" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Categoría</label>
                  <select className="w-full border p-2 rounded-lg" value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})}>
                    <option value="Motos">Motos</option><option value="Autos">Autos</option><option value="Hot Wheels">Hot Wheels</option><option value="Accesorios">Accesorios</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Marca</label>
                  <input className="w-full border p-2 rounded-lg" value={formData.marca} onChange={e => setFormData({...formData, marca: e.target.value})} />
                </div>
                <div className="col-span-2 bg-yellow-50 p-3 rounded-lg border border-yellow-200 flex items-center gap-3">
                    <input type="checkbox" id="destacadoCheck" className="w-5 h-5 accent-yellow-500" checked={formData.destacado} onChange={e => setFormData({...formData, destacado: e.target.checked})} />
                    <label htmlFor="destacadoCheck" className="text-sm font-bold text-yellow-800 cursor-pointer flex items-center gap-2"><Star size={16} fill="currentColor" /> Mostrar en Destacados</label>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-1">URL Imagen</label>
                  <input required placeholder="https://..." className="w-full border p-2 rounded-lg" value={formData.imagenPrincipal} onChange={e => setFormData({...formData, imagenPrincipal: e.target.value})} />
                  {formData.imagenPrincipal && <img src={formData.imagenPrincipal} alt="Vista" className="mt-2 h-20 object-contain border rounded" />}
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-bold mb-1">Descripción</label>
                    <textarea className="w-full border p-2 rounded-lg" rows="3" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})}></textarea>
                </div>
                <div className="col-span-2 mt-4 flex gap-3">
                  <button type="button" onClick={() => setMostrarFormulario(false)} className="flex-1 py-3 bg-slate-100 font-bold rounded-xl">Cancelar</button>
                  <button type="submit" className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl flex justify-center items-center gap-2"><Save size={18} /> Guardar</button>
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
              {productosFiltrados.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4 flex items-center gap-3">
                    <img src={prod.imagenes?.principal} className="w-10 h-10 object-contain bg-white rounded border" alt="" />
                    <span className="font-bold">{prod.nombre}</span>
                  </td>
                  <td className="px-4 py-4 font-bold">${prod.precio}</td>
                  <td className="px-4 py-4">{prod.stock}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => abrirEditar(prod)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                      <button onClick={() => handleEliminar(prod.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;