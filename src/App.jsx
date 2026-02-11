import AdminDashboard from './pages/AdminDashboard';
import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'; 
import { Toaster } from 'react-hot-toast'; // 1. Importación de la librería

import Navbar from './components/BarraNavegacion'; 
import CartDrawer from './components/CarritoLateral'; 
import Home from './pages/Inicio';
import Catalog from './pages/Catalogo';
import Pruebas from './pages/Pruebas';
import ProductoDetalle from "./pages/ProductoDetalle";
import Footer from "./components/Footer";

import { useCarrito } from './hooks/useCarrito';
import { useProductos } from './hooks/useProductos';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const action = useNavigationType(); // Detecta si es PUSH, POP o REPLACE

  useEffect(() => {
    // Si la acción NO es "volver atrás" (POP), entonces sube el scroll.
    if (action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, action]);
  
  return null;
};

function App() {
  const { 
    carrito, isCarritoAbierto, setIsCarritoAbierto, agregarAlCarrito, 
    eliminarDelCarrito, actualizarCantidad, totalCarrito 
  } = useCarrito();

  // OBTENEMOS LOS DATOS REALES DE LA NUBE
  const { productos, loading } = useProductos();

  // Pantalla de carga simple
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-bold">Cargando Tienda...</div>;
  }

  // FILTRAMOS LOS PRODUCTOS
  const listaMotos = productos.filter(p => p.categoria === 'Motos');
  const listaAutos = productos.filter(p => p.categoria === 'Autos');
  const listaHotWheels = productos.filter(p => p.categoria === 'Hot Wheels');
  const listaAccesorios = productos.filter(p => p.categoria === 'Accesorios');

  const destacados = productos.filter(p => p.destacado === true).slice(0, 8); 

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <ScrollToTop />
      
      {/* 2. AQUÍ COLOCAMOS EL COMPONENTE PARA QUE SE VEAN LAS NOTIFICACIONES */}
      <Toaster position="top-center" reverseOrder={false} />
      
      <Navbar 
        carritoCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)} 
        onOpenCart={() => setIsCarritoAbierto(true)}
      />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <Home 
              productos={destacados}
              agregarAlCarrito={agregarAlCarrito}
            />
          } />

          <Route path="/motos" element={
             <Catalog 
               productosIniciales={listaMotos}
               titulo="Motos a Escala"
               agregarAlCarrito={agregarAlCarrito}
             />
          } />

          <Route path="/autos" element={
             <Catalog 
               productosIniciales={listaAutos}
               titulo="Autos a Escala"
               agregarAlCarrito={agregarAlCarrito}
             />
          } />

          <Route path="/hotwheels" element={
             <Catalog 
               productosIniciales={listaHotWheels}
               titulo="Hot Wheels"
               agregarAlCarrito={agregarAlCarrito}
             />
          } />

          <Route path="/accesorios" element={
             <Catalog 
               productosIniciales={listaAccesorios}
               titulo="Accesorios"
               subtitulo="Complementos para tu colección"
               agregarAlCarrito={agregarAlCarrito}
               esAccesorios={true}
             />
          } />

          <Route path="/envios" element={ <Pruebas /> } />

          {/* RUTA DE ADMIN */}
          <Route path="/admin" element={ <AdminDashboard /> } />

          {/* DETALLE DE PRODUCTO */}
          <Route path="/producto/:categoria/:slug" element={
            <ProductoDetalle
              agregarAlCarrito={agregarAlCarrito}
              todosLosProductos={productos} 
            />
          } />

        </Routes>
      </main>

      <CartDrawer
        abierto={isCarritoAbierto}
        cerrar={() => setIsCarritoAbierto(false)}
        carrito={carrito}
        total={totalCarrito}
        eliminarItem={eliminarDelCarrito}
        actualizarCantidad={actualizarCantidad}
      />
      
      <Footer />
    </div>
  );
}

export default App;