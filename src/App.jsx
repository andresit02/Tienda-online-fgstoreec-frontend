import React, { useState, useRef } from 'react';
import Navbar from './components/BarraNavegacion'; 
import CartDrawer from './components/CarritoLateral'; 
import Home from './pages/Inicio';
import Catalog from './pages/Catalogo';
import Pruebas from './pages/Pruebas';
import ProductoDetalle from "./pages/ProductoDetalle";
import Footer from "./components/Footer";

import { useCarrito } from './hooks/useCarrito';

// 1. IMPORTAR INVENTARIOS (Asegúrate de que tus archivos en /data se llamen así)
import { INVENTARIO_MOTOS } from "./data/InventarioMotos";
import { INVENTARIO_AUTOS } from "./data/InventarioAutos";
import { INVENTARIO_HOTWHEELS } from "./data/InventarioHotwheels";
import { INVENTARIO_ACCESORIOS } from "./data/InventarioAccesorios"; 

// Combinado para Home (Destacados)
const PRODUCTOS_COMBINADOS = [
  ...INVENTARIO_MOTOS,
  ...INVENTARIO_AUTOS,
  ...INVENTARIO_HOTWHEELS,
  ...INVENTARIO_ACCESORIOS 
];

function App() {
  const [vistaActual, setVistaActual] = useState("inicio");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // 2. CREAR LA REFERENCIA PARA GUARDAR EL SCROLL
  const scrollPosition = useRef(0); // <--- NUEVO: Memoria para el scroll

  const { 
    carrito, isCarritoAbierto, setIsCarritoAbierto, agregarAlCarrito, 
    eliminarDelCarrito, actualizarCantidad, totalCarrito 
  } = useCarrito();

  const destacados = PRODUCTOS_COMBINADOS
    .filter(p => p.destacado === true)
    .slice(0, 8); 

  const abrirProducto = (producto) => {
    // 3. GUARDAR POSICIÓN ANTES DE CAMBIAR DE VISTA
    scrollPosition.current = window.scrollY; // <--- Guardamos dónde estaba el usuario
    setProductoSeleccionado(producto);
    setVistaActual("producto");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const volverAlCatalogo = () => {
    if (!productoSeleccionado) return setVistaActual('inicio');

    if (productoSeleccionado.categoria === 'Moto') setVistaActual('motos');
    else if (productoSeleccionado.categoria === 'Auto') setVistaActual('autos');
    else if (productoSeleccionado.categoria === 'Hot Wheels') setVistaActual('hotwheels');
    else setVistaActual('accesorios');
    
    // 4. RESTAURAR POSICIÓN AL VOLVER
    setTimeout(() => {
      window.scrollTo({ top: scrollPosition.current, behavior: 'auto' });
    }, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar 
        carritoCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)} 
        onOpenCart={() => setIsCarritoAbierto(true)}
        vistaActual={vistaActual}
        setVistaActual={setVistaActual}
      />
      
      <main className="flex-grow">
        {vistaActual === 'inicio' && (
          <Home 
            setVistaActual={setVistaActual} 
            productos={destacados}
            agregarAlCarrito={agregarAlCarrito}
            onSelectProducto={abrirProducto}
          />
        )}
        
        {/* CATALOGO MOTOS */}
        {vistaActual === 'motos' && (
           <Catalog 
             productosIniciales={INVENTARIO_MOTOS}
             titulo="Motos a Escala"
             agregarAlCarrito={agregarAlCarrito}
             onSelectProducto={abrirProducto}
           />
        )}

        {/* CATALOGO AUTOS */}
        {vistaActual === 'autos' && (
           <Catalog 
             productosIniciales={INVENTARIO_AUTOS}
             titulo="Autos a Escala"
             agregarAlCarrito={agregarAlCarrito}
             onSelectProducto={abrirProducto}
           />
        )}

        {/* CATALOGO HOT WHEELS */}
        {vistaActual === 'hotwheels' && (
           <Catalog 
             productosIniciales={INVENTARIO_HOTWHEELS}
             titulo="Hot Wheels"
             agregarAlCarrito={agregarAlCarrito}
             onSelectProducto={abrirProducto}
           />
        )}

        {/* CATALOGO ACCESORIOS */}
        {vistaActual === 'accesorios' && (
           <Catalog 
             productosIniciales={INVENTARIO_ACCESORIOS}
             titulo="Accesorios"
             subtitulo="Complementos para tu colección"
             agregarAlCarrito={agregarAlCarrito}
             onSelectProducto={abrirProducto}
             esAccesorios={true} // FIX: Propiedad explícita para estabilidad de filtros
           />
        )}

        {vistaActual === 'pruebas' && (
           <Pruebas setVistaActual={setVistaActual} />
        )}

        {vistaActual === "producto" && (
          <ProductoDetalle
            producto={productoSeleccionado}
            onVolver={volverAlCatalogo}
            agregarAlCarrito={agregarAlCarrito}
          />
        )}
      </main>

      <CartDrawer
        abierto={isCarritoAbierto}
        cerrar={() => setIsCarritoAbierto(false)}
        carrito={carrito}
        total={totalCarrito}
        eliminarItem={eliminarDelCarrito}
        actualizarCantidad={actualizarCantidad}
      />
      
      <Footer setVistaActual={setVistaActual} />
    </div>
  );
}

export default App;