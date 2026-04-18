import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Flame, Truck, Settings, LogOut, User, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ carritoCount, onOpenCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [menuTouchStartX, setMenuTouchStartX] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setShowLogoutConfirm(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
        setShowLogoutConfirm(false);
    }
  }, [isMobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    setShowLogoutConfirm(false);
    navigate('/');
  };

  // --- LÓGICA DE SWIPE PARA EL MENÚ (Izquierda) ---
  const handleMenuTouchStart = (e) => {
    setMenuTouchStartX(e.touches[0].clientX);
  };

  const handleMenuTouchMove = (e) => {
    if (!menuTouchStartX) return;
    const currentX = e.touches[0].clientX;
    const diff = menuTouchStartX - currentX; // Positivo si desliza a la izquierda

    if (diff > 50) {
      setIsMobileMenuOpen(false);
      setMenuTouchStartX(null);
    }
  };

  const handleMenuTouchEnd = () => {
    setMenuTouchStartX(null);
  };

  const NavLink = ({ text, to, isHot = false, icon: Icon }) => (
    <Link 
      to={to} 
      className={`relative group flex items-center gap-2 py-2 transition-colors uppercase tracking-tight text-base font-black whitespace-nowrap
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

      <nav className={`sticky top-0 z-40 bg-white transition-all duration-300 border-b border-slate-200 ${isScrolled ? 'shadow-md py-3' : 'py-4 md:py-6'}`}>
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center gap-4">
                <button 
                    className="lg:hidden text-slate-900 hover:text-red-600 transition-colors p-1 flex flex-col items-center justify-center gap-0.5" 
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu size={24} strokeWidth={1.5} />
                    <span className="text-[9px] font-black tracking-wider uppercase">Menú</span>
                </button>

                <Link to="/" className="cursor-pointer flex-shrink-0 hidden lg:block">
                    <img src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769311945/logoactualizado_rkbkby.png" alt="FG Store Logo" className={`object-contain transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16 md:h-18'}`} />
                </Link>
            </div>

            <Link to="/" className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                <img src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769311945/logoactualizado_rkbkby.png" alt="FG Store Logo" className="h-10 sm:h-12 object-contain" />
            </Link>

            <div className="hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8">
              <div className="flex items-center justify-center gap-5 xl:gap-8">
                <NavLink to="/" text="Inicio" />
                <NavLink to="/motos" text="Motos a Escala" />
                <NavLink to="/autos" text="Autos a Escala" />
                <NavLink to="/hotwheels" text="HOT WHEELS" isHot={true} icon={Flame} />
                <NavLink to="/accesorios" text="ACCESORIOS" />
                <NavLink to="/envios" text="ENVÍOS" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={onOpenCart} className="group flex flex-col lg:flex-row items-center justify-center gap-0.5 lg:gap-3 lg:pl-4 lg:border-l border-slate-200">
                <div className="relative p-1 flex flex-col items-center">
                  <ShoppingBag size={24} className="text-slate-900 group-hover:text-red-600 transition-colors md:w-8 md:h-8" strokeWidth={1.5} />
                  {carritoCount > 0 && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                      {carritoCount}
                    </motion.span>
                  )}
                </div>
                <span className="lg:hidden text-[9px] font-black tracking-wider uppercase">Carrito</span>
                
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-base font-black text-slate-900 group-hover:text-red-600 transition-colors uppercase tracking-tight leading-tight">CARRITO</span>
                  <span className="text-xs text-slate-500 font-medium">{carritoCount} {carritoCount === 1 ? 'ítem' : 'ítems'}</span>
                </div>
              </button>

              {user ? (
                <div className="relative hidden lg:block" onMouseEnter={() => setIsUserMenuOpen(true)} onMouseLeave={() => setIsUserMenuOpen(false)}>
                  <button className="flex items-center gap-2 pl-4 border-l border-slate-200 hover:text-red-600 transition-colors">
                    <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-sm">
                      {user.nombre.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-slate-900 hidden md:inline truncate max-w-[100px]">{user.nombre}</span>
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full right-0 pt-2 w-56 z-50">
                        <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                          
                          <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                            <p className="text-sm font-black text-slate-900 truncate">{user.nombre}</p>
                            <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                          </div>

                          <div className="p-2 space-y-1">
                            <Link to="/perfil" className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-red-600 rounded-lg transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                              <User size={18} /> Mi Perfil
                            </Link>

                            <Link to="/deseos" className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-red-600 rounded-lg transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                              <Heart size={18} /> Mis Favoritos
                            </Link>

                            {isAdmin && (
                              <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-red-600 rounded-lg transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                                <Settings size={18} /> Control de Inventario
                              </Link>
                            )}

                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <LogOut size={18} /> Cerrar Sesión
                            </button>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login" className="group hidden lg:flex items-center gap-3 pl-4 border-l border-slate-200 transition-colors">
                  <div className="relative p-1">
                    <User size={28} className="text-slate-900 group-hover:text-blue-600 transition-colors md:w-8 md:h-8" strokeWidth={1.5} />
                  </div>
                  <div className="hidden lg:flex flex-col items-start">
                    <span className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight leading-tight">INICIAR</span>
                    <span className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-wide">SESIÓN</span>
                  </div>
                </Link>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* OVERLAY DEL MENÚ MÓVIL (Con z-[60] para tapar BottomNav) */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsMobileMenuOpen(false)} 
      />
      
      {/* PANEL DEL MENÚ MÓVIL (Animación nativa tipo CarritoLateral) */}
      <div 
        className={`fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl z-[60] flex flex-col transform transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onTouchStart={handleMenuTouchStart}
        onTouchMove={handleMenuTouchMove}
        onTouchEnd={handleMenuTouchEnd}
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <img src="https://res.cloudinary.com/dx0dmthm2/image/upload/v1769311945/logoactualizado_rkbkby.png" alt="Logo" className="h-10" />
            <span className="font-black text-xl text-slate-900 uppercase tracking-tight">MENÚ</span>
          </div>
          
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded-xl hover:bg-slate-100 transition flex flex-col items-center justify-center gap-0.5 cursor-pointer">
            <X size={24} className="text-slate-600" />
            <span className="text-[9px] font-black tracking-wider uppercase text-slate-600">Cerrar</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
          <MobileLink to="/" text="Inicio" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/')} />
          <MobileLink to="/motos" text="Motos a escala" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/motos')} />
          <MobileLink to="/autos" text="Autos a escala" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/autos')} />
          <MobileLink to="/hotwheels" text="Hot Wheels" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/hotwheels')} isHot={true} icon={Flame} />
          <MobileLink to="/accesorios" text="Accesorios" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/accesorios')} />
          <MobileLink to="/envios" text="Envios" onClick={() => setIsMobileMenuOpen(false)} isActive={isActive('/envios')} />
        </div>

        <div className="p-6 bg-slate-900 text-white space-y-4">
          {user ? (
            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-3 text-sm">
                <p className="font-black truncate">{user.nombre}</p>
                <p className="text-xs opacity-80 truncate">{user.email}</p>
              </div>
              
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl p-3 transition-colors font-bold text-sm">
                  <Settings size={18} /> Control de Inventario
                </Link>
              )}

              {showLogoutConfirm ? (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowLogoutConfirm(false)} 
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-3 transition-colors font-bold text-sm"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleLogout} 
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl p-3 transition-colors font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} /> Salir
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLogoutConfirm(true)} 
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl p-3 transition-colors font-bold text-sm"
                >
                  <LogOut size={18} /> Cerrar Sesión
                </button>
              )}
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-3 transition-colors font-bold text-sm">
              <User size={18} /> Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

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
  </Link>
);