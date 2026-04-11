import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'; 
import { Toaster } from 'react-hot-toast'; 

import ProtectedRoute from './components/ProtectedRoute'; 

import AdminDashboard from './pages/AdminDashboard';
import NavbarMejorada from './components/BarraNavegacion'; 
import CartDrawer from './components/CarritoLateral'; 
import Home from './pages/Inicio';
import Catalog from './pages/Catalogo';
import Pruebas from './pages/Pruebas';
import ProductoDetalle from "./pages/ProductoDetalle";
import Footer from "./components/Footer";
import AuthCallback from './pages/AuthCallback';
import Perfil from './pages/Perfil';
import Terminos from './pages/Terminos';
import Privacidad from './pages/Privacidad';

import LoginMejorado from './pages/Login'; 
import Registro from './pages/Registro';  
import OlvideContrasena from './pages/OlvideContraseña'; 
import RestablecerContrasena from './pages/RestablecerContraseña'; 

import { useCarrito } from './hooks/useCarrito';
import { useProductos } from './hooks/useProductos';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const action = useNavigationType(); 

  useEffect(() => {
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

  const { productos, loading } = useProductos();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-bold">Cargando Tienda...</div>;
  }

  const listaMotos = productos.filter(p => p.categoria === 'Motos');
  const listaAutos = productos.filter(p => p.categoria === 'Autos');
  const listaHotWheels = productos.filter(p => p.categoria === 'Hot Wheels');
  const listaAccesorios = productos.filter(p => p.categoria === 'Accesorios');

  const destacados = productos.filter(p => p.destacado === true).slice(0, 8); 

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <ScrollToTop />
      
      <Toaster position="top-center" reverseOrder={false} />
      
      <NavbarMejorada
        carritoCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)} 
        onOpenCart={() => setIsCarritoAbierto(true)}
      />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home productos={destacados} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/motos" element={<Catalog productosIniciales={listaMotos} titulo="Motos a Escala" agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/autos" element={<Catalog productosIniciales={listaAutos} titulo="Autos a Escala" agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/hotwheels" element={<Catalog productosIniciales={listaHotWheels} titulo="Hot Wheels" agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/accesorios" element={<Catalog productosIniciales={listaAccesorios} titulo="Accesorios" subtitulo="Complementos para tu colección" agregarAlCarrito={agregarAlCarrito} esAccesorios={true} />} />
          <Route path="/envios" element={ <Pruebas /> } />
          <Route path="/terminos" element={ <Terminos /> } />
          <Route path="/privacidad" element={ <Privacidad /> } />

          {/* --- RUTAS DE AUTENTICACIÓN --- */}
          <Route path="/registro" element={ <Registro /> } /> 
          <Route path="/login" element={ <LoginMejorado /> } />
          <Route path="/perfil" element={ <Perfil /> } />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/olvide-contrasena" element={ <OlvideContrasena /> } />
          <Route path="/restablecer-contrasena" element={ <RestablecerContrasena /> } />

          {/* --- RUTA DE ADMIN PROTEGIDA --- */}
          <Route path="/admin" element={ 
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/producto/:categoria/:slug" element={<ProductoDetalle agregarAlCarrito={agregarAlCarrito} todosLosProductos={productos} />} />
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


