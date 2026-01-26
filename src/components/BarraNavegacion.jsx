import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Flame, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// 1. NUEVOS IMPORTS
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ carritoCount, onOpenCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 2. HOOK PARA SABER LA RUTA ACTUAL
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función auxiliar para verificar ruta activa
  const isActive = (path) => location.pathname === path;

  // Componente Link de Escritorio (Ahora usa Link en vez de button)
  const NavLink = ({ text, to, isHot = false, icon: Icon }) => (
    <Link 
      to={to} 
      className={`relative group flex items-center gap-2 py-2 transition-colors uppercase tracking-tight text-lg font-black
        ${isActive(to) ? 'text-red-600' : 'text-slate-900 hover:text-red-600'}
        ${isHot ? 'text-orange-600 hover:text-orange-700' : ''}
      `}
    >
      {Icon && <Icon size={22} className={isHot ? "fill-current" : ""} />}
      {text}
      <span className={`absolute bottom-0 left-0 h-[3px] bg-current transition-all duration-300 
        ${isActive(to) ? 'w-full' : 'w-0 group-hover:w-full'}`}>
      </span>
    </Link>
  );

  return (
    <>
      {/* TOP BAR */}
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

      {/* MAIN NAVBAR */}
      <nav 
        className={`sticky top-0 z-40 bg-white transition-all duration-300 border-b border-slate-200
          ${isScrolled ? 'shadow-md py-3' : 'py-4 md:py-6'} 
        `}
      >
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between">
            
            {/* ZONA IZQUIERDA */}
            <div className="flex items-center gap-4">
                {/* Botón Menú Móvil */}
                <button 
                    className="lg:hidden text-slate-900 hover:text-red-600 transition-colors p-1" 
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu size={28} strokeWidth={2} />
                </button>

                {/* LOGO (PC) - Ahora con Link */}
                <Link to="/" className="cursor-pointer flex-shrink-0 hidden lg:block">
                    <img 
                        src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769311945/logoactualizado_rkbkby.png" 
                        alt="FG Store Logo" 
                        className={`object-contain transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16 md:h-18'}`}
                    />
                </Link>
            </div>

            {/* ZONA CENTRAL (Logo Móvil) - Ahora con Link */}
            <Link 
                to="/" 
                className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            >
                <img 
                    src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769311945/logoactualizado_rkbkby.png" 
                    alt="FG Store Logo" 
                    className="h-10 sm:h-12 object-contain"
                />
            </Link>

            {/* ZONA CENTRAL (Links PC) */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8">
              <div className="flex items-center justify-center gap-5 xl:gap-8">
                <NavLink to="/" text="Inicio" />
                <NavLink to="/motos" text="Motos a Escala" />
                <NavLink to="/autos" text="Autos a Escala" />
                <NavLink to="/hotwheels" text="HOTWHEELS" isHot={true} icon={Flame} />
                <NavLink to="/accesorios" text="ACCESORIOS" />
                <NavLink to="/envios" text="ENVÍOS" />
              </div>
            </div>

            {/* ZONA DERECHA (Carrito) */}
            <div className="flex items-center gap-4">
              <button 
                onClick={onOpenCart}
                className="group flex items-center gap-3 lg:pl-4 lg:border-l border-slate-200"
              >
                <div className="relative p-1">
                  <ShoppingBag size={28} className="text-slate-900 group-hover:text-red-600 transition-colors md:w-8 md:h-8" strokeWidth={1.5} />
                  {carritoCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-lg"
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
            </div>

          </div>
        </div>
      </nav>

      {/* MENÚ MÓVIL */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl flex flex-col"
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
                <MobileLink to="/" text="Inicio" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/')} />
                <MobileLink to="/motos" text="Motos a Escala" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/motos')} />
                <MobileLink to="/autos" text="Autos a Escala" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/autos')} />
                <MobileLink to="/hotwheels" text="HOTWHEELS" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/hotwheels')} isHot={true} icon={Flame} />
                <MobileLink to="/accesorios" text="ACCESORIOS" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/accesorios')} />
                <MobileLink to="/envios" text="ENVÍOS" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/envios')} icon={Truck} />
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

// Componente auxiliar móvil actualizado con Link
const MobileLink = ({ text, to, onClick, isActive, isHot = false, icon: Icon }) => (
  <Link 
    to={to} 
    onClick={onClick} 
    className={`flex items-center justify-between w-full p-4 rounded-xl text-lg font-black transition-all
      ${isActive ? 'bg-red-50 text-red-600 border border-red-100' : 'text-slate-900 hover:bg-slate-50 hover:text-slate-900 border border-transparent'}
      ${isHot ? 'bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-100' : ''}
    `}
  >
    <span className="flex items-center gap-3">
      {Icon && <Icon size={22} className={isHot ? "fill-orange-600" : "text-slate-400"} />}
      {text}
    </span>
    {isActive && (
      <div className="w-2 h-2 bg-current rounded-full"></div>
    )}
  </Link>
);