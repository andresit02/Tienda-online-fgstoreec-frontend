import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Lock, Loader, Eye, EyeOff, ShieldCheck, User, Package, MapPin, CreditCard, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Perfil() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('datos');
  
  // Estados para la contraseña
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleActualizarContrasena = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error('Las contraseñas no coinciden');
    if (password.length < 6) return toast.error('Mínimo 6 caracteres');
    
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    
    if (error) {
      toast.error('Error al actualizar la contraseña.');
    } else {
      toast.success('¡Contraseña guardada exitosamente!');
      setPassword('');
      setConfirmPassword('');
    }
    setLoading(false);
  };

  // Menú de navegación del perfil
  const menuItems = [
    { id: 'datos', label: 'Datos Personales', icon: User },
    { id: 'pedidos', label: 'Mis Pedidos', icon: Package },
    { id: 'direcciones', label: 'Direcciones', icon: MapPin },
    { id: 'pagos', label: 'Métodos de Pago', icon: CreditCard },
    { id: 'seguridad', label: 'Seguridad', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* ENCABEZADO */}
        <div className="mb-6 md:mb-8 text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900">Mi Cuenta</h1>
          <p className="text-slate-500 mt-1">Gestiona tu información, pedidos y seguridad.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          
          {/* MENÚ DE NAVEGACIÓN */}
          <div className="w-full md:w-64 shrink-0">
            
            {/* VISTA MÓVIL: Grid de Tarjetas (Solo visible en pantallas pequeñas) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:hidden mb-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all
                      ${isActive 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <Icon size={24} className={isActive ? 'text-red-500' : 'text-slate-400'} />
                    <span className="text-[11px] font-bold text-center leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* VISTA DESKTOP: Menú Lateral Original (Solo visible en md o superior) */}
            <div className="hidden md:flex bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-col">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors text-left
                      ${isActive 
                        ? 'bg-slate-900 text-white border-l-4 border-red-500' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'
                      }
                    `}
                  >
                    <Icon size={20} className={isActive ? 'text-red-500' : 'text-slate-400'} />
                    {item.label}
                  </button>
                );
              })}
            </div>
            
          </div>

          {/* ÁREA DE CONTENIDO */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 min-h-[400px]">
            
            {/* TABS: DATOS PERSONALES */}
            {activeTab === 'datos' && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Información Personal</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nombre Completo</label>
                    <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium">
                      {user?.nombre}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Para cambiar tu nombre, contacta a soporte.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Correo Electrónico</label>
                    <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium truncate">
                      {user?.email}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TABS: PEDIDOS, DIRECCIONES, PAGOS (MOCKUPS EN DESARROLLO) */}
            {(activeTab === 'pedidos' || activeTab === 'direcciones' || activeTab === 'pagos') && (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in py-12">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                  <Clock size={32} className="text-slate-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Función en desarrollo</h2>
                <p className="text-slate-500 max-w-md mx-auto">
                  Estamos trabajando para traer esta característica muy pronto. 
                  Podrás gestionar tus {activeTab === 'pedidos' ? 'compras y rastrear envíos' : activeTab === 'direcciones' ? 'direcciones de entrega' : 'métodos de pago'} directamente desde aquí.
                </p>
              </div>
            )}

            {/* TABS: SEGURIDAD (EL CÓDIGO QUE YA TENÍAS) */}
            {activeTab === 'seguridad' && (
              <div className="animate-fade-in max-w-xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Seguridad de la Cuenta</h2>
                <p className="text-sm text-slate-500 mb-8">
                  Actualiza tu contraseña para mantener tu cuenta segura. Si creaste tu cuenta usando Google, configurar una contraseña aquí te permitirá iniciar sesión de forma tradicional en el futuro.
                </p>
                
                <form onSubmit={handleActualizarContrasena} className="space-y-5">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input type={showPassword ? "text" : "password"} required placeholder="Nueva contraseña (mín. 6 caracteres)" value={password}
                      className="w-full pl-12 pr-12 py-3 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none transition-colors"
                      onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input type={showConfirmPassword ? "text" : "password"} required placeholder="Confirmar nueva contraseña" value={confirmPassword}
                      className="w-full pl-12 pr-12 py-3 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none transition-colors"
                      onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <button type="submit" disabled={loading} className="w-full md:w-auto px-8 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl flex justify-center items-center transition-colors">
                    {loading ? <Loader size={20} className="animate-spin" /> : 'Guardar Contraseña'}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}