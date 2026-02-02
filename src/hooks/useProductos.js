import { useState, useEffect } from 'react';
import axios from 'axios';

// TU URL REAL DE RENDER
const API_URL = 'https://tienda-online-fgstoreec-backend.onrender.com/api/productos';

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(API_URL);
        setProductos(response.data); // Guardamos la lista completa
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