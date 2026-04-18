import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  
  // AÑADIDO: Extraemos la función logout
  const { user, token, logout } = useAuth();

  const fetchFavoritos = async () => {
    if (!user || !token) {
      setFavoritos([]);
      return;
    }
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/favoritos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavoritos(res.data);
    } catch (error) {
      // LÓGICA DE CADUCIDAD DE SESIÓN
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', { duration: 4000 });
        logout(); // Cerramos la sesión automáticamente
      } else {
        console.error('Error cargando favoritos de la DB:', error);
      }
    }
  };

  useEffect(() => {
    fetchFavoritos();
  }, [user, token]);

  const toggleFavorito = async (producto) => {
    if (!user || !token) return;

    const isFav = favoritos.some(p => p.id === producto.id);
    
    if (isFav) {
      setFavoritos(prev => prev.filter(p => p.id !== producto.id));
      toast.success('Eliminado de favoritos');
    } else {
      setFavoritos(prev => [...prev, producto]);
      toast.success('Agregado a favoritos ❤️');
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/favoritos/toggle`, {
        productId: producto.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      // LÓGICA DE CADUCIDAD DE SESIÓN
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', { duration: 4000 });
        logout(); // Cerramos la sesión automáticamente
      } else {
        toast.error('Error de conexión con el servidor');
        fetchFavoritos(); // Revertimos visualmente si falla el backend
      }
    }
  };

  const favoritosIds = favoritos.map(f => f.id);

  return { favoritos, favoritosIds, toggleFavorito };
};