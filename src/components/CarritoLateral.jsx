import React, { useState } from 'react';
import { ShoppingCart, X, MessageCircle, Bike, Check, Motorbike } from 'lucide-react';
import {WhatsappIcon} from './SocialMediaIcons';

const CarritoLateral = ({ abierto, cerrar, carrito, total, eliminarItem, actualizarCantidad }) => {

  // ESTADO NUEVO: Para el gesto de swipe right
  const [touchStartX, setTouchStartX] = useState(null);

  const finalizarCompraWhatsApp = () => {
    // 1. Generar ID Único (Vital para que n8n sepa que es una venta real)
    const orderId = `WEB-${Date.now().toString().slice(-6)}`;
    const numeroTelefono = "593958866618"; 

    // 2. Construir lista de productos
    const productosTexto = carrito.map(item => {
      const detalle = item.categoria === 'Hot Wheels' ? item.serie : item.marca;
      const nombreFinal = detalle ? `${item.nombre} (${detalle})` : item.nombre;
      
      return `📦 ${item.cantidad}x ${nombreFinal} - $${(item.precio * item.cantidad).toFixed(2)}`;
    }).join('\n');

    // 3. Armar el mensaje con el formato "Blindado" para n8n
    const mensaje = `🆔 PEDIDO WEB: #${orderId}
--------------------------------
${productosTexto}
--------------------------------
💰 *TOTAL: $${total.toFixed(2)}*

Hola FG Store! 👋 Quisiera confirmar este pedido y recibir los datos de pago.`;

    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  // --- LÓGICA DE SWIPE PARA EL CARRITO (Derecha) ---
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStartX) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX; // Positivo si desliza a la derecha

    if (diff > 50) {
      cerrar();
      setTouchStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity ${abierto ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={cerrar} 
      />
      
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${abierto ? 'translate-x-0' : 'translate-x-full'}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-full flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="text-lg font-bold text-slate-900 flex items-center justify-center gap-2 text-center">
              <ShoppingCart className="w-5 h-5 text-red-600" /> Tu Pedido
            </h2>
            {/* MEJORA: Botón con la etiqueta "Seguir comprando" */}
            <button onClick={cerrar} className="p-1 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer flex flex-col items-center justify-center gap-0.5">
              <X className="w-5 h-5 text-slate-500" />
              <span className="text-[9px] font-black tracking-wider uppercase text-slate-500 whitespace-nowrap">Seguir comprando</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {carrito.length === 0 ? (
              <div className="text-center py-20 opacity-50">
                <Motorbike className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              carrito.map(item => (
                <div key={`${item.categoria}-${item.id}`} className="flex gap-4 p-3 rounded-xl border border-slate-100 bg-white shadow-sm">
                  <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                        src={item.imagenes?.principal || "/img/placeholder.png"} 
                        alt={item.nombre} 
                        className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.nombre}</h4>
                    <p className="text-xs text-slate-500 mb-2">
                        {item.categoria === 'Hot Wheels' ? item.serie : item.marca}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-2 py-1">
                        <button onClick={() => actualizarCantidad(item.id, -1, item.cartItemId)} className="text-slate-400 hover:text-slate-900 font-bold px-2">-</button>
                        <span className="text-xs font-bold w-4 text-center">{item.cantidad}</span>
                        <button onClick={() => actualizarCantidad(item.id, 1, item.cartItemId)} className="text-slate-400 hover:text-slate-900 font-bold px-2">+</button>
                      </div>
                      <p className="font-bold text-slate-900 text-sm">${(item.precio * item.cantidad).toFixed(2)}</p>
                    </div>
                  </div>
                  <button onClick={() => eliminarItem(item.id, item.cartItemId)} className="text-slate-300 hover:text-red-500 self-start cursor-pointer">
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {carrito.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50">
              <div className="flex justify-between items-end mb-4">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-2xl font-bold text-slate-900">${total.toFixed(2)}</span>
              </div>
              <button onClick={finalizarCompraWhatsApp} className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 transition-all active:scale-95 cursor-pointer">
                <WhatsappIcon size={20} className="text-white" /> Confirmar compra por WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CarritoLateral;