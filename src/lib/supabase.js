import { createClient } from '@supabase/supabase-js';

// Estas variables DEBEN estar en tu panel de Vercel (o archivo .env local)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Si alguna de estas es undefined, el cliente fallará y la página cargará en blanco
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Error: Faltan las variables de entorno de Supabase.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
