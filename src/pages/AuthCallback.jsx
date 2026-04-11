import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Loader } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/sync`, {
          nombre: session.user.user_metadata.full_name || session.user.email.split('@')[0]
        }, {
          headers: { Authorization: `Bearer ${session.access_token}` }
        });

        login(response.data.user, response.data.token);
        navigate('/'); 
      } catch (err) {
        console.error("Error de sincronización:", err);
        navigate('/login');
      }
    };

    handleAuth();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <Loader className="animate-spin text-red-600 mb-4" size={48} />
      <p className="text-slate-600 font-bold">Sincronizando tu cuenta...</p>
    </div>
  );
}