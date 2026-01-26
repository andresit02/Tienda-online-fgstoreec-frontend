import React, { useEffect } from 'react';
// 1. IMPORTAR HERRAMIENTAS DE RUTAS
import { Routes, Route, useLocation } from 'react-router-dom'; 

import Navbar from './components/BarraNavegacion'; 
import CartDrawer from './components/CarritoLateral'; 
import Home from './pages/Inicio';
import Catalog from './pages/Catalogo';
import Pruebas from './pages/Pruebas';
import ProductoDetalle from "./pages/ProductoDetalle";
import Footer from "./components/Footer";

import { useCarrito } from './hooks/useCarrito';

// IMPORTAR INVENTARIOS
import { INVENTARIO_MOTOS } from "./data/InventarioMotos";
import { INVENTARIO_AUTOS } from "./data/InventarioAutos";
import { INVENTARIO_HOTWHEELS } from "./data/InventarioHotwheels";
import { INVENTARIO_ACCESORIOS } from "./data/InventarioAccesorios"; 

const PRODUCTOS_COMBINADOS = [
  ...INVENTARIO_MOTOS,
  ...INVENTARIO_AUTOS,
  ...INVENTARIO_HOTWHEELS,
  ...INVENTARIO_ACCESORIOS 
];

// COMPONENTE PARA SCROLL AUTOMÁTICO AL CAMBIAR DE RUTA
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const { 
    carrito, isCarritoAbierto, setIsCarritoAbierto, agregarAlCarrito, 
    eliminarDelCarrito, actualizarCantidad, totalCarrito 
  } = useCarrito();

  const destacados = PRODUCTOS_COMBINADOS
    .filter(p => p.destacado === true)
    .slice(0, 8); 

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <ScrollToTop /> {/* Se asegura que inicie arriba al navegar */}
      
      <Navbar 
        carritoCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)} 
        onOpenCart={() => setIsCarritoAbierto(true)}
      />
      
      <main className="flex-grow">
        <Routes>
          {/* RUTA INICIO */}
          <Route path="/" element={
            <Home 
              productos={destacados}
              agregarAlCarrito={agregarAlCarrito}
            />
          } />

          {/* RUTAS DE CATÁLOGOS */}
          <Route path="/motos" element={
             <Catalog 
               productosIniciales={INVENTARIO_MOTOS}
               titulo="Motos a Escala"
               agregarAlCarrito={agregarAlCarrito}
             />
          } />

          <Route path="/autos" element={
             <Catalog 
               productosIniciales={INVENTARIO_AUTOS}
               titulo="Autos a Escala"
               agregarAlCarrito={agregarAlCarrito}
             />
          } />

          <Route path="/hotwheels" element={
             <Catalog 
               productosIniciales={INVENTARIO_HOTWHEELS}
               titulo="Hot Wheels"
               agregarAlCarrito={agregarAlCarrito}
             />
          } />

          <Route path="/accesorios" element={
             <Catalog 
               productosIniciales={INVENTARIO_ACCESORIOS}
               titulo="Accesorios"
               subtitulo="Complementos para tu colección"
               agregarAlCarrito={agregarAlCarrito}
               esAccesorios={true}
             />
          } />

          <Route path="/envios" element={
             <Pruebas />
          } />

          {/* RUTA DINÁMICA PARA EL DETALLE DEL PRODUCTO */}
          {/* Captura la categoría y el ID desde la URL */}
          <Route path="/producto/:categoria/:id" element={
            <ProductoDetalle
              agregarAlCarrito={agregarAlCarrito}
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