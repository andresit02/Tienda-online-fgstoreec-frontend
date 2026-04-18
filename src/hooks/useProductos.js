import { useState, useEffect } from 'react';
import axios from 'axios';

// SOLUCIÓN: Usamos la variable de entorno
const API_URL = `${import.meta.env.VITE_API_URL}/api/productos`;

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(API_URL);
        setProductos(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error cargando productos:", error);
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return { productos, loading };
};