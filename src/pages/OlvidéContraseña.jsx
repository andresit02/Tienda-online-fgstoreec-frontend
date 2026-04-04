import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Loader, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function OlvidéContraseña() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('El correo es requerido');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Correo inválido');
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        { email }
      );

      setSent(true);
      toast.success('Se ha enviado un correo de recuperación');
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'Error al enviar el correo';

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-2">
            Recuperar Contraseña
          </h1>
          <p className="text-slate-600">
            Te ayudaremos a acceder a tu cuenta
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Correo Electrónico
                </label>

                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                    size={20}
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="tu@email.com"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all focus:outline-none ${
                      error
                        ? 'border-red-500 focus:border-red-600 bg-red-50'
                        : 'border-slate-200 focus:border-red-600 focus:bg-white'
                    }`}
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                )}
              </div>

              <p className="text-sm text-slate-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
                Ingresa el correo asociado a tu cuenta y te enviaremos un enlace
                para restablecer tu contraseña.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Enlace'
                )}
              </button>

            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Mail className="text-green-600" size={32} />
              </div>

              <h2 className="text-2xl font-black text-slate-900">
                ¡Correo Enviado!
              </h2>

              <p className="text-slate-600">
                Hemos enviado un enlace de recuperación a{' '}
                <span className="font-bold">{email}</span>. Revisa tu bandeja de
                entrada y sigue las instrucciones.
              </p>

              <p className="text-sm text-slate-500">
                El enlace expirará en 1 hora.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-red-600 font-bold hover:text-red-700 transition-colors"
            >
              <ArrowLeft size={18} />
              Volver al inicio de sesión
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}