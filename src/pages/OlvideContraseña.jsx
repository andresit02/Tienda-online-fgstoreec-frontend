import React, { useState } from 'react';
import { Mail, Loader, ArrowLeft, KeyRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import axios from 'axios';

export default function OlvideContrasena() {
  const [paso, setPaso] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEnviarCodigo = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. VERIFICAMOS SI EL CORREO EXISTE ANTES DE ENVIAR NADA
      const check = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/check-email`, { email });
      if (!check.data.exists) {
        toast.error('Este correo no está registrado en FG Store.');
        setLoading(false);
        return;
      }

      // 2. SI EXISTE, ENVIAMOS EL CÓDIGO
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      
      toast.success('Código de recuperación enviado.');
      setPaso(2);
    } catch (error) {
      toast.error('Error al enviar el código');
    }
    setLoading(false);
  };

  const handleVerificarCodigo = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'recovery'
    });

    if (error) {
      toast.error('Código inválido o expirado');
    } else {
      toast.success('Código verificado');
      navigate('/restablecer-contrasena'); 
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        
        {paso === 1 ? (
          <>
            <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 font-bold">
              <ArrowLeft size={20} /> Volver al login
            </Link>
            <h1 className="text-2xl font-black text-slate-900 mb-2">Recuperar contraseña</h1>
            <p className="text-slate-500 mb-6 text-sm">Te enviaremos un código de 8 dígitos a tu correo.</p>
            <form onSubmit={handleEnviarCodigo} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="email" placeholder="Tu correo electrónico" required className="w-full pl-12 pr-4 py-3 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none"
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 flex justify-center">
                {loading ? <Loader className="animate-spin" size={20} /> : 'Enviar código'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-black text-slate-900 mb-2">Ingresa el código</h1>
            <p className="text-slate-500 mb-6 text-sm">Escribe los 8 dígitos que enviamos a <b>{email}</b></p>
            <form onSubmit={handleVerificarCodigo} className="space-y-4">
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="text" placeholder="Ej: 12345678" maxLength="8" required className="w-full pl-12 pr-4 py-3 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none text-center tracking-[0.3em] font-bold text-lg"
                  onChange={(e) => setOtp(e.target.value)} />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 flex justify-center">
                {loading ? <Loader className="animate-spin" size={20} /> : 'Verificar y Continuar'}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}