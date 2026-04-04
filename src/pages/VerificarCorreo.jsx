import React, { useEffect, useState, useRef } from 'react'; // Añadimos useRef
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const VerificarCorreo = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [estado, setEstado] = useState('cargando');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  
  // 1. Añadimos esta referencia para evitar la doble ejecución
  const hasRun = useRef(false);

  useEffect(() => {
    // 2. Si no hay token o si ya se ejecutó una vez, no hacemos nada
    if (!token || hasRun.current) return;
    
    // Marcamos que ya se está ejecutando
    hasRun.current = true;

    const verificar = async () => {
      try {
        // 3. Usamos la variable de entorno en lugar de la URL fija
        const apiUrl = import.meta.env.VITE_API_URL || 'https://tienda-online-fgstoreec-backend.onrender.com';
        const res = await axios.get(`${apiUrl}/api/auth/verify-email?token=${token}` );
        
        setEstado('exito');
        setMensaje(res.data.message || 'Tu cuenta ha sido verificada correctamente.');
      } catch (error) {
        // Si el error es porque el token ya no existe pero el usuario ya está verificado,
        // podrías manejarlo aquí, pero con useRef esto ya no debería pasar.
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
