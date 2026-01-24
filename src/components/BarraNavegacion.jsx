import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Flame, Truck, Search } from 'lucide-react';
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

  // Link de Escritorio con estilo (TEXTO MÁS GRANDE: text-lg)
  const NavLink = ({ text, onClick, active, isHot = false, icon: Icon }) => (
    <button 
      onClick={onClick} 
      className={`relative group flex items-center gap-2 py-2 transition-colors uppercase tracking-tight text-lg font-extrabold
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
      <div className="bg-slate-900 text-white text-[10px] md:text-xs font-bold tracking-widest uppercase py-3 text-center relative z-50">
        <div className="flex justify-center items-center gap-6 animate-fade-in">
             <span className="flex items-center gap-2">
                <Truck size={16} className="text-yellow-400" /> ENVÍOS SEGUROS A TODO EL ECUADOR
             </span>
             <span className="hidden md:inline text-slate-600">|</span>
             <span className="hidden md:inline text-yellow-400">PAGOS CONTRAENTREGA EN QUITO</span>
        </div>
      </div>

      {/* ===================== 2. MAIN NAVBAR ===================== */}
      {/* Ajuste de grosor: py-6 en escritorio (py-8 si no hay scroll) */}
      <nav 
        className={`sticky top-0 z-40 bg-white transition-all duration-300 border-b border-slate-100
          ${isScrolled ? 'shadow-md py-3' : 'py-5 md:py-8'} 
        `}
      >
        <div className="max-w-[1500px] mx-auto px-6 flex justify-between items-center gap-4">
          
          {/* A. LOGO (Tamaño ajustado para verse imponente) */}
          <div 
            onClick={() => setVistaActual('inicio')} 
            className="flex-shrink-0 cursor-pointer"
          >
             <img 
               src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769079552/imgi_1_fgstore-3-m2W8gONE7RhyPPPk_irglcf.png" 
               alt="FG Store Logo" 
               // Logo más grande cuando no hay scroll (h-20) y se reduce al bajar (h-14)
               className={`object-contain transition-all duration-300 ${isScrolled ? 'h-12' : 'h-16 md:h-20'}`}
             />
          </div>

          {/* B. NAVEGACIÓN DE ESCRITORIO (Separación aumentada gap-10) */}
          <div className="hidden xl:flex items-center gap-10">
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
            
            <NavLink text="ENVÍOS" onClick={() => setVistaActual('pruebas')} active={vistaActual === 'pruebas'} />
          </div>

          {/* C. ACCIONES */}
          <div className="flex items-center gap-5 md:gap-8">

            {/* CARRITO (Icono más grande) */}
            <button 
              onClick={onOpenCart}
              className="group flex items-center gap-3 pl-6 md:border-l border-slate-200"
            >
              <div className="relative">
                <ShoppingBag size={30} className="text-slate-900 group-hover:text-red-600 transition-colors" strokeWidth={1.5} />
                {carritoCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                  >
                    {carritoCount}
                  </motion.span>
                )}
              </div>
              
              <div className="hidden md:flex flex-col items-start leading-none">
                 <span className="text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors uppercase tracking-tight">
                    CARRITO DE COMPRAS
                 </span>
              </div>
            </button>

            {/* Botón Menú Móvil */}
            <button 
              className="xl:hidden p-2 text-slate-900" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={32} />
            </button>
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
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <span className="font-black text-xl text-slate-900 uppercase tracking-tight">MENÚ</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white rounded-full shadow-sm text-slate-500 hover:text-red-600 transition">
                    <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
                <MobileLink onClick={() => {setVistaActual('inicio'); setIsMobileMenuOpen(false)}} text="Inicio" />
                <MobileLink onClick={() => {setVistaActual('motos'); setIsMobileMenuOpen(false)}} text="Motos a Escala" />
                <MobileLink onClick={() => {setVistaActual('autos'); setIsMobileMenuOpen(false)}} text="Autos a Escala" />
                
                <button 
                    onClick={() => {setVistaActual('hotwheels'); setIsMobileMenuOpen(false)}} 
                    className="flex items-center justify-between w-full p-4 rounded-xl bg-orange-50 text-orange-700 font-bold text-lg hover:bg-orange-100 transition-colors group"
                >
                    <span className="flex items-center gap-3"><Flame size={22} className="fill-orange-600" /> HOTWHEELS</span>
                </button>

                <MobileLink onClick={() => {setVistaActual('pruebas'); setIsMobileMenuOpen(false)}} text="Galería de Envíos" icon={Truck} />
              </div>

              <div className="p-8 bg-slate-900 text-white text-center text-xs">
                <p className="opacity-60 mb-2 font-medium">FGSTOREEC - Passion for Scale</p>
                <div className="flex justify-center gap-4">
                    <span>Quito, Ecuador</span>
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
const MobileLink = ({ text, onClick, icon: Icon }) => (
    <button 
        onClick={onClick} 
        className="flex items-center justify-between w-full p-4 rounded-xl text-slate-700 font-bold text-lg hover:bg-slate-50 hover:text-slate-900 transition-colors border border-transparent hover:border-slate-100"
    >
        <span className="flex items-center gap-3">
            {Icon && <Icon size={22} className="text-slate-400" />}
            {text}
        </span>
    </button>
);