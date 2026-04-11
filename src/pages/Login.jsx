import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); 

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    });
    if (error) toast.error(error.message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      if (error.message === 'Email not confirmed') {
        toast.error('Por favor, verifica tu correo electrónico.');
      } else {
        try {
          const check = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/check-email`, { email: formData.email });
          if (check.data.exists) {
            toast.error('Credenciales inválidas. Si tu cuenta fue creada con Google, inicia sesión con Google o crea una contraseña en tu Perfil.', { duration: 6000 });
          } else {
            toast.error('Usuario no encontrado. Regístrate primero.');
          }
        } catch (err) {
          toast.error('Credenciales inválidas');
        }
      }
      setLoading(false);
      return;
    }

    try {
      // SEGURIDAD: Ahora enviamos el token real de Supabase en los Headers
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/sync`, {
        nombre: data.user.user_metadata.nombre || data.user.email.split('@')[0]
      }, {
        headers: { Authorization: `Bearer ${data.session.access_token}` }
      });
      
      login(response.data.user, response.data.token, rememberMe); 
      toast.success(`¡Bienvenido, ${response.data.user.nombre}!`);
      navigate('/');
    } catch (err) {
      toast.error('Error al sincronizar perfil con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <h1 className="text-3xl font-black text-center text-slate-900 mb-6">FG Store</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type="email" name="email" autoComplete="username" placeholder="Correo electrónico" required className="w-full pl-12 pr-4 py-3 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" placeholder="Contraseña" required className="w-full pl-12 pr-12 py-3 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
              />
              <span className="text-sm text-slate-600 font-medium">Recordarme</span>
            </label>
            <Link to="/olvide-contrasena" className="text-sm font-bold text-red-600 hover:underline">¿Olvidaste tu contraseña?</Link>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all flex justify-center items-center mt-4">
            {loading ? <Loader className="animate-spin" size={20} /> : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
          <span className="relative px-4 bg-white text-sm text-slate-500 font-medium">O continúa con</span>
        </div>

        <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 border-2 border-slate-200 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all">
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
          Google
        </button>
        
        <p className="mt-6 text-center text-slate-600">
          ¿No tienes cuenta? <Link to="/registro" className="text-red-600 font-bold hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
   );
}