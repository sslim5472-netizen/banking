import { createClient } from '@supabase/supabase-js';

// Configured with Project ID: brogfrowefmaphggdjhx
const supabaseUrl: string = 'https://brogfrowefmaphggdjhx.supabase.co'; 
const supabaseKey: string = 'sb_publishable_NPNTpgKWqozYTDjiptQtPQ__PsT7lug';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to check if we are using the placeholder URL
export const isSupabaseConfigured = () => {
    return supabaseUrl !== 'https://YOUR_PROJECT_ID.supabase.co' && !supabaseUrl.includes('YOUR_PROJECT_ID');
};