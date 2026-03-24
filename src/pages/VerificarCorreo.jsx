import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const VerificarCorreo = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [estado, setEstado] = useState('cargando'); // cargando, exito, error
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setEstado('error');
      setMensaje('No se proporcionó un token de verificación válido.');
      return;
    }

    const verificar = async () => {
      try {
        const res = await axios.get(`https://tienda-online-fgstoreec-backend.onrender.com/api/auth/verify-email?token=${token}`);
        setEstado('exito');
        setMensaje(res.data.message || 'Tu cuenta ha sido verificada correctamente.');
      } catch (error) {
        setEstado('error');
        setMensaje(error.response?.data?.error || 'El enlace es inválido o ha expirado.');
      }
    };

    verificar();
  }, [token]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 font-sans text-center">
      {estado === 'cargando' && (
        <div className="flex flex-col items-center gap-4 text-slate-600">
          <Loader className="animate-spin text-blue-600" size={48} />
          <h2 className="text-xl font-bold">Verificando tu correo...</h2>
        </div>
      )}

      {estado === 'exito' && (
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <CheckCircle className="text-green-500" size={64} />
          <h2 className="text-2xl font-black text-slate-900">¡Verificación Exitosa!</h2>
          <p className="text-slate-600 max-w-md">{mensaje}</p>
          <button onClick={() => navigate('/login')} className="mt-4 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800">
            Ir a Iniciar Sesión
          </button>
        </div>
      )}

      {estado === 'error' && (
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <XCircle className="text-red-500" size={64} />
          <h2 className="text-2xl font-black text-slate-900">Error de Verificación</h2>
          <p className="text-slate-600 max-w-md">{mensaje}</p>
          <button onClick={() => navigate('/')} className="mt-4 bg-slate-100 text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-200">
            Volver al Inicio
          </button>
        </div>
      )}
    </div>
  );
};

export default VerificarCorreo;