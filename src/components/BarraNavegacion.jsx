import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Flame } from 'lucide-react'; // Quitamos Bike y CarFront
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ carritoCount, onOpenCart, setVistaActual, vistaActual }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función auxiliar para el link con efecto hover elegante
  const NavLink = ({ text, onClick, isActive }) => (
    <button 
      onClick={onClick} 
      className={`relative group hover:text-black transition-colors ${isActive ? 'text-black font-bold' : ''}`}
    >
      {text}
      {/* Línea roja que aparece debajo al hacer hover */}
      <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
    </button>
  );

  return (
    <>
      {/* 1. TOP BAR (Sin cambios, funciona bien) */}
      <div className="bg-slate-900 text-white text-[10px] md:text-xs font-bold py-2 text-center tracking-widest uppercase flex justify-center items-center gap-4">
        <span className="animate-pulse">🚚 Envíos seguros a todo el Ecuador</span>
        <span className="hidden md:inline text-slate-600">|</span>
        <span className="text-yellow-400">Pagos Contraentrega en Quito</span>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-white py-5 border-b border-slate-50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          
          {/* A. LOGO Y MENU MOVIL */}
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-800" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu />
            </button>
            
            {/* Logo un poco más grande para dar peso */}
            <div onClick={() => setVistaActual('inicio')} className="cursor-pointer flex flex-col items-start leading-none group">
              <h1 className="text-3xl font-black italic tracking-tighter text-slate-900">
                FG<span className="text-red-600">STORE</span>
              </h1>
              <span className="text-[0.65rem] text-slate-400 font-bold tracking-[0.3em] uppercase pl-1">
                Passion for scale
              </span>
            </div>
          </div>

          {/* B. NAVEGACIÓN CENTRAL (Aquí está el cambio estético grande) */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-500">
            
            {/* 1. Inicio separado */}
            <NavLink text="Inicio" onClick={() => setVistaActual('inicio')} isActive={vistaActual === 'inicio'} />

            {/* Separador visual sutil */}
            <div className="h-5 w-px bg-slate-200"></div>

            {/* 2. Grupo de Productos (Limpios, sin iconos) */}
            <div className="flex items-center gap-6">
                <NavLink text="Motos a Escala" onClick={() => setVistaActual('catalogo')} />
                <NavLink text="Autos a Escala" onClick={() => setVistaActual('catalogo')} />
                
                {/* Hotwheels: Destacado solo por color e icono sutil */}
                <button 
                  onClick={() => setVistaActual('catalogo')}
                  className="flex items-center gap-1.5 text-orange-600 hover:text-orange-700 transition-colors font-bold group"
                >
                  <Flame size={16} className="fill-orange-600 group-hover:scale-110 transition-transform" />
                  <span>HOTWHEELS</span>
                </button>
            </div>
          </div>

          {/* C. ICONOS DE ACCIÓN */}
          <div className="flex items-center gap-5 text-slate-700">
            
            
            <div className="relative cursor-pointer group" onClick={onOpenCart}>
              <ShoppingBag className="w-6 h-6 group-hover:text-black transition" strokeWidth={1.5} />
              {carritoCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {carritoCount}
                </motion.span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 3. MENU MOVIL (Actualizado para coincidir con la limpieza) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 z-50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed top-0 left-0 h-full w-[75%] max-w-xs bg-white z-50 shadow-xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                 <h1 className="text-xl font-black italic tracking-tighter text-slate-900">
                    FG<span className="text-red-600">STORE</span>
                  </h1>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-black"><X /></button>
              </div>
              
              <div className="flex flex-col gap-2 text-base font-medium text-slate-600">
                <button onClick={() => {setVistaActual('inicio'); setIsMobileMenuOpen(false)}} className="text-left py-2 border-b border-slate-50">Inicio</button>
                <button onClick={() => {setVistaActual('catalogo'); setIsMobileMenuOpen(false)}} className="text-left py-2 border-b border-slate-50">Motos a Escala</button>
                <button onClick={() => {setVistaActual('catalogo'); setIsMobileMenuOpen(false)}} className="text-left py-2 border-b border-slate-50">Autos a Escala</button>
                <button onClick={() => {setVistaActual('catalogo'); setIsMobileMenuOpen(false)}} className="text-left py-2 text-orange-600 font-bold flex items-center gap-2">
                    <Flame size={18} className="fill-orange-600" /> Hotwheels
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}