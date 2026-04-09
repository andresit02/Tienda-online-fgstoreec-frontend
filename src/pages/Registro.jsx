import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Loader, Eye, EyeOff, KeyRound, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Registro() {
  const [paso, setPaso] = useState(1); 
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', confirmPassword: '' });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false); // Nuevo estado para el botón de reenviar
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    });
    if (error) toast.error(error.message);
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return toast.error('Las contraseñas no coinciden');
    if (formData.password.length < 6) return toast.error('La contraseña debe tener al menos 6 caracteres');

    setLoading(true);
    try {
      // 1. VERIFICAMOS SI EL CORREO YA EXISTE EN EL BACKEND
      const check = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/check-email`, { email: formData.email });
      if (check.data.exists) {
        toast.error('Este correo ya está registrado. Inicia sesión.');
        setLoading(false);
        return;
      }

      // 2. REGISTRAMOS EN SUPABASE
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: { data: { nombre: formData.nombre } }
      });

      if (error) throw error;
      
      toast.success('Código enviado a tu correo');
      setPaso(2);
    } catch (error) {
      // Si el error es que el usuario ya existe pero no verificó su correo, lo dejamos pasar al paso 2
      if (error.message.includes('already registered')) {
         toast.success('Ya habías intentado registrarte. Revisa tu correo o reenvía el código.');
         setPaso(2);
      } else {
         toast.error(error.message || 'Error al registrar');
      }
    }
    setLoading(false);
  };

  // NUEVA FUNCIÓN: REENVIAR CÓDIGO
  const handleReenviarCodigo = async () => {
    setResendLoading(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: formData.email,
    });

    if (error) {
      toast.error('Espera unos segundos antes de pedir otro código.');
    } else {
      toast.success('¡Nuevo código enviado! Revisa tu bandeja principal y la de SPAM.');
    }
    setResendLoading(false);
  };

  const handleVerificar = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.verifyOtp({
      email: formData.email,
      token: otp,
      type: 'signup'
    });

    if (error) {
      toast.error('Código inválido o expirado');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/sync`, {
        email: data.user.email,
        nombre: data.user.user_metadata.nombre || formData.nombre,
        supabase_id: data.user.id
      });
      
      login(response.data.user, response.data.token);
      toast.success('¡Cuenta creada con éxito!');
      navigate('/');
    } catch (err) {
      toast.error('Error al sincronizar tu perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        
        {paso === 1 ? (
          <>
            <h1 className="text-3xl font-black text-center text-slate-900 mb-6">Crear Cuenta</h1>
            <form onSubmit={handleRegistro} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                {/* AÑADIMOS value={formData.nombre} PARA QUE NO SE BORRE */}
                <input type="text" placeholder="Nombre completo" required 
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="email" placeholder="Correo electrónico" required 
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type={showPassword ? "text" : "password"} placeholder="Contraseña (mín. 6 caracteres)" required 
                  className="w-full pl-12 pr-12 py-3 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirmar contraseña" required 
                  className="w-full pl-12 pr-12 py-3 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex justify-center items-center hover:bg-slate-800">
                {loading ? <Loader className="animate-spin" size={20} /> : 'Registrarse'}
              </button>
            </form>

            <div className="relative my-8 text-center">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
              <span className="relative px-4 bg-white text-sm text-slate-500 font-medium">O continúa con</span>
            </div>
            <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 border-2 border-slate-200 py-3 rounded-xl font-bold hover:bg-slate-50">
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" /> Google
            </button>
            <p className="mt-6 text-center text-slate-600">¿Ya tienes cuenta? <Link to="/login" className="text-red-600 font-bold hover:underline">Inicia sesión</Link></p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-black text-center text-slate-900 mb-2">Verifica tu correo</h1>
            <p className="text-center text-slate-600 mb-6 text-sm">Ingresa el código de 8 dígitos que enviamos a <br/><b className="text-slate-900">{formData.email}</b></p>
            <form onSubmit={handleVerificar} className="space-y-4">
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="text" placeholder="Ej: 12345678" maxLength="8" required className="w-full pl-12 pr-4 py-3 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none text-center font-bold tracking-[0.3em] text-lg"
                  onChange={(e) => setOtp(e.target.value)} />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold flex justify-center items-center">
                {loading ? <Loader className="animate-spin" size={20} /> : 'Verificar Código'}
              </button>
              
              {/* BOTONES DE ACCIÓN SECUNDARIA */}
              <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-slate-100">
                <button type="button" onClick={handleReenviarCodigo} disabled={resendLoading} className="w-full text-slate-600 text-sm font-bold flex justify-center items-center gap-2 hover:text-slate-900 transition-colors">
                  {resendLoading ? <Loader className="animate-spin" size={16} /> : <RefreshCw size={16} />}
                  ¿No recibiste el código? Reenviar
                </button>
                <button type="button" onClick={() => setPaso(1)} className="w-full text-slate-400 text-sm font-bold hover:text-slate-600 transition-colors underline">
                  Corregir información
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
}