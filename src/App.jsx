import React, { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

// RUTAS / PÁGINAS
import Navbar from './components/BarraNavegacion';
import CartDrawer from './components/CarritoLateral'; 
import Home from './pages/Inicio';
import Catalog from './pages/Catalogo';
import Pruebas from './pages/Pruebas';
import ProductoDetalle from "./pages/ProductoDetalle";
import Footer from "./components/Footer";

// DATOS Y HOOKS
import { useCarrito } from './hooks/useCarrito';
import { PRODUCTOS } from "./data/inventario";

function App() {
  const [vistaActual, setVistaActual] = useState("inicio");
  const [busqueda, setBusqueda] = useState("");
  
  // Estado para el producto seleccionado
  const [productoId, setProductoId] = useState(null);

  const abrirProducto = (id) => {
    setProductoId(id);
    setVistaActual("producto");
  };

  // Encontrar el producto actual basado en el ID
  const productoSeleccionado = PRODUCTOS.find(p => p.id === productoId);
  
  // Hook del carrito
  const { 
    carrito, isCarritoAbierto, setIsCarritoAbierto, agregarAlCarrito, 
    eliminarDelCarrito, actualizarCantidad, totalCarrito 
  } = useCarrito();


  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      
      {/* 1. NAVBAR */}
      <Navbar 
        carritoCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)} 
        onOpenCart={() => setIsCarritoAbierto(true)}
        vistaActual={vistaActual}
        setVistaActual={setVistaActual}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />
      
      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="flex-grow">
        
        {/* VISTA: INICIO */}
        {vistaActual === 'inicio' && (
          <>
            <Home setVistaActual={setVistaActual} />
            <div className="py-10">
                <Catalog
                  agregarAlCarrito={agregarAlCarrito}
                  onSelectProducto={abrirProducto} 
                  modo="favoritos"
                  titulo="Lo más vendido"
                  subtitulo="Los modelos que más se llevan esta semana."
                  limite={4}
                  tipoFavoritos="masVendidos"
                />
            </div>
          </>
        )}
        
        {/* VISTA: CATÁLOGO */}
        {vistaActual === 'catalogo' && (
           <Catalog 
             agregarAlCarrito={agregarAlCarrito}
             onSelectProducto={abrirProducto}
           />
        )}

        {/* VISTA: PRUEBAS / ENVÍOS */}
        {vistaActual === 'pruebas' && (
           <Pruebas setVistaActual={setVistaActual} />
        )}

        {/* VISTA: DETALLE DE PRODUCTO */}
        {vistaActual === "producto" && (
          <ProductoDetalle
            producto={productoSeleccionado}
            onVolver={() => setVistaActual("catalogo")}
            agregarAlCarrito={agregarAlCarrito}
          />
        )}
        
        {/* VISTA: CONTACTO */}
        {vistaActual === 'contacto' && (
          <div className="max-w-2xl mx-auto py-20 px-4 text-center animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-slate-900">Hablemos</h2>
                <p className="mb-8 text-slate-600">Estamos en Quito y realizamos envíos seguros por Servientrega a todo el país. Escríbenos para confirmar stock.</p>
                <button onClick={() => window.open('https://wa.me/593958866618', '_blank')} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors shadow-lg shadow-slate-900/20 cursor-pointer">
                  <MessageCircle /> Chatear ahora
                </button>
              </div>
          </div>
        )}

      </main>

      {/* 3. COMPONENTES GLOBALES (Carrito, Footer, WhatsApp) */}
      
      <CartDrawer
        abierto={isCarritoAbierto}
        cerrar={() => setIsCarritoAbierto(false)}
        carrito={carrito}
        total={totalCarrito}
        eliminarItem={eliminarDelCarrito}
        actualizarCantidad={actualizarCantidad}
      />
      
      <Footer setVistaActual={setVistaActual} />
        
      {/* Botón Flotante WhatsApp */}
      <a
        href="https://wa.me/593958866618" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 transition p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer animate-bounce-slow"
      >
        <svg
          className="w-7 h-7 text-white"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M16 0C7.164 0 0 7.163 0 16c0 2.836.742 5.58 2.156 8.004L.058 32l8.188-2.094A15.9 15.9 0 0 0 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.09a13.02 13.02 0 0 1-6.64-1.82l-.476-.282-4.864 1.242 1.296-4.744-.308-.49A13.03 13.03 0 1 1 16 29.09zm7.558-9.83c-.412-.206-2.44-1.205-2.818-1.343-.378-.137-.654-.206-.93.206-.275.412-1.066 1.343-1.307 1.618-.24.275-.48.309-.893.103-.412-.206-1.742-.64-3.315-2.043-1.224-1.092-2.05-2.44-2.292-2.853-.24-.412-.026-.635.18-.84.185-.184.412-.48.618-.72.206-.24.275-.412.412-.687.137-.275.069-.515-.034-.72-.103-.206-.93-2.24-1.275-3.067-.336-.807-.678-.697-.93-.71l-.79-.014c-.275 0-.72.103-1.096.515-.378.412-1.444 1.41-1.444 3.44s1.478 3.994 1.684 4.27c.206.275 2.91 4.445 7.05 6.23.985.425 1.753.678 2.352.868.988.314 1.887.27 2.596.164.792-.118 2.44-.997 2.784-1.962.344-.964.344-1.79.24-1.962-.103-.172-.378-.275-.79-.48z"/>
        </svg>
      </a>
    </div>
  );
}

export default App;