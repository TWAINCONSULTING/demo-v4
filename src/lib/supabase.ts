import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Default to empty strings to prevent runtime errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create client even if credentials are missing - will be handled by error boundaries
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Add health check function that includes connection validation
export const checkSupabaseConnection = async () => {
  try {
    // First check if we have valid credentials
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase credentials. Please click "Connect to Supabase" to set up your connection.');
    }

    // Then try to validate the connection
    const { data, error } = await supabase.from('users').select('count');
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
};