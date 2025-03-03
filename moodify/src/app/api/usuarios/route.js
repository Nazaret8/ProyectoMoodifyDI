import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lppshycjcubtzwzklarq.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHNoeWNqY3VidHp3emtsYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjAwMjAsImV4cCI6MjA1Mjg5NjAyMH0.I5Vg72XMCm2dPJstHynctDdGVfq6hC35cNP75UI4Rg8";
const supabase = createClient(supabaseUrl, supabaseKey);

export const GET = async (req) => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
      return new Response(
        JSON.stringify({ error: 'Usuario no auntenticado' }),
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const { data: user, error: userError } = await supabase
      .from('USUARIO')
      .select('id, nombreUsuario, email') 
      .eq('id', userId) 
      .single();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Info del usuario no encontrada' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ user }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error interno:", error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', details: error.message }),
      { status: 500 }
    );
  }
};
