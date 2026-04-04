import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Loader, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function RestablecerContraseña() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-black text-red-600 mb-4">
            Token Inválido
          </h1>
          <p className="text-slate-600 mb-6">
            El enlace de recuperación es inválido o ha expirado.
          </p>
          <Link
            to="/forgot-password"
            className="inline-flex items-center gap-2 text-red-600 font-bold hover:text-red-700"
          >
            <ArrowLeft size={18} />
            Solicitar nuevo enlace
          </Link>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        {
          token,
          newPassword: formData.password,
        }
      );

      setSuccess(true);
      toast.success('¡Contraseña actualizada exitosamente!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Error al restablecer la contraseña';

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
            Nueva Contraseña
          </h1>
          <p className="text-slate-600">
            Establece una nueva contraseña para tu cuenta
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Nueva Contraseña */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Nueva Contraseña
                </label>

                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                    size={20}
                  />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 8 caracteres"
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg transition-all focus:outline-none ${
                      errors.password
                        ? 'border-red-500 focus:border-red-600 bg-red-50'
                        : 'border-slate-200 focus:border-red-600 focus:bg-white'
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirmar Contraseña */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Confirmar Contraseña
                </label>

                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                    size={20}
                  />

                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg transition-all focus:outline-none ${
                      errors.confirmPassword
                        ? 'border-red-500 focus:border-red-600 bg-red-50'
                        : 'border-slate-200 focus:border-red-600 focus:bg-white'
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  'Actualizar Contraseña'
                )}
              </button>

            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Lock className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                ¡Éxito!
              </h2>
              <p className="text-slate-600">
                Tu contraseña ha sido actualizada correctamente. Serás redirigido al inicio de sesión.
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
              Ir al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}