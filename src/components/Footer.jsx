import React from "react";
import { Facebook, Instagram, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  
  // 1. LEER LA RUTA ACTUAL
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // SOLUCIÓN AL PARPADEO: Salto instantáneo en lugar de 'smooth'
  const scrollToTop = () => {
    window.scrollTo(0, 0); 
  };

  const FooterLink = ({ text, to }) => (
    <Link 
      to={to}
      onClick={scrollToTop}
      className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-300 text-base flex items-center gap-2 group py-1 w-full text-left"
    >
      <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100 flex-shrink-0">
        <ArrowRight size={16} className="text-red-500" />
      </span>
      {text}
    </Link>
  );

  return (
    // 2. MEJORA: Ocultar en móvil si NO es el inicio (pero mantener en Desktop)
    <footer className={`bg-[#0f172a] text-slate-300 border-t border-slate-800 font-sans ${isHomePage ? 'block' : 'hidden md:block'}`}>
      
      {/* SECCIÓN PRINCIPAL */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">

          {/* 1. MARCA Y REDES */}
          <div className="space-y-6">
            <div>
                <h2 className="text-4xl font-black italic tracking-tighter text-white mb-3">
                  FG<span className="text-red-600">STOREEC</span>
                </h2>
            </div>
            
            <p className="text-slate-300 text-base leading-relaxed max-w-sm">
              Vehículos a escala y varios productos mas. Compra fácil y rápido
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/fgstoreec"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm hover:shadow-blue-500/20 hover:-translate-y-1"
              >
                <Facebook size={22} />
              </a>
              <a
                href="https://www.instagram.com/fgstoreec"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-gradient-to-tr hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white transition-all duration-300 shadow-sm hover:shadow-red-500/20 hover:-translate-y-1"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://www.tiktok.com/@fgstoreec"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-black transition-all duration-300 shadow-sm hover:shadow-cyan-400/20 hover:-translate-y-1"
              >
                 <svg className="w-6 h-6 fill-current group-hover:text-[#00f2ea] transition-colors" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-1.84 4.83 4.83 0 0 1-1.17-3.03h-3.92v13.13a2.47 2.47 0 1 1-2.47-2.47c.23 0 .45.03.66.08v-3.99a6.44 6.44 0 1 0 6.43 6.44V9.5a8.75 8.75 0 0 0 4.24 1.1V6.69z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 2. EXPLORAR */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-b-2 border-red-600/30 pb-3 inline-block">
              Explorar
            </h3>
            <div className="flex flex-col gap-3">
              <FooterLink text="Inicio" to="/" />
              <FooterLink text="Motos a Escala" to="/motos" />
              <FooterLink text="Autos a Escala" to="/autos" />
              <FooterLink text="HotWheels" to="/hotwheels" />
              <FooterLink text="Accesorios" to="/accesorios" />
              <FooterLink text="Referencias de envíos" to="/envios" />
            </div>
          </div>

          {/* 3. CONTACTO */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-b-2 border-red-600/30 pb-3 inline-block">
              Contacto
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-slate-300 text-base">
                <div className="bg-slate-800/50 p-2 rounded-lg shrink-0">
                    <MapPin className="text-red-500" size={20} />
                </div>
                <span>
                  Quito, Ecuador.<br />
                  <span className="text-sm text-slate-400 font-medium">Envíos seguros a todo el país.</span>
                </span>
              </li>
              
              <li className="flex items-center gap-4 text-slate-300 text-base">
                <div className="bg-slate-800/50 p-2 rounded-lg shrink-0">
                    <Phone className="text-red-500" size={20} />
                </div>
                <span className="font-medium">095 886 6618</span>
              </li>

              <li className="flex items-center gap-4 text-slate-300 text-base">
                 <div className="bg-slate-800/50 p-2 rounded-lg shrink-0">
                    <Mail className="text-red-500" size={20} />
                 </div>
                <span className="font-medium">fgstoreec@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* BARRA INFERIOR */}
      <div className="bg-[#020617] py-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400 font-medium">
            <p className="text-center md:text-left">© 2026 FGSTOREEC. Todos los derechos reservados.</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link to="/terminos" onClick={scrollToTop} className="hover:text-white transition-colors whitespace-nowrap">Términos y Condiciones</Link>
              <Link to="/privacidad" onClick={scrollToTop} className="hover:text-white transition-colors whitespace-nowrap">Política de Privacidad</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}