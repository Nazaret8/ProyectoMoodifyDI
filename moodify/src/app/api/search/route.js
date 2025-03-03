import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lppshycjcubtzwzklarq.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHNoeWNqY3VidHp3emtsYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjAwMjAsImV4cCI6MjA1Mjg5NjAyMH0.I5Vg72XMCm2dPJstHynctDdGVfq6hC35cNP75UI4Rg8";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req) {
  try {
    const { searchQuery } = await req.json();

    if (!searchQuery) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const { data, error } = await supabase
      .from('CANCION')
      .select('id, titulo, artista, imagen, duracion, enlace')  
      .ilike('titulo', `%${searchQuery}%`); 

    if (error) throw error;

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
