import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Flame, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ carritoCount, onOpenCart, setVistaActual, vistaActual }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar scroll para ajustar el tamaño de la barra
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Link de Escritorio con estilo
  const NavLink = ({ text, onClick, active, isHot = false, icon: Icon }) => (
    <button 
      onClick={onClick} 
      className={`relative group flex items-center gap-2 py-2 transition-colors uppercase tracking-tight text-lg font-black
        ${active ? 'text-red-600' : 'text-slate-900 hover:text-red-600'}
        ${isHot ? 'text-orange-600 hover:text-orange-700' : ''}
      `}
    >
      {Icon && <Icon size={22} className={isHot ? "fill-current" : ""} />}
      {text}
      {/* Línea animada inferior */}
      <span className={`absolute bottom-0 left-0 h-[3px] bg-current transition-all duration-300 
        ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}>
      </span>
    </button>
  );

  return (
    <>
      {/* ===================== 1. TOP BAR ===================== */}
      <div className="bg-slate-900 text-white text-xs md:text-sm font-black tracking-wider uppercase py-3 text-center relative z-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8">
            <span className="flex items-center gap-2">
              <Truck size={18} className="text-yellow-400 flex-shrink-0" /> 
              <span className="font-black">ENVÍOS SEGUROS A TODO EL ECUADOR</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="text-yellow-400 font-black">PAGOS CONTRAENTREGA EN QUITO</span>
          </div>
        </div>
      </div>

      {/* ===================== 2. MAIN NAVBAR ===================== */}
      <nav 
        className={`sticky top-0 z-40 bg-white transition-all duration-300 border-b border-slate-200
          ${isScrolled ? 'shadow-md py-3' : 'py-4 md:py-6'} 
        `}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* LOGO - Izquierda */}
            <div 
              onClick={() => setVistaActual('inicio')} 
              className="cursor-pointer flex-shrink-0"
            >
              <img 
                src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769311945/logoactualizado_rkbkby.png" 
                alt="FG Store Logo" 
                className={`object-contain transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16 md:h-18'}`}
              />
            </div>

            {/* NAVEGACIÓN CENTRAL - Desktop */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8">
              <div className="flex items-center justify-center gap-5 xl:gap-8">
                <NavLink text="Inicio" onClick={() => setVistaActual('inicio')} active={vistaActual === 'inicio'} />
                <NavLink text="Motos a Escala" onClick={() => setVistaActual('motos')} active={vistaActual === 'motos'} />
                <NavLink text="Autos a Escala" onClick={() => setVistaActual('autos')} active={vistaActual === 'autos'} />
                
                <NavLink 
                  text="HOTWHEELS" 
                  onClick={() => setVistaActual('hotwheels')} 
                  active={vistaActual === 'hotwheels'} 
                  isHot={true} 
                  icon={Flame} 
                />

                {/* --- NUEVO LINK ACCESORIOS --- */}
                <NavLink 
                  text="ACCESORIOS" 
                  onClick={() => setVistaActual('accesorios')} 
                  active={vistaActual === 'accesorios'} 
                />
                
                <NavLink text="ENVÍOS" onClick={() => setVistaActual('pruebas')} active={vistaActual === 'pruebas'} />
              </div>
            </div>

            {/* CARRITO Y MENÚ MÓVIL - Derecha */}
            <div className="flex items-center gap-4">
              
              {/* CARRITO */}
              <button 
                onClick={onOpenCart}
                className="group flex items-center gap-3 pl-4 border-l border-slate-200"
              >
                <div className="relative">
                  <ShoppingBag size={32} className="text-slate-900 group-hover:text-red-600 transition-colors" strokeWidth={1.5} />
                  {carritoCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-lg"
                    >
                      {carritoCount}
                    </motion.span>
                  )}
                </div>
                
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors uppercase tracking-tight leading-tight">
                    CARRITO
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {carritoCount} {carritoCount === 1 ? 'ítem' : 'ítems'}
                  </span>
                </div>
              </button>

              {/* Botón Menú Móvil */}
              <button 
                className="lg:hidden p-2 text-slate-900 hover:text-red-600 transition-colors" 
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={32} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===================== 3. MENÚ MÓVIL ===================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769311945/logoactualizado_rkbkby.png" 
                    alt="Logo" 
                    className="h-10"
                  />
                  <span className="font-black text-xl text-slate-900 uppercase tracking-tight">MENÚ</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-2 rounded-full hover:bg-slate-100 transition"
                >
                  <X size={24} className="text-slate-600" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
                <MobileLink 
                  onClick={() => {setVistaActual('inicio'); setIsMobileMenuOpen(false)}} 
                  text="Inicio" 
                  active={vistaActual === 'inicio'}
                />
                <MobileLink 
                  onClick={() => {setVistaActual('motos'); setIsMobileMenuOpen(false)}} 
                  text="Motos a Escala" 
                  active={vistaActual === 'motos'}
                />
                <MobileLink 
                  onClick={() => {setVistaActual('autos'); setIsMobileMenuOpen(false)}} 
                  text="Autos a Escala" 
                  active={vistaActual === 'autos'}
                />
                
                <MobileLink 
                  onClick={() => {setVistaActual('hotwheels'); setIsMobileMenuOpen(false)}} 
                  text="HOTWHEELS" 
                  active={vistaActual === 'hotwheels'}
                  isHot={true}
                  icon={Flame}
                />

                {/* --- NUEVO LINK MÓVIL ACCESORIOS --- */}
                <MobileLink 
                  onClick={() => {setVistaActual('accesorios'); setIsMobileMenuOpen(false)}} 
                  text="ACCESORIOS" 
                  active={vistaActual === 'accesorios'}
                />

                <MobileLink 
                  onClick={() => {setVistaActual('pruebas'); setIsMobileMenuOpen(false)}} 
                  text="ENVÍOS" 
                  active={vistaActual === 'pruebas'}
                  icon={Truck}
                />
              </div>

              <div className="p-6 bg-slate-900 text-white">
                <button 
                  onClick={() => {onOpenCart(); setIsMobileMenuOpen(false)}}
                  className="w-full bg-white/10 hover:bg-white/20 rounded-xl p-4 transition-colors flex items-center justify-between mb-4"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={24} className="text-white" />
                    <div className="text-left">
                      <p className="font-black text-lg">CARRITO DE COMPRAS</p>
                      <p className="text-sm opacity-80">{carritoCount} {carritoCount === 1 ? 'ítem' : 'ítems'}</p>
                    </div>
                  </div>
                  {carritoCount > 0 && (
                    <span className="bg-red-600 text-white font-black text-sm w-8 h-8 flex items-center justify-center rounded-full">
                      {carritoCount}
                    </span>
                  )}
                </button>
                
                <div className="text-center">
                  <p className="text-sm font-black mb-1">FGSTOREEC</p>
                  <p className="text-xs opacity-80 mb-2">Passion for Scale Models</p>
                  <div className="text-xs opacity-60">
                    <p>Quito, Ecuador</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Componente auxiliar móvil
const MobileLink = ({ text, onClick, active = false, isHot = false, icon: Icon }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center justify-between w-full p-4 rounded-xl text-lg font-black transition-all
      ${active ? 'bg-red-50 text-red-600 border border-red-100' : 'text-slate-900 hover:bg-slate-50 hover:text-slate-900 border border-transparent'}
      ${isHot ? 'bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-100' : ''}
    `}
  >
    <span className="flex items-center gap-3">
      {Icon && <Icon size={22} className={isHot ? "fill-orange-600" : "text-slate-400"} />}
      {text}
    </span>
    {active && (
      <div className="w-2 h-2 bg-current rounded-full"></div>
    )}
  </button>
);