import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Package, Ship, DollarSign, Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; 

import Inventario from './components/Inventario';
import Lotes from './components/Lotes';
import Ventas from './components/Ventas';
import Finanzas from './components/Finanzas';

const BASE_API_URL = `${import.meta.env.VITE_API_URL}/api`;

export default function AdminDashboard() {
  const { user, logout, token } = useAuth(); 
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inventario');

  // Estados Globales Maestros
  const [productos, setProductos] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [arriendos, setArriendos] = useState([]);

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const handleLogout = () => { logout(); navigate('/login'); };

  // Funciones de Carga Global
  const cargarProductos = async (busqueda = "") => {
    try {
      const res = await axios.get(`${BASE_API_URL}/productos?search=${busqueda}`, config);
      setProductos(res.data.productos || res.data);
    } catch (e) { if (e.response?.status === 401) handleLogout(); }
  };

  const cargarLotes = async () => {
    try {
      const res = await axios.get(`${BASE_API_URL}/importaciones`, config);
      setLotes(res.data);
    } catch (e) { console.error(e); }
  };

  const cargarVentas = async () => {
    try {
      const res = await axios.get(`${BASE_API_URL}/ventas`, config);
      setVentas(res.data);
    } catch (e) { console.error(e); }
  };

  const cargarFinanzas = async () => {
    try {
      const res = await axios.get(`${BASE_API_URL}/finanzas/arriendo`, config);
      setArriendos(res.data);
    } catch(e) { console.error(e); }
  };

  // Carga inicial
  useEffect(() => {
    if (token) { cargarProductos(); cargarLotes(); cargarVentas(); cargarFinanzas(); }
  }, [token]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-8 font-sans text-slate-900 pb-20 md:pb-8">
      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">Panel Administrador</h1>
            <p className="text-slate-500 text-sm">Hola {user?.nombre}, gestiona tu negocio</p>
          </div>
        </div>

        {/* SOLUCIÓN MÓVIL: Botones integrados directamente con flex-shrink-0 para evitar reseteos de scroll */}
        <div className="flex overflow-x-auto gap-3 mb-6 pb-2 hide-scroll w-full scroll-smooth">
          
          <button onClick={() => setActiveTab('inventario')} className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === 'inventario' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
            <Package size={18} /> Inventario
          </button>
          
          <button onClick={() => setActiveTab('importaciones')} className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === 'importaciones' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
            <Ship size={18} /> Lotes (Importación)
          </button>

          <button onClick={() => setActiveTab('ventas')} className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === 'ventas' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
            <DollarSign size={18} /> Ventas
          </button>

          <button onClick={() => setActiveTab('finanzas')} className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === 'finanzas' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
            <Wallet size={18} /> Finanzas & Socios
          </button>

        </div>

        {/* INYECCIÓN DE COMPONENTES MODULARES */}
        {activeTab === 'inventario' && <Inventario productos={productos} lotes={lotes} cargarProductos={cargarProductos} cargarLotes={cargarLotes} config={config} />}
        {activeTab === 'importaciones' && <Lotes lotes={lotes} cargarLotes={cargarLotes} config={config} />}
        {activeTab === 'ventas' && <Ventas ventas={ventas} productos={productos} lotes={lotes} cargarVentas={cargarVentas} cargarProductos={cargarProductos} cargarLotes={cargarLotes} config={config} />}
        {activeTab === 'finanzas' && <Finanzas user={user} lotes={lotes} ventas={ventas} arriendos={arriendos} cargarLotes={cargarLotes} cargarFinanzas={cargarFinanzas} config={config} />}
      
      </div>
    </div>
  );
}