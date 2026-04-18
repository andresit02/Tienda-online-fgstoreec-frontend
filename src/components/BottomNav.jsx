import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Store, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();

  const NAV_ITEMS = [
    { path: '/', icon: Home, label: 'Inicio' },
    { path: '/motos', icon: Store, label: 'Tienda' },
    { path: '/deseos', icon: Heart, label: 'Favoritos' },
    { path: '/perfil', icon: User, label: 'Perfil' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-[68px] z-50 md:hidden pb-1">
      {NAV_ITEMS.map((item) => {
        // La tienda se marca activa en cualquier ruta del catálogo
        const isShopRoute = ['/motos', '/autos', '/hotwheels', '/accesorios'].some(r => location.pathname.includes(r));
        const isActive = location.pathname === item.path || (item.path === '/motos' && isShopRoute);
        
        // Redirección si requiere login (Favoritos/Perfil)
        const finalPath = (item.path === '/deseos' || item.path === '/perfil') && !user ? '/login' : item.path;

        return (
          <Link 
            key={item.path} 
            to={finalPath} 
            className="relative flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-slate-900 transition-colors"
          >
            {/* Animación fluida de la línea superior tipo Adidas */}
            {isActive && (
              <motion.div 
                layoutId="bottomNavIndicator" 
                className="absolute top-0 left-0 right-0 h-[3px] bg-slate-900" 
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            <item.icon 
              size={24} 
              strokeWidth={isActive ? 2.5 : 2} 
              className={`mb-1 transition-all duration-300 ${isActive ? 'text-slate-900 scale-110' : ''}`} 
            />
            
            <span className={`text-[10px] font-bold tracking-wide transition-all duration-300 ${isActive ? 'text-slate-900' : ''}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}