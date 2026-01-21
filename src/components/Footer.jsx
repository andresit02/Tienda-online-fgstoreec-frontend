import { Facebook, Instagram } from "lucide-react";

export default function Footer({ setVistaActual }) {
  return (
    <footer className="bg-[#1c1b1a] text-white pt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* MARCA */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Fgstore</h2>
          <p className="text-sm text-slate-300 mb-6">
            Vehículos a escala y varios productos más. Compra fácil y rápido
          </p>

          <div className="flex gap-4 items-center">
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@fgstoreec?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok FG Store"
                className="hover:text-red-500 transition"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-1.84 4.83 4.83 0 0 1-1.17-3.03h-3.92v13.13a2.47 2.47 0 1 1-2.47-2.47c.23 0 .45.03.66.08v-3.99a6.44 6.44 0 1 0 6.43 6.44V9.5a8.75 8.75 0 0 0 4.24 1.1V6.69z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/fgstoreec/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram FG Store"
                className="hover:text-red-500 transition"
              >
                <Instagram className="w-6 h-6" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/18QZnUaMjN/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook FG Store"
                className="hover:text-red-500 transition"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>


        </div>

        {/* CONTACTO */}
        <div>
          <h3 className="font-bold text-lg mb-4">CONTACTO</h3>
          <p className="text-sm text-slate-300 mb-2">0958866618</p>
          <p className="text-sm text-slate-300">fgstoreec@gmail.com</p>
        </div>

        {/* SOPORTE */}
        <div>
          <h3 className="font-bold text-lg mb-4">SOPORTE</h3>
          <label className="block text-sm text-slate-300 mb-2">
            Ingresa tu correo electrónico
          </label>

          <input
            type="email"
            placeholder="Escribe aquí"
            className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-orange-500 mb-2"
          />
          <p className="text-red-500 text-xs mb-4">This field is required</p>

          <button className="bg-orange-600 hover:bg-orange-700 transition text-white px-6 py-3 rounded-full font-semibold">
            Enviar ahora
          </button>
        </div>
      </div>

      {/* PARTE INFERIOR */}
      <div className="border-t border-white/10 mt-16 py-6 text-center text-xs text-slate-400">
        © 2025. All rights reserved. ·{" "}
        <button
          onClick={() => setVistaActual("pruebas")}
          className="text-red-400 hover:underline"
        >
          Ver Galería de Envíos
        </button>
      </div>
    </footer>
  );
}
