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
// Importamos los inventarios separados y el combinado
import { 
  PRODUCTOS, 
  INVENTARIO_MOTOS, 
  INVENTARIO_AUTOS, 
  INVENTARIO_HOTWHEELS 
} from "./data/inventario";

function App() {
  const [vistaActual, setVistaActual] = useState("inicio");
  const [busqueda, setBusqueda] = useState("");
  const [productoId, setProductoId] = useState(null);

  const { 
    carrito, isCarritoAbierto, setIsCarritoAbierto, agregarAlCarrito, 
    eliminarDelCarrito, actualizarCantidad, totalCarrito 
  } = useCarrito();

  // --- LÓGICA DE DATOS ---
  // Filtramos los destacados para el Home desde el array maestro
  const destacados = PRODUCTOS
    .filter(p => p.destacado === true)
    .slice(0, 8); 

  const productoSeleccionado = PRODUCTOS.find(p => p.id === productoId);

  const abrirProducto = (id) => {
    setProductoId(id);
    setVistaActual("producto");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const volverAlCatalogo = () => {
    if (!productoSeleccionado) return setVistaActual('inicio');
    // AJUSTE: Usamos 'categoria' en lugar de 'tipo'
    if (productoSeleccionado.categoria === 'Moto') setVistaActual('motos');
    else if (productoSeleccionado.categoria === 'Auto') setVistaActual('autos');
    else if (productoSeleccionado.categoria === 'Hot Wheels') setVistaActual('hotwheels');
    else setVistaActual('inicio');
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
        
        {/* VISTA: INICIO */}
        {vistaActual === 'inicio' && (
          <Home 
            setVistaActual={setVistaActual} 
            productos={destacados}
            agregarAlCarrito={agregarAlCarrito}
          />
        )}
        
        {/* VISTA: MOTOS (Usamos INVENTARIO_MOTOS directo) */}
        {vistaActual === 'motos' && (
           <Catalog 
             productosIniciales={INVENTARIO_MOTOS}
             titulo="Motos a Escala"
             subtitulo="Colección de motocicletas en escala 1:12 y 1:18"
             agregarAlCarrito={agregarAlCarrito}
             onSelectProducto={abrirProducto}
           />
        )}

        {/* VISTA: AUTOS (Usamos INVENTARIO_AUTOS directo) */}
        {vistaActual === 'autos' && (
           <Catalog 
             productosIniciales={INVENTARIO_AUTOS}
             titulo="Autos a Escala"
             subtitulo="Vehículos detallados de las mejores marcas"
             agregarAlCarrito={agregarAlCarrito}
             onSelectProducto={abrirProducto}
           />
        )}

        {/* VISTA: HOT WHEELS (Usamos INVENTARIO_HOTWHEELS directo) */}
        {vistaActual === 'hotwheels' && (
           <Catalog 
             productosIniciales={INVENTARIO_HOTWHEELS}
             titulo="Hot Wheels"
             subtitulo="Modelos 1:64 para coleccionistas"
             agregarAlCarrito={agregarAlCarrito}
             onSelectProducto={abrirProducto}
           />
        )}

        {/* VISTA: PRUEBAS */}
        {vistaActual === 'pruebas' && (
           <Pruebas setVistaActual={setVistaActual} />
        )}

        {/* VISTA: DETALLE */}
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
        
      {/* Botón WhatsApp */}
      {!isCarritoAbierto && (
        <a
          href="https://wa.me/593958866618" 
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] transition-all duration-300 p-3.5 rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center cursor-pointer hover:-translate-y-1 animate-bounce-slow"
          aria-label="Chat en WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      )}
    </div>
  );
}

export default App;