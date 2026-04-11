import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export const useCarrito = () => {
  // 1. INICIALIZAR LEYENDO LOCALSTORAGE AL INSTANTE (Solución al bug del refresh)
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('fgstore_carrito');
      return guardado ? JSON.parse(guardado) : [];
    } catch (error) {
      console.error("Error leyendo localStorage", error);
      return [];
    }
  });
  
  const [isCarritoAbierto, setIsCarritoAbierto] = useState(false);
  const { user, token } = useAuth(); 

  // 2. CARGAMOS EL CARRITO DE LA BD SI INICIA SESIÓN
  useEffect(() => {
    if (user && token) {
      fetchCartFromAPI();
    }
  }, [user, token]);

  // 3. GUARDAMOS EN LOCALSTORAGE CADA VEZ QUE CAMBIE EL CARRITO (Solo si es invitado)
  useEffect(() => {
    if (!user) {
      localStorage.setItem('fgstore_carrito', JSON.stringify(carrito));
    }
  }, [carrito, user]);

  // Función para leer de la base de datos
  const fetchCartFromAPI = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const formattedCart = res.data.items.map(item => ({
        ...item.product,
        cantidad: item.cantidad,
        cartItemId: item.id // ID único de la fila en la BD
      }));
      setCarrito(formattedCart);
    } catch (error) {
      console.error('Error cargando carrito de la DB:', error);
    }
  };

  // 4. AGREGAR AL CARRITO
  const agregarAlCarrito = async (producto) => {
    if (user && token) {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
          productId: producto.id,
          cantidad: 1
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success(`${producto.nombre} agregado al carrito`);
        fetchCartFromAPI(); // Recargamos para obtener el cartItemId
        setIsCarritoAbierto(true);
      } catch (error) {
        toast.error('Error al guardar en tu cuenta');
      }
    } else {
      // Lógica para invitados
      setCarrito(prev => {
        const existe = prev.find(item => item.id === producto.id);
        if (existe) {
          return prev.map(item => item.id === producto.id ? {...item, cantidad: item.cantidad + 1} : item);
        }
        return [...prev, {...producto, cantidad: 1}];
      });
      toast.success(`${producto.nombre} agregado al carrito`);
      setIsCarritoAbierto(true);
    }
  };

  // 5. ELIMINAR DEL CARRITO
  const eliminarDelCarrito = async (id, cartItemId) => {
    if (user && token && cartItemId) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/remove/${cartItemId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchCartFromAPI();
        toast.success('Producto eliminado');
      } catch (error) {
        toast.error('Error al eliminar');
      }
    } else {
      setCarrito(prev => prev.filter(item => item.id !== id));
      toast.success('Producto eliminado');
    }
  };

  // 6. ACTUALIZAR CANTIDAD (+ o -)
  const actualizarCantidad = async (id, delta, cartItemId) => {
    const item = carrito.find(i => i.id === id);
    if (!item) return;
    
    const nuevaCantidad = Math.max(1, item.cantidad + delta);
    if (nuevaCantidad === item.cantidad) return; 

    if (user && token && cartItemId) {
      try {
        // Optimistic UI: actualiza visualmente al instante
        setCarrito(prev => prev.map(i => i.id === id ? { ...i, cantidad: nuevaCantidad } : i));
        
        await axios.put(`${import.meta.env.VITE_API_URL}/api/cart/update/${cartItemId}`, {
          cantidad: nuevaCantidad
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        toast.error('Error de conexión');
        fetchCartFromAPI(); // Revierte en caso de fallo
      }
    } else {
      setCarrito(prev => prev.map(i => i.id === id ? { ...i, cantidad: nuevaCantidad } : i));
    }
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return {
    carrito,
    isCarritoAbierto,
    setIsCarritoAbierto,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    totalCarrito
  };
};