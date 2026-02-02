import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; 

import Navbar from './components/BarraNavegacion'; 
import CartDrawer from './components/CarritoLateral'; 
import Home from './pages/Inicio';
import Catalog from './pages/Catalogo';
import Pruebas from './pages/Pruebas';
import ProductoDetalle from "./pages/ProductoDetalle";
import Footer from "./components/Footer";

// 1. IMPORTAMOS EL HOOK QUE CREAMOS (Y ELIMINAMOS LOS INVENTARIOS ESTATICOS)
import { useCarrito } from './hooks/useCarrito';
import { useProductos } from './hooks/useProductos';

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

  // 2. OBTENEMOS LOS DATOS REALES DE LA NUBE
  const { productos, loading } = useProductos();

  // Pantalla de carga simple para que no de error mientras bajan los datos
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-bold">Cargando Tienda...</div>;
  }

  // 3. FILTRAMOS LOS PRODUCTOS QUE VIENEN DE LA BD PARA CADA RUTA
  // (Nota: Asegúrate que en tu BD las categorías sean exactamente estas: "Motos", "Autos", "Hot Wheels", "Accesorios")
  const listaMotos = productos.filter(p => p.categoria === 'Motos');
  const listaAutos = productos.filter(p => p.categoria === 'Autos');
  const listaHotWheels = productos.filter(p => p.categoria === 'Hot Wheels');
  const listaAccesorios = productos.filter(p => p.categoria === 'Accesorios');

  const destacados = productos.filter(p => p.destacado === true).slice(0, 8); 

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <ScrollToTop />
      
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

          {/* 4. PASAMOS LAS LISTAS FILTRADAS A CADA CATÁLOGO */}
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

          {/* 5. PASAMOS LA LISTA COMPLETA AL DETALLE PARA QUE PUEDA BUSCAR POR ID */}
          <Route path="/producto/:categoria/:id" element={
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