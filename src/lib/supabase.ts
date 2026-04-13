import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function checkConnection() {
  const { data, error } = await supabase.from('Empresa').select('id').limit(1);
  if (error) {
    console.error("Supabase connection error:", error.message);
    return false;
  }
  return true;
}
