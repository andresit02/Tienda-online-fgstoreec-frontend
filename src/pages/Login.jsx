import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      // Cambiaremos esto a tu URL de Render cuando subas el backend
      const res = await axios.post('https://tienda-online-fgstoreec-backend.onrender.com/api/auth/login', { email, password });
      const { token, user } = res.data;

      if (user.role !== 'admin') {
        toast.error('Acceso denegado. No tienes permisos de administrador.');
        setCargando(false);
        return;
      }

      // Guardamos el token de seguridad
      localStorage.setItem('fgstore_token', token);
      toast.success(`Bienvenido ${user.nombre}`);
      navigate('/admin'); // Redirigimos al Dashboard
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        <div className="flex justify-center mb-6">
          <div className="bg-slate-900 p-4 rounded-full text-white"><Lock size={32} /></div>
        </div>
        <h2 className="text-2xl font-black text-center text-slate-900 mb-2">Acceso Administrativo</h2>
        <p className="text-center text-slate-500 text-sm mb-6">Ingresa tus credenciales para gestionar la tienda</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="email" placeholder="Correo electrónico" required
              className="w-full border-2 border-slate-200 p-3 pl-10 rounded-xl outline-none focus:border-slate-900 transition"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="password" placeholder="Contraseña" required
              className="w-full border-2 border-slate-200 p-3 pl-10 rounded-xl outline-none focus:border-slate-900 transition"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={cargando} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition disabled:opacity-70">
            {cargando ? 'Verificando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;