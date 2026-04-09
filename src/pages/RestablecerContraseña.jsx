import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

export default function RestablecerContrasena() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error('Las contraseñas no coinciden');
    if (password.length < 6) return toast.error('Mínimo 6 caracteres');

    setLoading(true);
    // Usamos la sesión que Supabase nos dio en el paso de OTP
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error('Error al actualizar contraseña. Intenta nuevamente.');
    } else {
      toast.success('¡Contraseña actualizada exitosamente!');
      await supabase.auth.signOut(); // Lo sacamos para que entre con la nueva clave
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-slate-900 mb-2">Crea tu nueva contraseña</h1>
          <p className="text-slate-600 text-sm">Estás a un paso de recuperar tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type={showPassword ? 'text' : 'password'} required placeholder="Nueva contraseña (mín 6)"
              className="w-full pl-12 pr-12 py-3 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none"
              onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type={showConfirmPassword ? 'text' : 'password'} required placeholder="Confirmar contraseña"
              className="w-full pl-12 pr-12 py-3 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none"
              onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl flex justify-center">
            {loading ? <Loader size={20} className="animate-spin" /> : 'Actualizar y Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}