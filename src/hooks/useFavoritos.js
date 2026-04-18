import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const { user, token } = useAuth();

  // 1. Cargar favoritos desde la Base de Datos
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
      console.error('Error cargando favoritos de la DB:', error);
    }
  };

  // Se ejecuta cada vez que el usuario inicia o cierra sesión
  useEffect(() => {
    fetchFavoritos();
  }, [user, token]);

  // 2. Agregar o Quitar Favorito (Optimistic UI para que se sienta instantáneo)
  const toggleFavorito = async (producto) => {
    if (!user || !token) return;

    const isFav = favoritos.some(p => p.id === producto.id);
    
    // Actualizamos la interfaz al instante
    if (isFav) {
      setFavoritos(prev => prev.filter(p => p.id !== producto.id));
      toast.success('Eliminado de favoritos');
    } else {
      setFavoritos(prev => [...prev, producto]);
      toast.success('Agregado a favoritos ❤️');
    }

    // Le avisamos a la Base de Datos en segundo plano
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/favoritos/toggle`, {
        productId: producto.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      toast.error('Error de conexión con el servidor');
      fetchFavoritos(); // Revertimos si falla el backend
    }
  };

  // Creamos un array solo con los IDs para que sea fácil pintar los corazones de rojo
  const favoritosIds = favoritos.map(f => f.id);

  return { favoritos, favoritosIds, toggleFavorito };
};