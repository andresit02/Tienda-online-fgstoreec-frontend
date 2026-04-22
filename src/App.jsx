import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'; 
import { Toaster } from 'react-hot-toast'; 
import ReactGA from "react-ga4"; // <--- NUEVO: Importación de Google Analytics

import ProtectedRoute from './components/ProtectedRoute'; 

import AdminDashboard from './pages/admin/AdminDashboard';
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

import BottomNav from './components/BottomNav';
import ListaDeseos from './pages/ListaDeseos';

import { useCarrito } from './hooks/useCarrito';
import { useProductos } from './hooks/useProductos';

// --- INICIALIZAR GOOGLE ANALYTICS ---
ReactGA.initialize("GTM-KRDG2R92"); // <--- REEMPLAZA ESTO CON TU ID DE MEDICIÓN REAL

// --- NUEVO: Función combinada para subir el scroll y registrar la visita en Analytics ---
const ScrollToTopAndTrack = () => {
  const { pathname } = useLocation();
  const action = useNavigationType(); 

  useEffect(() => {
    // 1. Sube el scroll
    if (action !== 'POP') {
      window.scrollTo(0, 0);
    }
    // 2. Reporta silenciosamente la visita a Google Analytics
    ReactGA.send({ hitType: "pageview", page: pathname });
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col pb-16 md:pb-0">
      {/* CAMBIO: Usamos el nuevo componente que trackea las visitas */}
      <ScrollToTopAndTrack />
      
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
          
          <Route path="/deseos" element={ <ListaDeseos agregarAlCarrito={agregarAlCarrito} /> } />

          <Route path="/registro" element={ <Registro /> } /> 
          <Route path="/login" element={ <LoginMejorado /> } />
          <Route path="/perfil" element={ <Perfil /> } />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/olvide-contrasena" element={ <OlvideContrasena /> } />
          <Route path="/restablecer-contrasena" element={ <RestablecerContrasena /> } />

          <Route path="/admin" element={ 
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/producto/:categoria/:slug" element={<ProductoDetalle agregarAlCarrito={agregarAlCarrito} todosLosProductos={productos} />} />
        </Routes>
      </main>

      <BottomNav 
        carritoCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)} 
        onOpenCart={() => setIsCarritoAbierto(true)} 
      />

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