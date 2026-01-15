import React, { useState } from 'react';
// Asegúrate de que las rutas sean correctas:
import Navbar from './components/BarraNavegacion';
import CartDrawer from './components/CarritoLateral'; 
import Home from './pages/Inicio';
import Catalog from './pages/Catalogo';
// Asegúrate de que useCarrito.js esté dentro de una carpeta hooks o ajusta esta ruta:
import { useCarrito } from './hooks/useCarrito';
import { Phone, MessageCircle } from 'lucide-react';

function App() {
  const [vistaActual, setVistaActual] = useState("inicio");
  
  // Ahora esto funcionará correctamente porque los nombres coinciden con el Hook
  const { 
    carrito, isCarritoAbierto, setIsCarritoAbierto, agregarAlCarrito, 
    eliminarDelCarrito, actualizarCantidad, totalCarrito 
  } = useCarrito();

  const [busqueda, setBusqueda] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. Barra de Navegación */}
      <Navbar 
        carritoCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)} 
        onOpenCart={() => setIsCarritoAbierto(true)}
        vistaActual={vistaActual}
        setVistaActual={setVistaActual}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />
      
      {/* 2. Contenido Principal */}
      <main>
        {vistaActual === 'inicio' && (
          <>
            <Home setVistaActual={setVistaActual} />
            <div className="py-10">
                <div className="text-center mb-8">
                </div>
                <Catalog
                  agregarAlCarrito={agregarAlCarrito}
                  modo="favoritos"
                  titulo="Lo más vendido"
                  subtitulo="Los modelos que más se llevan esta semana."
                  limite={4}
                  tipoFavoritos="masVendidos"
                />
            </div>
          </>
        )}
        
        {vistaActual === 'catalogo' && (
           <Catalog agregarAlCarrito={agregarAlCarrito} />
        )}
        
        {vistaActual === 'contacto' && (
          <div className="max-w-2xl mx-auto py-20 px-4 text-center animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-slate-900">Hablemos</h2>
                <p className="mb-8 text-slate-600">Estamos en Quito y realizamos envíos seguros por Servientrega a todo el país. Escríbenos para confirmar stock.</p>
                {/* Botón de WhatsApp */}
                <button onClick={() => window.open('https://wa.me/593999999999', '_blank')} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors shadow-lg shadow-slate-900/20 cursor-pointer">
                  <MessageCircle /> Chatear ahora
                </button>
              </div>
          </div>
        )}
      </main>

      {/* 3. El Carrito */}
      <CartDrawer
        abierto={isCarritoAbierto}
        cerrar={() => setIsCarritoAbierto(false)}
        carrito={carrito}
        total={totalCarrito}
        eliminarItem={eliminarDelCarrito}
        actualizarCantidad={actualizarCantidad}
      />

      {/* 4. Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-1">FG STORE EC</h3>
            <p className="text-sm opacity-60">Pasión por el detalle a escala.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;